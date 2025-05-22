import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { FlatPickrOutputOptions } from 'angularx-flatpickr/lib/flatpickr.directive';
import moment from 'moment';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, lastValueFrom, take } from 'rxjs';
import { ActivoDepresiation, Detail } from '../../../../../../../core/models/activoDepresiation.model';
import { BusinessUnit } from '../../../../../../../core/models/businessUnit.model';
import { BusinessUnitService } from '../../../../../../../core/services/activo/businessUnitService.service';
import { MaestraService } from '../../../../../../../core/services/maestra.service';
import { AccountingEntryService } from '../../../../../../../core/services/accounting-entry/accounting-entry.service';
import { CostCenter } from '../../../../../../../core/models/costCenter.model';
import { getYearsSince, RootReducerState, User } from '../../../../../../../utils';


@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.scss'
})
export class ModalFormComponent implements OnInit {
  userData!: User | null;
  title!: string;
  maxSize: number = 3;
  isLoading: boolean = false;
  isLoadingList: boolean = false;
  formGroup: FormGroup = new FormGroup({})
  datas: ActivoDepresiation = {
    id: null,
    exist: false,
    year: 0,
    month: 0,
    details: []
  };
  totalDepresiaton: number = 0;

  page: number = 1;
  pageSize: number = 10;
  _details$ = new BehaviorSubject<Detail[]>([]);
  _total$ = new BehaviorSubject<number>(0)

  mes: { month: number, name: string }[] = []

  paramsfilter: any;
  businessUnits: BusinessUnit[] = [];
  costCenters: CostCenter[] = [];

  yearsData = getYearsSince(2020)

  constructor(private fb: FormBuilder, private store: Store<RootReducerState>, public activeModal: NgbActiveModal, private master: MaestraService, private serviceDetail: AccountingEntryService, private businessUnitService: BusinessUnitService, private spinner: NgxSpinnerService) {
    this.formGroup = this.fb.group({
      "month": [new Date().getMonth() + 1, [Validators.required]],
      "year": [new Date().getFullYear(), [Validators.required]],
      "businessUnit": ["", []],
      "costCenterId": ["", []],
      "companyId": [sessionStorage.getItem('companyId'), Validators.required],
      "totalDepreciateAmount": ["", [Validators.required]],
      "details": this.fb.array([]),
      "activationDate": ["", []]
    })
  }
  get details() {
    return this.formGroup.get("details") as FormArray;
  }
  newDetail(item: Detail) {
    return this.fb.group({
      "assetId": item.id,
      "depreciationPercentage": item.assetGroup?.depreciationPercentage ? item.assetGroup?.depreciationPercentage : 0,
      "valueRemainingAsset": item.valueRemainingAsset,
      "unitPrice": item.unitPrice,
      "amount": item.amountDepreciation,
      "accountId": item?.assetGroup?.account?.id,
      "costCenterId": item?.costCenterId,
    })
  }

  getFormattedDifference(item: any): string {
    const value = (item?.valueRemainingAsset ?? 0) - (item?.amountDepreciation ?? 0);
    return value.toFixed(2);
  }

  async ngOnInit() {
    this.mes = this.master.getMonths();
    this.getBusinessUnits();
    this.userData = (await lastValueFrom(this.store.select('dataInitial').pipe(take(1)))).data;

    const { month, year, activationDate } = this.formGroup.value;
    const daylastMonth  = new Date(year, month, 0).getDate();
    this.formGroup.get('activationDate')?.setValue(new Date(year, month-1, daylastMonth))

    if (month && year) {
      this.paramsfilter = {
        year: year,
        month: month,
        activationDate: moment(new Date(year, month-1, daylastMonth)).format("YYYY-MM-DD")
      }
      this.onList();
    }
  }

  selectDate(event: FlatPickrOutputOptions) {
    const { month, year} = this.formGroup.value;
    this.formGroup.get('activationDate')?.setValue(event.dateString);
    let activationDate = "";
    if(this.formGroup.get('activationDate')?.value!=null && this.formGroup.get('activationDate')?.value!=""){
      activationDate = moment(event.selectedDates[0]).format('YYYY-MM-DD');
    }
    if (month && year) {
      this.paramsfilter = {
        year: year,
        month: month,
        activationDate:activationDate
      }
      this.onList();
    }
  }

  clearDate(){
    this.formGroup.get('activationDate')?.reset();
    this.onSelect();
  }

  onList() {
    this.isLoadingList = true;
    this.spinner.show();

    this.totalDepresiaton = 0;
    const params = {
      ...this.paramsfilter
    }
    const objectTransform = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != '').filter(([_, v]) => v != null));
    // this.serviceDetail.getaccountingEntryDepreciton(objectTransform).subscribe((res:any) => {
    //   this.isLoadingList = false;
    //   this.spinner.hide();
    //   this.datas = res;
    //   this.changeDetails();
    // }, (err:any) => {
    //   console.log(err);
    //   this.isLoadingList = false;
    //   this.spinner.hide();
    // })
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

  changeactivos() {
    let total: number = 0;
    this.details.clear();
    this.datas.details.map((res) => {
      total += Number(+res.amountDepreciation);
    })
    this.setPagination();
    this.formGroup.get("totalDepreciateAmount")?.setValue(total.toFixed(3))
    this.datas.details.map((e) => {
      this.details.push(this.newDetail(e))
    });
  }

  onSelect() {
    const { year, month, activationDate } = this.formGroup.value;
    let activationdate = "";
    if(activationDate!=null && activationDate!=""){
      activationdate = moment(activationDate).format('YYYY-MM-DD');
    }
    if (year && month) {
      this.paramsfilter = {
        year: year,
        month: month,
        activationDate:activationdate
      }
      this.onList()
    }
  }



  setPagination() {
    const details = this.datas.details;
    const total = this.datas.details.length;
    let observation_details = this.datas.details;
    let startIndex = ((this.page - 1) * this.pageSize) + 1;
    let endIndex = ((this.page - 1) * this.pageSize) + this.pageSize;
    if (endIndex > total) {
      endIndex = total;
    }
    observation_details = details.slice(
      startIndex - 1, endIndex
    )
    this._details$.next(observation_details);
    this._total$.next(total)
  }
  pageChanged(event: PageChangedEvent): void {
    if (event) {
      this.page = event.page;
      this.setPagination();
    }
  }

  onExportExcel() {
    const download = (blob: any) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `Reporte_activos_depreciados.xlsx`;
      link.click();
    };
    const params = {
      ...this.paramsfilter
    }
    const objectTransform = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != '').filter(([_, v]) => v != null));
    // this.serviceDetail.getaccountingEntryDeprecitonExport(objectTransform).subscribe((result:any) => {
    //   download(result);
    // })
  }


  changeBusinnesUnit(id: string) {
    this.paramsfilter = {
      ...this.paramsfilter,
      businessUnitId: id,
    }
    this.onList();
    if (id != null && id != '') {
      this.getCostCenter(id);
    }
  }

  changeCostCener(id: string) {
    this.paramsfilter = {
      ...this.paramsfilter,
      costCenterId: id,
    }
    this.onList();
  }


  changeDetails() {
    if (this.datas.details != null) {
      this.changeactivos()
      this.datas.details.map((res) => {
        this.totalDepresiaton = +res.amountDepreciation + this.totalDepresiaton
      })
    }
  }

  onGuardar() {
    if (!this.formGroup.invalid) {
      this.isLoading = true;
      this.details.controls.map((e) => {
        e.patchValue({
          ...e,
        })
      })
      this.details.updateValueAndValidity();
      this.formGroup.updateValueAndValidity();
      const data = this.formGroup.value;
      delete data.activationDate;
      // this.serviceDetail.postaccountingHeader(data).subscribe((res:any) => {
      //   this.isLoading = false;
      //   this.activeModal.close(true)
      // }, (err:any) => {
      //   this.isLoading = false;
      //   console.log(err);
      // })
    }
  }
}
