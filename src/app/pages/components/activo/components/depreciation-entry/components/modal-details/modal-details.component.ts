import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { BehaviorSubject } from 'rxjs';
import { MaestraService } from '../../../../../../../core/services/maestra.service';
import { AccountingEntryService } from '../../../../../../../core/services/accounting-entry/accounting-entry.service';
import { pdfDepreciationEntry } from '../../../../../../../core/services/activo/pdfDepreciationEntry.service';
import { depreciationEntry } from '../../../../../../../core/models/depreciation-entry.model';
import { AccountingDetail } from '../../../../../../../core/models/accountingDetail.model';
import { ModalPreviewFileComponent } from '../../../../../../../shared/components/modal-preview-file/modal-preview-file.component';

@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.component.html',
  styleUrl: './modal-details.component.scss'
})
export class ModalDetailsComponent {
  title!: string;
  isLoading: boolean = false;
  formGroup: FormGroup = new FormGroup({})
  data!: depreciationEntry;
  datas: AccountingDetail[] = [];

  page: number = 1;
  maxSize: number = 3;
  pageSize: number = 10;
  array = new BehaviorSubject<any[]>([]);
  total = new BehaviorSubject<number>(0)
  months: { name: string, value: number }[] = [
    { name: 'Enero', value: 1 },
    { name: 'Febrero', value: 2 },
    { name: 'Marzo', value: 3 },
    { name: 'Abril', value: 4 },
    { name: 'Mayo', value: 5 },
    { name: 'Junio', value: 6 },
    { name: 'Julio', value: 7 },
    { name: 'Agosto', value: 8 },
    { name: 'Setiembre', value: 9 },
    { name: 'Octubre', value: 10 },
    { name: 'Noviembre', value: 11 },
    { name: 'Diciembre', value: 12 },
  ];

  paramsPagination: any = {
    page: this.page,
    size: this.pageSize,
  }

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private service: MaestraService, private serviceDetail: AccountingEntryService, private servicePdf: pdfDepreciationEntry, private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data != null) {
      this.onList();
    }
  }

  onList() {
    this.paramsPagination = {

    }
    // this.serviceDetail.getAccountingEntryDetailsById(this.data!.id, this.paramsPagination).subscribe((res:any) => {
    //   this.datas = res.data;
    //   this.setPagination()
    // })
  }


  setPagination() {
    const details = this.datas;
    const total = this.datas.length;
    let observation = this.datas;
    let startIndex = ((this.page - 1) * this.pageSize) + 1;
    let endIndex = ((this.page - 1) * this.pageSize) + this.pageSize;
    if (endIndex > total) {
      endIndex = total;
    }
    observation = details.slice(
      startIndex - 1, endIndex
    )
    this.array.next(observation);
    this.total.next(total)
  }
  pageChanged(event: PageChangedEvent): void {
    if (event) {
      this.page = event.page;
      this.setPagination();
    }
  }



  async exportPdf() {
    let tohave = 0;
    let hasto = 0;
    this.datas.map((e) => {
      if (e.transactionType == 'D') {
        hasto = hasto + e.amount
      }
      if (e.transactionType == 'H') {
        tohave = tohave + e.amount
      }
    })
    const arrayFormat = this.datas.map((e) => ({
      ...e,
      accountNumber: e.account.accountNumber ? e.account.accountNumber : '',
      name: e.asset.description ? e.asset.description : '',
    }))
    const { year, month } = this.data;
    let monthName: any = "";
    monthName = this.months.find((e) => e.value == month)?.name;
    const params = {
      list: arrayFormat,
      hasto: (Math.round(hasto * 100) / 100).toFixed(2),
      tohave: (Math.round(tohave * 100) / 100).toFixed(2),
      title: 'ASIENTO CONTABLE',
      year: year,
      month: monthName,
    }
    const url = await this.servicePdf.viewPdfModal(params);
    ModalPreviewFileComponent.prototype.type = 'pdf';
    ModalPreviewFileComponent.prototype.src = url;
    this.modalService.open(ModalPreviewFileComponent, {
      backdrop: 'static',
      keyboard: false,
      size: "xl"
    })
  }


  async exportPdfAccountContable() {
   /*
  this.serviceDetail.getAccountingEntryDetailGrouped(this.data!.id).subscribe(async (res:any) => {
      let tohave = 0;
      let hasto = 0;
      res.data.map((e:any) => {
        if (e.transactionType == 'D') {
          hasto = hasto + e.amount
        }
        if (e.transactionType == 'H') {
          tohave = tohave + e.amount
        }
      })
      const { year, month } = this.data;
      let monthName: any = "";
      monthName = this.months.find((e) => e.value == month)?.name;
      const params = {
        list: res.data,
        hasto: (Math.round(hasto * 100) / 100).toFixed(2),
        tohave: (Math.round(tohave * 100) / 100).toFixed(2),
        title: 'CUENTA CONTABLE',
        year: year,
        month: monthName,
      }
      const url = await this.servicePdf.viewPdfModal(params);
      ModalPreviewFileComponent.prototype.type = 'pdf';
      ModalPreviewFileComponent.prototype.src = url;
      this.modalService.open(ModalPreviewFileComponent, {
        backdrop: 'static',
        keyboard: false,
        size: "xl"
      })
    })*/
  }
}
