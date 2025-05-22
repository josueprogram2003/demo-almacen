import { Component, Input, Output, type OnInit, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modals/modal/modal.component';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { IndicadorService } from '../../../../core/services/Indicador.service';
import { Paginate } from '../../../../../../../utils';
import { NotificationUtilService } from '../../../../../../../shared/services/notification-util.service';


@Component({
  selector: 'app-list-indicadores',
  templateUrl: './list-indicadores.component.html',
  styleUrl: './list-indicadores.component.scss',
})
export class ListIndicadoresComponent implements OnInit {

  @Input() ajustesLista: Paginate<any> = {
    content: [],
    number: 0,
    numberOfElements: 0,
    size: 0,
    sort: undefined,
    totalElements: 0,
    totalPages: 0,
    pageable: undefined
  };
  @Output() params = new EventEmitter<object>()


  maxSize: number = 3;
  idIndicador: any;

  constructor(private indicadorService: IndicadorService, private modalService: NgbModal, private notificationService: NotificationUtilService) {
  }

  ngOnInit(): void { }
  onModal(id: number) {
    ModalComponent.prototype.id = id;
    ModalComponent.prototype.isView = false;
    this.modalService
      .open(ModalComponent, { keyboard: false, backdrop: 'static' })
      .result.then((res) => {
        if (res) {
          this.params.emit({ action: 'list', values: null })
        }
      });
  }


  onVerDetalle(id: number) {
    ModalComponent.prototype.id = id;
    ModalComponent.prototype.isView = true;
    this.modalService.open(ModalComponent, {
      keyboard: false,
      backdrop: 'static',
    });
  }

  onVerUsuarios(id: number) {
    this.idIndicador = id;
    this.params.emit({ action: 'view-users',  id: this.idIndicador })
  }


  onDeleteIndicador(id: number) {
    this.notificationService
      .configSwal()
      .fire({
        title: '¿Está seguro?',
        text: '¿Estás seguro de que deseas eliminar este indicador?',
        icon: 'warning',
        showCancelButton: true,
      })
      .then((result) => {
        if (result.value) {
          this.indicadorService.deleteIndicador(id).subscribe((res) => {
            this.notificationService.configToast(
              'Indicador eliminado correctamente', 'toast-success'
            );
            this.params.emit({ action: 'list', values: null })
          });
        }
      });
  }

  pageChanged(event: PageChangedEvent): void {
    this.params.emit({action:'pagination',values:event})
  }

}
