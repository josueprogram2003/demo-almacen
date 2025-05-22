import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modals/modal/modal.component';
import { ModalUsuarioComponent } from '../../modals/modal-usuario/modal-usuario.component';
import { NotificationUtilService, Paginate } from '../../../../../../../utils';
import { IndicadorService } from '../../../../core/services/Indicador.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit, AfterViewChecked {
  //paginacion tabla
  isVisibleAjuste: boolean = false;
  ajustesLista!: Paginate<any>;
  usuarioLista!: Paginate<any>;
  idIndicador: number = 0;
  page_size: number[] = [10, 10];
  page_number: number[] = [1, 1];
  paramForm: any = {};


  @Input() set paramsfilter(item: any) {
    if (item) {
      if (item.action == 'filter') {
        this.paramForm = item.value;
        this.obtenerConfiguracionIndicadores();
      }
    }
  }


  constructor(private indicadorService: IndicadorService, private modalService: NgbModal, private notificationutilservice: NotificationUtilService, private cdRef: ChangeDetectorRef, private fb: FormBuilder) {

  }


  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    // this.obtenerConfiguracionIndicadores();
  }

  obtenerConfiguracionIndicadores() {
    const { value, businessUnitId } = this.paramForm;
    const params = {
      businessUnitId: businessUnitId,
      nameContains:value,
      page: this.page_number[0],
      size: this.page_size[0],
    }
    this.indicadorService
      .getIndicadoresSettingsFilter(params)
      .subscribe((res) => {
        this.ajustesLista = res;
      });
  }

  params(item: any) {
    if (item) {
      switch (item.action) {
        case "list":
          this.obtenerConfiguracionIndicadores();
          break;
        case "view-users":
          this.idIndicador = item.id;
          this.onViewUsers(this.idIndicador)
          break;
        case "pagination":
          let { page, itemsPerPage } = item.values;
          this.page_size[0] = itemsPerPage;
          this.page_number[0] = page;
          this.obtenerConfiguracionIndicadores();
          break;
        default:
          break;
      }
    }
  }

  onViewUsers(id: number) {
    this.isVisibleAjuste = true;
    this.idIndicador = id;
    this.indicadorService
      .getUsuarioByIndicator(
        this.idIndicador,
        this.page_number[1],
        this.page_size[1]
      )
      .subscribe((res) => {
        this.usuarioLista = res;
      });
  }

  onIndicadores(number: any) {
    this.page_size[0] = number;
    this.obtenerConfiguracionIndicadores();
  }

  onGetUsuarios(number: any) {
    this.page_size[1] = number;
    this.onViewUsers(this.idIndicador)
  }

  onModal(id: any) {
    ModalComponent.prototype.id = id;
    ModalComponent.prototype.isView = false;
    this.modalService
      .open(ModalComponent, { keyboard: false, backdrop: 'static' })
      .result.then((res) => {
        if (res) {
          this.obtenerConfiguracionIndicadores();
          this.notificationutilservice.configToast(
            'Indicador creado correctamente', 'toast-success'
          );
        }
      });
  }

  onModalUsuario() {
    ModalUsuarioComponent.prototype.idIndicador = this.idIndicador;
    this.modalService
      .open(ModalUsuarioComponent, {
        keyboard: false,
        backdrop: 'static',
      })
      .result.then((res) => {
        if (res) {
          this.onViewUsers(this.idIndicador)
          this.notificationutilservice.configToast(
            'Usuario creado correctamente', 'toast-success'
          );
        }
      });
  }
  mostrarIndicador() {
    if (this.ajustesLista?.content?.find((x) => x.id == this.idIndicador) == undefined) {
      this.isVisibleAjuste = false;
      return ""
    }
    return this.ajustesLista?.content?.find((x) => x.id == this.idIndicador).name;
  }


  paramsUsers(item: any) {
    if (item) {
      switch (item.action) {
        case "list":
          this.onViewUsers(this.idIndicador)
          break;
        case "pagination":
          let { page, itemsPerPage } = item.values;
          this.page_size[1] = itemsPerPage;
          this.page_number[1] = page;
          this.onViewUsers(this.idIndicador)
          break;
        default:
          break;
      }
    }
  }
}
