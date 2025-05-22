import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { BusinessUnit } from '../../../../../../../core/models/businessUnit.model';
import { CostCenter } from '../../../../../../../core/models/costCenter.model';
import { Asset } from '../../../../../../../core/models/asset.model';
import { AsignacionService } from '../../../../../../../core/services/activo/asignacion.service';
import { BusinessUnitService } from '../../../../../../../core/services/activo/businessUnitService.service';
@Component({
  selector: 'app-modal-return',
  templateUrl: './modal-return.component.html',
  styleUrl: './modal-return.component.scss'
})
export class ModalReturnComponent implements OnInit {
  title!: string;
  isLoading: boolean = false;
  formGroup: FormGroup = new FormGroup({})
  data!: Asset | null;

  employeed: { employeeId?: string, fullName?: string } = {
    employeeId: '',
    fullName: ''
  };
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

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private service: AsignacionService, private businessUnitService: BusinessUnitService) {
    this.formGroup = this.fb.group({
      "id": ["", [Validators.required]],
      "date": [new Date(), [Validators.required]],
      "costCenterId": ["", [Validators.required]],
      "employeeId": ["", [Validators.required]],
      "businessUnit": ["", [Validators.required]],
      "observation": this.fb.group({
        "assetId": ["", []],
        "name": ["", []],
        "returnDate": ["", []],
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
    this.getBusinessUnits();
    if (this.data) {
      const { employeeId, employeeName, description, costCenterId, id, assetId, businessUnitId } = this.data;
      this.employeed = { employeeId: employeeId, fullName: employeeName }
      this.formGroup.patchValue({
        id: id,
        employeeId: employeeId,
        observation: {
          employeeId: employeeId,
          returnDate: new Date(),
          assetId: assetId,
          name: description,
        }
      })
      this.formGroup.updateValueAndValidity();
      if (businessUnitId) {
        this.getCostCenter(businessUnitId)
        this.formGroup.patchValue({
          businessUnit: businessUnitId.toUpperCase(),
          costCenterId:costCenterId.toUpperCase(),
        })
      }
    }

  }


  getBusinessUnits() {
    this.businessUnitService.get().subscribe((res) => {
      this.businessUnits = res.data;
      this.businessUnits = this.businessUnits.map((t:any)=>({...t, id: t.id.toLocaleUpperCase()}))
    })
  }
  getCostCenter(id: string): void {
    this.businessUnitService.costCenterByBussinesUnitId(id).subscribe((response) => {
      this.costCenters = response;
      this.costCenters = this.costCenters.map((t:any)=>({...t, id: t.id.toLocaleUpperCase()}))
    });
  }
  
  changeBusinnesUnit(id:string){
    if(id){
      this.formGroup.get('costCenterId')?.setValue(null);
      this.getCostCenter(id);
    }
  }


  enventFiles(event: FormArray) {
    this.formGroup.get("observation")?.updateValueAndValidity();
  }

  eventRemove(event: FormArray) {
    this.formGroup.get("observation")?.updateValueAndValidity();
  }


  onGuardar() {
    if (!this.formGroup.invalid) {
      this.isLoading = true;
      let formData = new FormData();
      const { date, costCenterId, id } = this.formGroup.value;
      const body = this.formGroup.get("observation")?.value;
      body.files.map((e: any) => {
        formData.append("files", e.file);
      })
      body.returnDate = moment(date).format('YYYY-MM-DD');
      body.costCenterId = costCenterId;
      delete body.name;
      body.files = body.files.map((r: any) => ({ name: 'return-' + r.name, isActive: true }));
      formData.append("request", JSON.stringify(body));
      this.service.putAssetEmployee(formData, id).subscribe((res) => {
        this.isLoading = false;
        this.activeModal.close(true);
      }, (err) => {
        this.isLoading = false;
        console.log(err);
      })
    }

  }
}
