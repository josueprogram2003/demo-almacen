import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { NotificationUtilService } from '../../../../../../../utils';
import { ConfiguracionService } from '../../../../../../../core/services/activo/configuracion.service';
import { Pagination } from '../../../../../../../core/models/paginationResponse.model';
import { Brand } from '../../../../../../../core/models/brand.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  paramsFilter: any;
  typebody: boolean = false;
  pagination: Pagination<Brand[]> = {
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

  @Input() set params(values: any) {
    if (values) {
      this.changeAction(values)
    }
  }

  constructor(private modalService: NgbModal, private service: ConfiguracionService, private notificationService: NotificationUtilService) { }

  ngOnInit(): void {
    this.onList()
  }


  onList() {
    this.paramsPagination = {
      page: this.page_number,
      size: this.page_size,
    }
    this.service.getBrand(this.paramsPagination).subscribe((res) => {
      this.pagination = res.data;
    })
  }

  modalNew() {
    ModalFormComponent.prototype.title = "Agrear marca";
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

  editModal(item: Brand) {
    if (item) {
      ModalFormComponent.prototype.title = "Editar marca";
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

  }

  remove(item: Brand) {
    this.notificationService.configSwalDelete('¿Está seguro?', '¿Estás seguro de que deseas eliminar este registro?', 'warning').then((data) => {
      if (data.isConfirmed) {
        this.service.deleteBrand(item.id).subscribe((res) => {
          this.onList();
          this.notificationService.configToast(
            'Realizado correctamente', 'toast-success'
          );
        })
      }
    })
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