import Swal from 'sweetalert2';
import { Injectable, isDevMode } from "@angular/core";
import { Icon, Type, TypeInterface, TypeToastInterface } from "../data/notification.enum";
declare const $: { notify: (arg0: { icon: string; message: string; }, arg1: { type: string; delay: number; allow_dismiss: boolean; placement: { from: string; align: string; } | { from: string; align: string; }; }) => void; };
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationUtilService {
  constructor(private toastService: ToastrService){}


  alertSuccess(message: string): void {
    this.configAlert(Icon.success, message, Type.success);
  }

  alertInfo(header: string, message: string, type: TypeInterface) {
    return Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
      },
    }).fire({
      title: header,
      text: message,
      icon: type,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  }
  alertInfoHTML(header: string, message: string, type: TypeInterface) {
    return Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
      },
    }).fire({
      title: header,
      html: message,
      icon: type,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  }
  configSwal() {
    return Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-1',
      },
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      buttonsStyling: false,
    });
  }
  configSwalDelete(title: string, message: string, type: TypeInterface) {
    return Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-1',
      },
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      buttonsStyling: false,
    }).fire({
      title: title,
      html: message,
      icon: type,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
      showClass: {
        popup:
          `animate__animated
           animate__fadeIn
           animate__faster`
      },
      hideClass: {
        popup:
          `animate__animated
         animate__fadeOut
         animate__faster`
      }
    });
  }

  configCustomSwal(confirmButtonText: string, cancelButtonTex: string) {
    return Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-1',
      },
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonTex,
      buttonsStyling: false,
    });
  }

  individualConfig: Partial<IndividualConfig> = {
    positionClass: 'toast-top-right',
  };

  configToast(message: string, type: TypeToastInterface, title?:string) {
    return this.toastService.show(message,title,this.individualConfig,type)
  }

  configAlert(icon: string, message: string, type: string): void {
    $.notify(
      {
        icon: `nc-icon ${icon}`,
        message: message,
      },
      {
        type: type,
        delay: 3000,
        allow_dismiss: false,
        placement: {
          from: 'bottom',
          align: 'right',
        },
      }
    );

  }

  isDevMode() {
    if (isDevMode()) {
      $.notify(
        {
          icon: `nc-icon design_window-dev`,
          message: 'Estás en un entorno de pruebas',
        },
        {
          type: 'info',
          delay: 0,
          allow_dismiss: true,
          placement: {
            from: 'bottom',
            align: 'right',
          },
        }
      );
    }
  }
}
