import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DualListComponent } from 'angular-dual-listbox';
import moment from 'moment';
import { Asset } from '../../../../../../../core/models/asset.model';
import { CostCenter } from '../../../../../../../core/models/costCenter.model';
import { BusinessUnit } from '../../../../../../../core/models/businessUnit.model';
import { AsignacionService } from '../../../../../../../core/services/activo/asignacion.service';
import { BusinessUnitService } from '../../../../../../../core/services/activo/businessUnitService.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.scss'
})
export class ModalFormComponent implements OnInit {
  title!: string;
  date_string!: string;
  isLoading: boolean = false;
  data!: { employeeId: string, fullName: string };
  formGroup: FormGroup = new FormGroup({})

  employeed: { employeeId: string, fullName: string } = {
    employeeId: '',
    fullName: ''
  };

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
  businessUnits: BusinessUnit[] = [];
  costCenters: CostCenter[] = [];


  format: any = { add: 'Agregar', remove: 'Remover', all: 'Todos', none: 'Ninguno', direction: DualListComponent.LTR, draggable: true, locale: 'es' };
  confirmedStations: Array<any> = [];
  stations: Array<any> = [];
  confirmed: Array<any> = [];
  source: Array<any> = [];
  activos: Asset[] = [];
  sourceStations: Array<any> = [];
  key: string = "";
  display: string = "";
  filter: boolean = true;
  keepSorted: boolean = true;
  disabled: boolean = false;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private service: AsignacionService, private businessUnitService: BusinessUnitService) {
    this.formGroup = this.fb.group({
      "date": ["", [Validators.required]],
      "employeeId": ["", [Validators.required]],
      "businessUnit": ["", [Validators.required]],
      "observations": this.fb.array([]),
      "costCenterId": ["", [Validators.required]]
    })
  }
  get observations(): FormArray {
    return this.formGroup.controls["observations"] as FormArray;
  }

  newObservation(item: any): FormGroup {
    return this.fb.group({
      "assetId": [item.id, []],
      "name": [item.name, []],
      "assignmentDate": [item.date, Validators.required],
      "returnDate": [null, []],
      "reason": ["", [Validators.required]],
      "condition": ["", [Validators.required]],
      "employeeId": [item.employeeId, [Validators.required]],
      "notes": ["", []],
      "companyId": [sessionStorage.getItem('companyId'), Validators.required],
      "files": this.fb.array([]),
      "costCenterId": [item.costCenterId, []]
    })
  }

  async ngOnInit(): Promise<void> {
    this.getBusinessUnits();
    this.assetAvailable();


  }

  assetAvailable() {
    this.service.getAssetAvailable().subscribe((res) => {
      this.activos = res.data;
      const { employeeId, fullName } = this.data;
      this.employeed = {
        employeeId: employeeId,
        fullName: fullName
      }
      this.formGroup.patchValue({
        ...this.data,
        employeeId: employeeId,
        date: new Date(),
      });
      this.onLisactivos();
      this.useStations();
    })
  }

  getCostCenter(id: string): void {
    this.formGroup.get('costCenterId')?.setValue(null);
    this.businessUnitService.costCenterByBussinesUnitId(id).subscribe((response) => {
      this.costCenters = response;
    });
  }

  changeBusinnesUnit(id:string){
    if(id){
      this.formGroup.get('costCenterId')?.setValue(null);
      this.getCostCenter(id);
    }
  }

  async onLisactivos() {
    this.activos = await Promise.all(this.activos.map((e) => ({ ...e, name: e.description + ' (' + e.serialNumber + ') ' })))
    this.doReset();
  }
  doReset() {
    this.sourceStations = JSON.parse(JSON.stringify(this.activos));
    this.useStations();
  }
  private useStations() {
    this.key = 'id';
    this.display = 'name'; // [ 'station', 'state' ];
    this.keepSorted = true;
    this.source = this.sourceStations;
    this.confirmed = this.confirmedStations;
  }
  getBusinessUnits() {
    this.businessUnitService.get().subscribe((res) => {
      this.businessUnits = res.data;
    })
  }

  enventFiles(event: FormArray, i: AbstractControl) {
    event.updateValueAndValidity();
    this.files(i).updateValueAndValidity();
    i.updateValueAndValidity();
  }

  eventRemove(iArray: FormArray, i: AbstractControl) {
    iArray.updateValueAndValidity();
    this.files(i).updateValueAndValidity();
    i.updateValueAndValidity();
  }

  files(i: any): FormArray {
    return i.controls["files"] as FormArray;
  }

  removeObservation() {
    this.observations.clear();
    this.formGroup.updateValueAndValidity();
  }


  changeArray() {
    this.confirmedStations.map((e) => {
      if (e.name != "" && e.name != undefined) {
        e = { ...e, date: this.formGroup.get('date')?.value, employeeId: this.formGroup.get('employeeId')?.value, }
        this.observations.push(this.newObservation(e))
      }
    })
  }


  onGuardar() {
    if (!this.formGroup.invalid) {
      this.isLoading = true;
      var data: any[] = [];
      var data1: any[] = [];
      var files: File[] = [];
      this.observations.controls.map((r: AbstractControl) => {
        this.files(r).value.map((e: any) => {
          files.push(e.file)
        })
      })

      const { date, costCenterId,businessUnit } = this.formGroup.value;
      data = this.observations.controls.map((e: AbstractControl) => {
        const temp = Object.assign({}, e.value);
        temp.assignmentDate = moment(date).format('YYYY-MM-DD');
        temp.condition = temp.condition.toString();
        temp.files = temp.files.map((r: any) => ({ name: 'assigned-' + r.name, isActive: true }));
        temp.costCenterId = costCenterId
        temp.businessUnitId = businessUnit,
        delete temp.name;
        return temp
      });

      let formData = new FormData();
      formData.append("request", JSON.stringify({ data: data }));
      files.map((e) => {
        formData.append("files", e);
      })
      // if (typeof this.activos != undefined && this.activos.length > 0) {
      //   this.service.postAssetEmployee(formData).subscribe((res) => {
      //     this.isLoading = false;
      //     this.activeModal.close(true);
      //   }, (err) => {
      //     this.isLoading = false;
      //     console.log(err);
      //   })
      // }
    }

  }

}
