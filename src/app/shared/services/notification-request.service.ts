import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class NotificationService{

  constructor( public toastService: ToastrService) {
   }

   notify(status: number, message: string, type?: string): void {
    switch(status) {
      // 0 - Unknown error
      case 0: {
        this.toastService.error('El dominio de los servicios no está respondiendo', 'Error', {
          timeOut: 3000,
        });
        break
      }
      // 500 - Internal server error
      case 500: {
        this.toastService.error('Servicio no disponible', 'Error', {
          timeOut: 3000,
        });
        break
      }

      case 504: {
        this.toastService.error('Tiempo de espera agotado', 'Error', {
          timeOut: 3000,
        });
        break
      }
      // 401 - Unauthorized
      case 401: {
        if (message === 'unauthorized') {
          this.toastService.error('Tu sesión ha expirado', 'Error', {
            timeOut: 3000,
          });
        } else if (message === 'invalid_token') {
          this.toastService.error('Token inválido', 'Error', {
            timeOut: 3000,
          });
        }
        break
      }
      // 400 - Bad request
      case 400: {
        if (message === 'invalid_grant') {
          this.toastService.error('Datos incorrectos', 'Error', {
            timeOut: 3000,
          });
        } else if (message) {
          this.toastService.error(message, 'Error', {
            timeOut: 3000,
          });
        }
        break
      }
      // 404 - Not found
      case 404: {
        this.toastService.error(message, 'Error', {
          timeOut: 3000,
        });
        break
      }
      default: {
        this.toastService.error('Error inesperado', 'Error', {
          timeOut: 3000,
        });
        break
      }
    }
  }
}
