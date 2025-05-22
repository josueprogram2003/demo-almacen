import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertUtilService {

  constructor() { }
  delete(): Promise<boolean> {
    return Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(3, 142, 220)',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.value) {
        return true;
      } else {
        return false;
      }
    });
  }
  confirm(): Promise<boolean> {
    return Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas continuar con la operación?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'rgb(3, 142, 220)',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        return true;
      } else {
        return false;
      }
    });
  }
  confirmWithText(text: string,title?:string, confirmButtonText?:string, cancelButtonText?: string): Promise<boolean> {
    return Swal.fire({
      title: title?title:'¿Estás seguro?',
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'rgb(3, 142, 220)',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText:  confirmButtonText?confirmButtonText:'Sí',
      cancelButtonText: cancelButtonText?cancelButtonText:'No',
    }).then((result) => {
      if (result.value) {
        return true;
      } else {
        return false;
      }
    });
  }
}
