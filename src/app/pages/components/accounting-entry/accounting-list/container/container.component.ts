import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { UploadDocumentModalComponent } from '../components/modals/upload-document-modal/upload-document-modal.component';
import { SynchronizeModalComponent } from '../components/modals/synchronize-modal/synchronize-modal.component';
import { AccountingEntryService } from '../../../../../core/services/accounting-entry/accounting-entry.service';
import { Indicators } from '../../../../../core/models/indicators.model';
import { Pagination } from '../../../../../core/models/paginationResponse.model';
import { AccountingEntryFilter } from '../../../../../core/models/accountingEntry.model';
import { ModalPreviewFileComponent } from '../../../../../shared/components/modal-preview-file/modal-preview-file.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
})
export class ContainerComponent implements OnInit {
  breadCrumbItems!: Array<any>;
  accountingEntry: Pagination<any>={
    content:[],
    page:1,
    totalItems:0,
    pageSize:10,
  };
  filter: AccountingEntryFilter = {
    page: 1,
    size: 10,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  };
  indicators?:Indicators;
  actualYear: number = new Date().getFullYear();
  chipsvalues: {name:string, label:string, value:any}[] =[];
  chipsDeleteShared: any;


  constructor(
    private accountingEntryService: AccountingEntryService,
    private toastService: ToastrService,
    private modal: NgbModal
  ) {}
  ngOnInit(): void {
    this.getAccountingEntry();
  }
  getAccountingEntry() {
    this.accountingEntryService
      .getAccountingEntry(this.filter)
      .subscribe((res) => {
        this.accountingEntry = res.data;
      });
    this.getIndicators();
  }
  getIndicators() {
    this.accountingEntryService.getAccountingEntryIndicators(this.filter).subscribe((res) => {
      this.indicators = res.data;
    });
  }
  onFilter(filter: AccountingEntryFilter) {
    this.filter = {
      ...this.filter,
      ...filter,
    };
    this.filter.page = 1;
    this.getAccountingEntry();
  }
  onPaginate(page: number) {
    this.filter.page = page;
    this.getAccountingEntry();
  }
  onUpdatedAccountingEntry(data: any) {
    const { id, shortDescription, detail } = data;
    if (detail) {
      Swal.fire({
        title: '¿Está seguro?',
        text: '¿Estás seguro de actualizar el campo?',
        icon: 'warning',
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          const body = {
            shortDescription: shortDescription,
            detail: detail,
          };
          this.accountingEntryService.putFields(id, body).subscribe((res) => {
            this.toastService.success('Se actualizó correctamente');
            this.getAccountingEntry();
          });
        }else{
          this.getAccountingEntry();
        }
      });
    }
  }
  onViewFile(data: any) {
    this.accountingEntryService.downloadFile(data.objectKey).subscribe((res) => {
      var blobpdf = res.slice(0, res.size, "application/pdf")
      const pdfUrl = URL.createObjectURL(blobpdf);
      ModalPreviewFileComponent.prototype.src = pdfUrl;
      ModalPreviewFileComponent.prototype.type = 'pdf';
      this.modal.open(ModalPreviewFileComponent, { size: 'lg' });
    });
  }
  onChangeReview(event:any) {
    let {id, review} = event
    review = review? 2:1
    this.accountingEntryService.putReview(id, review).subscribe(res => {
      this.getAccountingEntry()
    })
  }
  onModal(event:any){
    let {id, year, month} = event;
    UploadDocumentModalComponent.prototype.id = id;
    UploadDocumentModalComponent.prototype.year = year;
    UploadDocumentModalComponent.prototype.month = month;
    this.modal.open(UploadDocumentModalComponent, { size: 'lg' }).result.then((res) => {
      if(res){
        this.toastService.success('Archivo subido correctamente');
        this.getAccountingEntry();
      }
    });
  }
  onModalSynchronize(){
    this.modal.open(SynchronizeModalComponent, { size: 'lg' }).result.then((res) => {
      if(res){
        this.toastService.success('Sincronización exitosa');
        this.getAccountingEntry();
      }
    });
  }

  async onRemoveChips(event:any){
    // delete this.filter[event.name]
    this.onFilter(this.filter)
    this.chipsvalues =this.chipsvalues.filter((e)=>e.name!==event.name);
    this.chipsDeleteShared = event;
  }

  eventChipsObject(event:[]){
    this.chipsvalues = [];
    this.chipsvalues = event;
  }

}
