import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Observable, Observer, catchError, debounceTime, distinctUntilChanged, filter, of, switchMap, tap } from 'rxjs';
import { AsignacionService } from '../../../../../../../core/services/activo/asignacion.service';
import { BusinessUnitService } from '../../../../../../../core/services/activo/businessUnitService.service';
import { Asset } from '../../../../../../../core/models/asset.model';
import { BusinessUnit } from '../../../../../../../core/models/businessUnit.model';
import { CostCenter } from '../../../../../../../core/models/costCenter.model';

@Component({
  selector: 'app-modal-assignment',
  templateUrl: './modal-assignment.component.html',
  styleUrl: './modal-assignment.component.scss'
})
export class ModalAssignmentComponent implements OnInit {
  title!: string;
  isLoading: boolean = false;
  formGroup: FormGroup = new FormGroup({});
  data!: Asset | null;
  employeed: any = {};

  suggestions$?: Observable<any[]>;
  searching: boolean = false;
  searchFailed: boolean = false;

  businessUnits: BusinessUnit[] = [];
  costCenters: CostCenter[] = [];
  assignmentConditions: { id: number, name: string }[] = [
    {
      id: 1,
      name: 'Nuevo',
    },
    {
      id: 2,
      name: 'Usado',
    },
  ]



  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private service: AsignacionService, private businessUnitService: BusinessUnitService) {
    this.formGroup = this.fb.group({
      "search": ["", [Validators.required]],
      "employeeId": ["", [Validators.required]],
      "fullName": ["", [Validators.required]],
      "date": [new Date(), [Validators.required]],
      "costCenterId": ["", [Validators.required]],
      "businessUnit": ["", [Validators.required]],
      "observation": this.fb.group({
        "assetId": ["", []],
        "name": ["", []],
        "assignmentDate": [new Date(), [Validators.required]],
        "returnDate": [null, []],
        "companyId": [sessionStorage.getItem('companyId'), Validators.required],
        "notes": ["", []],
        "employeeId": ["", [Validators.required]],
        "condition": ["", [Validators.required]],
        "reason": ["", [Validators.required]],
        "files": this.fb.array([]),
      })
    })
  }

  get filesArray(): FormArray {
    return (this.formGroup.get('observation') as FormGroup).controls["files"] as FormArray;
  }


  ngOnInit(): void {
    this.changeWriter();
    this.getBusinessUnits();
    if (this.data) {
      this.formGroup.patchValue({
        observation: {
          assetId: this.data.id,
          name: this.data.description
        }
      })
    }
  }

  changeWriter() {
    this.suggestions$ = new Observable((observer: Observer<string | undefined>) => {
      const { search } = this.formGroup.value;
      observer.next(search)
    }).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      filter((term:any) => term.length > 3),
      switchMap((term) =>
        this.service.getEmployee(term).pipe(
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
    )
  }

  onChange({ item }: TypeaheadMatch) {
    if (item) {
      this.employeed = item;
      this.formGroup.get('employeeId')?.setValue(item.id)
      this.formGroup.get('fullName')?.setValue(item.fullName)
      this.formGroup.patchValue({
        observation: {
          employeeId: item.id
        }
      })
    }
  }

  getBusinessUnits() {
    this.businessUnitService.get().subscribe((res) => {
      this.businessUnits = res.data;
    })
  }
  getCostCenter(id: string): void {
    this.businessUnitService.costCenterByBussinesUnitId(id).subscribe((response) => {
      this.costCenters = response;
    });
  }

  enventFiles(event: FormArray) {
    this.formGroup.get("observation")?.updateValueAndValidity();
  }

  eventRemove(event: FormArray) {
    this.formGroup.get("observation")?.updateValueAndValidity();
  }


  changeDate(item: any) {
    this.formGroup.patchValue({
      observation: {
        assignmentDate: item
      }
    });
  }


  onGuardar() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.invalid) {
      this.isLoading = true;
      let formData = new FormData();
      const { date, costCenterId, businessUnit } = this.formGroup.value;
      const body = this.formGroup.get("observation")?.value;
      body.assignmentDate = moment(date).format('YYYY-MM-DD');
      body.costCenterId = costCenterId;
      body.businessUnitId = businessUnit;
      delete body.name;
      body.files = body.files.map((r: any) => ({ name: 'assigned-' + r.name, isActive: true }));
      formData.append("request", JSON.stringify({ data: [body] }));
      this.filesArray.controls.map((e: AbstractControl) => {
        formData.append("files", e.value.file);
      })
      this.service.postAssetEmployee(formData).subscribe((res) => {
        this.isLoading = false;
        this.activeModal.close(true);
      }, (err) => {
        this.isLoading = false;
        console.log(err);
      })

    }
  }

}
