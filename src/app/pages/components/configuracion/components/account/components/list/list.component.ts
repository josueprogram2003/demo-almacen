import { Component, Input, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { NotificationUtilService } from '../../../../../../../utils';
import { ConfiguracionService } from '../../../../../../../core/services/activo/configuracion.service';
import { Pagination } from '../../../../../../../core/models/paginationResponse.model';
import { Account } from '../../../../../../../core/models/account.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  paramsFilter: any;
  pagination: Pagination<Account[]> = {
    content: [],
    page: 0,
    pageSize: 0,
    totalItems: 0
  }

  currentPage: number = 1;
  maxSize: number = 3;
  page_size: number = 10;
  page_number: number = 1;
  paramsPagination: any = {
    page: this.page_number,
    size: this.page_size,
  }
  typebody: boolean = false;

  @Input() set params(values: any) {
    if (values) {
      this.changeAction(values)
    }
  }

  constructor(private service: ConfiguracionService, private modalService: NgbModal, private notificationService: NotificationUtilService) {
  }

  ngOnInit(): void {
    this.onList();
  }

  onList() {
    this.paramsPagination = {
      page: this.page_number,
      size: this.page_size,
    }
    this.service.getAccount(this.paramsPagination).subscribe((res) => {
      this.pagination = res.data
    })
  }

  modalNew() {
    ModalFormComponent.prototype.title = "Agregar cuenta";
    ModalFormComponent.prototype.data = null;
    this.modalService.open(ModalFormComponent, {
      backdrop: 'static',
      keyboard: false,
      size: "lg"
    }).closed.subscribe((data) => {
      if (data) {
        this.onList();
        this.notificationService.configToast(
          'Realizado correctamente', 'toast-success'
        );
      }
    });

  }
  editModal(item: Account) {
    ModalFormComponent.prototype.title = "Editar cuenta";
    ModalFormComponent.prototype.data = item;
    this.modalService.open(ModalFormComponent, {
      backdrop: 'static',
      keyboard: false,
      size: "lg"
    }).closed.subscribe((data) => {
      if (data) {
        this.onList();
        this.notificationService.configToast(
          'Realizado correctamente', 'toast-success'
        );
      }
    });
  }

  remove(item: Account) {
    this.notificationService.configSwalDelete('¿Está seguro?', '¿Estás seguro de que deseas eliminar este registro?', 'warning').then((data) => {
      if (data.isConfirmed) {
        this.service.deleteAccount(item.id).subscribe((data) => {
          this.onList();
          this.notificationService.configToast(
            'Realizado correctamente', 'toast-success'
          );
        });
      }
    });

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
      case 'positicion':
        this.typebody = item.values;
        break;
      default:
        break;
    }
  }

}
