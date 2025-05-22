import { Component, ViewEncapsulation, type OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { IndicadorService } from '../../../../core/services/Indicador.service';
import { NotificationUtilService, Paginate } from '../../../../../../../utils';


@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrl: './list-usuarios.component.scss',
})
export class ListUsuariosComponent implements OnInit {


  @Input() usuarioLista: Paginate<any>  = {
    content: [],
    number: 0,
    numberOfElements: 0,
    size: 0,
    sort: undefined,
    totalElements: 0,
    totalPages: 0,
    pageable: undefined
  };
  @Output() paramsUsers = new EventEmitter<object>();
  maxSize: number = 3;

  constructor(
    private indicadorService: IndicadorService,
    private notificationService: NotificationUtilService,
  ) { }


  ngOnInit(): void { }

  //Usuario
  onDeleteUsuario(id: number) {
    this.notificationService
      .configSwal()
      .fire({
        title: '¿Está seguro?',
        text: '¿Estás seguro de que deseas eliminar el usuario del indicador?',
        icon: 'warning',
        showCancelButton: true,
      })
      .then((result) => {
        if (result.value) {
          this.indicadorService.deleteUserIndicator(id).subscribe((res) => {
            this.notificationService.configToast(
              'Usuario eliminado correctamente', 'toast-success'
            );
            this.paramsUsers.emit({ action: 'list', values: null })
          });
        }
      });
  }

  pageChanged(event: PageChangedEvent): void {
    this.paramsUsers.emit({ action: 'pagination', values: event })
  }

}
