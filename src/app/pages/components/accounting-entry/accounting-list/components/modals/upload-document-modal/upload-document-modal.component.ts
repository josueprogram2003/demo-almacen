// import { AccountingEntryService } from 'app/core/services/accounting-entry/accounting-entry.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AccountingEntryService } from '../../../../../../../core/services/accounting-entry/accounting-entry.service';

@Component({
  selector: 'app-upload-document-modal',
  templateUrl: './upload-document-modal.component.html',
  styleUrl: './upload-document-modal.component.scss',
})
export class UploadDocumentModalComponent implements OnInit, OnDestroy {
  id?: string;
  formGroup?: FormGroup;
  title: string = 'Subir archivo';
  files: File[] = [];
  isLoaded: boolean = false;
  data = new Date();
  years:any[] = [];
  isLoading: boolean = false;
  public year: number  =0;
  public month: number =0;
  public dropzoneConfig?: DropzoneConfigInterface;
  uploadedFiles: File[] = [];
  nameFiles: string[] = [];
  nameMonths = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  months: any[] = [];
  isMultiple = false;
  constructor(public activeModal: NgbActiveModal, private accountingEntryService:AccountingEntryService) {}
  ngOnDestroy(): void {
    // UploadDocumentModalComponent.prototype.month = null;
  }

  ngOnInit(): void {
    this.dropzoneConfig = {
      clickable: true,
      addRemoveLinks: true,
      previewsContainer: false,
      uploadMultiple: this.month ? false : true,
    };
    this.getYears();
    this.getMonths(this.year);
    if (!this.month) {
      this.isMultiple = true;
      this.month = this.data.getMonth() + 1;
    }
  }
  getYears() {
    for (let i = 2018; i <= this.data.getFullYear() + 1; i++) {
      this.years.push(i);
    }
  }
  viewFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      let  url= reader.result;
    };
    reader.readAsDataURL(file);
  }
  onUploadSuccess(event: any) {
    setTimeout(() => {
      if(!this.isMultiple){
        this.uploadedFiles[0] = event[0] as File;
        this.nameFiles[0] = event[0].name;
      }else{
        this.uploadedFiles.push(event[0] as File);
        this.nameFiles.push(event[0].name);
      }
    }, 0);
  }
  removeFile(index: number) {
    this.uploadedFiles.splice(index, 1);
    this.nameFiles.splice(index, 1);
  }
/*   uploadSingleFile(file: File, month: number, year: number) {
    console.log(file);
    const body = {
      sustenance: file.name
    };
    return this.accountingEntryService.postFile(file, month, year).pipe(
      switchMap(() => this.accountingEntryService.putFileName(this.id, body))
    );
  } */
    getMonths(year:number){
      this.months= [];
      if(year === this.data.getFullYear()){
        for (let i = 1; i <= this.data.getMonth() + 1; i++) {
          this.months.push({id:i,name:this.nameMonths[i-1]});
        }
      }else{
        for (let i = 1; i <= 12; i++) {
          this.months.push({id:i,name:this.nameMonths[i-1]});
        }
      }
    }
  onSave() {
    this.isLoading = true;
    this.accountingEntryService.postFile(this.uploadedFiles,this.nameFiles, this.month, this.year, this.id).subscribe(() => {
      this.isLoading = false;
      this.activeModal.close(true);
    })
/*     if (this.month) {
      this.uploadSingleFile(this.uploadedFiles[0], this.month, this.year).subscribe(res => {
        this.activeModal.close({ data: res, message: 'Archivo subido exitosamente' });
      });
    } else {
      this.accountingEntryService.postFiles(this.uploadedFiles, this.year.toString()).subscribe(res => {
        this.activeModal.close({ data: res, message: 'Archivos subidos exitosamente' });
      });
    } */
  }

}
