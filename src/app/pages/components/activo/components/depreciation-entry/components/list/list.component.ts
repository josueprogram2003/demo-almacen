import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { ModalDetailsComponent } from '../modal-details/modal-details.component';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountingEntryService } from '../../../../../../../core/services/accounting-entry/accounting-entry.service';
import { MaestraService } from '../../../../../../../core/services/maestra.service';
import { NotificationUtilService } from '../../../../../../../utils';
import { Pagination } from '../../../../../../../core/models/paginationResponse.model';
import { depreciationEntry } from '../../../../../../../core/models/depreciation-entry.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  paramsFilter: any;
  page_size: number = 10;
  page_number: number = 1;
  paramsPagination: any = {
    page: this.page_number,
    size: this.page_size,
  }
  isLoadingList: boolean = false;

  pagination: Pagination<depreciationEntry[]> = {
    content: [],
    page: 0,
    pageSize: 0,
    totalItems: 0
  }

  @Input() set params(values: any) {
    if (values) {
      this.changeAction(values)
    }
  }

  constructor(private modalService: NgbModal, private notificationService: NotificationUtilService, private service: AccountingEntryService, public serviceMaestra: MaestraService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  onList() {
    this.paramsPagination = {
      page: this.page_number,
      size: this.page_size,
      ...this.paramsFilter
    }
    this.isLoadingList = true;
    this.spinner.show();
    this.service.getAccountingEntry(this.paramsPagination).subscribe((res:any) => {
      this.pagination = res.data;
      this.isLoadingList = false;
      this.spinner.hide();
    }, (err:any) => {
      console.log(err);
      this.spinner.hide();
      this.isLoadingList = false;
    })
  }

  modalNew() {
    ModalFormComponent.prototype.title = "Generar asiento contable";
    this.modalService.open(ModalFormComponent, {
      backdrop: 'static',
      keyboard: false,
      size: "xl"
    }).closed.subscribe((data) => {
      if (data) {
        this.onList();
        this.notificationService.configToast(
          'Realizado correctamente', 'toast-success'
        );
      }
    })

  }

  onDetail(item: depreciationEntry) {
    ModalDetailsComponent.prototype.title = "Detalle depresiación";
    ModalDetailsComponent.prototype.data = item;
    this.modalService.open(ModalDetailsComponent, {
      backdrop: 'static',
      keyboard: false,
      size: "lg"
    }).closed.subscribe((data) => {
      if (data) {

      }
    })
  }

  remove(item: depreciationEntry) {
    this.notificationService.configSwalDelete('¿Está seguro?', '¿Estás seguro de que deseas eliminar este registro?', 'warning').then((data) => {
      if (data.isConfirmed) {
        this.isLoadingList = true;
        this.spinner.show();
        // this.service.deleteAccountingEntry(item.id).subscribe((res:any) => {
        //   this.onList();
        //   this.isLoadingList = false;
        //   this.spinner.hide();
        //   this.notificationService.configToast(
        //     'Realizado correctamente', 'toast-success'
        //   );
        // }, (err:any) => {
        //   console.log(err);
        //   this.spinner.hide();
        //   this.isLoadingList = false;
        // })
      }
    });
  }

  sync(item: depreciationEntry) {
    this.notificationService.configSwalDelete('¿Está seguro?', '¿Estás seguro de que deseas sincronizar este registro?', 'warning').then((data) => {
      if (data.isConfirmed) {
        this.isLoadingList = true;
        this.spinner.show();
        // this.service.putAccountingEntryUploadtoConcar(item.id, { exchangeRate: item.exchangeRate }).subscribe((res:any) => {
        //   this.onList();
        //   this.isLoadingList = false;
        //   this.spinner.hide();
        //   this.notificationService.configToast(
        //     'Realizado correctamente', 'toast-success'
        //   );
        // }, (err:any) => {
        //   console.log(err);
        //   this.spinner.hide();
        //   this.isLoadingList = false;
        // })
      }
    }
    );
  }

  pageChanged(event: PageChangedEvent): void {
    if (event) {
      this.page_number = event.page;
      this.onList();
    }
  }

  changeAction(item: any) {
    switch (item.action) {
      case 'search':
        this.paramsFilter = item.values;
        this.onList();
        break;
      case 'new':
        this.modalNew();
        break;
      default:
        break;
    }
  }

}
