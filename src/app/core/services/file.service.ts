import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  getExtencion(name: any) {
    return name.split('.').pop();
  }

  getIcon(icon: string | undefined) {
    switch (icon) {
      case 'pdf':
        return 'assets/icons/files/pdf.svg';
      case 'docx':
      case 'doc':
      case 'docm':
      case 'dotx':
      case 'dotm':
        return 'assets/icons/files/word.svg';
      case 'csv':
      case 'xls':
      case 'xlsx':
        return 'assets/icons/files/excel.svg';
      case 'ppt':
      case 'pptx':
      case 'pptm':
      case 'potx':
      case 'potm':
      case 'ppam':
      case 'ppsx':
      case 'ppsm':
      case 'sldx':
      case 'sldm':
      case 'thmx':
        return 'assets/icons/files/ppt.svg';
      case 'png':
      case 'jpg':
      case 'jpeg':
        return 'assets/icons/files/image.svg';
      default:
        return 'assets/img/new-document.png';
    }
  }

  getIconStatus(icon: string) {
    switch (icon) {
      case 'pdf':
        return true;
      case 'png':
      case 'jpg':
      case 'jpeg':
        return true;
      default:
        return false;
    }
  }

}
