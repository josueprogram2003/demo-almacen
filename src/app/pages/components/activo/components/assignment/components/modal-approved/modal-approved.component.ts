import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { ExportDocService } from '../../../../../../../core/services/assignment/exportDoc.service';
import { AsignacionService } from '../../../../../../../core/services/activo/asignacion.service';
import { AssetEmployee, AssigmentPlaceholder } from '../../../../../../../core/models/assetEmployee.model';

@Component({
  selector: 'app-modal-approved',
  templateUrl: './modal-approved.component.html',
  styleUrl: './modal-approved.component.scss',
})
export class ModalApprovedComponent implements OnInit {
  title!: string;
  isLoading: boolean = false;
  formGroup: FormGroup = new FormGroup({});
  item?: AssetEmployee;
  state!: number | null;;
  blobstatic: Blob | null = null;
  blobstaticConvert: Blob | null = null;

  data: AssigmentPlaceholder = {
    fullname: '',
    dni: '',
    area: '',
    sede: '',
    asset: '',
    model: '',
    brand: '',
    serie: '',
    code: '',
    color: '',
    state: '',
    observation: '',
    date: ''
  };
  public src: any;
  urlSafe: SafeResourceUrl | undefined;
  valid:any;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private service: AsignacionService, private serviceDoc: ExportDocService, private sanitizer: DomSanitizer) {
    this.formGroup = this.fb.group({
      isApproved: [{value: false, disabled: false}, [Validators.required]]
    })
  }


  async ngOnInit(): Promise<void> {
    await this.changeFile();
    if (this.item) {
      this.formGroup.patchValue({
        "isApproved": this.item.isApproved ? this.item.isApproved : false
      })
      this.valid = this.item.isApproved;
      if(this.valid){
        this.formGroup.get('isApproved')?.disable();
      }
    }


    if (this.item?.id != null && this.item?.id != '') {
      this.data = await lastValueFrom(this.service.getassignmentPlaceholders(this.item.id));
      if (this.blobstatic && this.item?.id != null && this.item?.id !== '') {
        this.data = await lastValueFrom(this.service.getassignmentPlaceholders(this.item.id));
        this.blobstaticConvert = await this.serviceDoc.loadFile(this.blobstatic, this.data);
      }
    }
  }


  setBlobUrl(blob: Blob) {
    const blobUrl = URL.createObjectURL(blob);
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
  }


  dowloand() {
  if (this.blobstaticConvert) {
    this.serviceDoc.downloadDocx(this.blobstaticConvert);
  } else {
    console.warn('No hay documento para descargar.');
  }
}

  async changeFile() {
    switch (this.state) {
      case 1:
        this.blobstatic = await lastValueFrom(this.service.getAssigmentDocDowloand('FORMATO_PRESTAMO_DE_EQUIPOS'));
        break;
      case 2:
        this.blobstatic = await lastValueFrom(this.service.getAssigmentDocDowloand('FORMATO_DEVOLUCION_DE_EQUIPOS'));
        break;
      default:
        break;
    }
  }


  onGuardar() {
  if (!this.formGroup.invalid && this.valid != true) {
    this.isLoading = true;

    const { isApproved } = this.formGroup.value;

    if (!this.blobstaticConvert) {
      console.error('Documento no disponible');
      return;
    }

    const docxFile = this.serviceDoc.prepareDocx(this.blobstaticConvert);
    const formData = new FormData();
    formData.append("file", docxFile);
    formData.append("nameFile", docxFile.name);
    formData.append("isApproved", isApproved);
    if (this.item) {
      this.service.putIsApprovedAssigment(this.item?.id, formData).subscribe({
      next: () => {
        this.isLoading = false;
        this.activeModal.close(true);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
    }
    
  }
}


}
