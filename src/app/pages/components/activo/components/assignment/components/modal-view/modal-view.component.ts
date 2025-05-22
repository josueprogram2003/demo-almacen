import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Assigned } from '../../../../../../../core/models/assigned.model';
import { ModalPreviewFileComponent } from '../../../../../../../shared/components/modal-preview-file/modal-preview-file.component';
import { NotificationUtilService } from '../../../../../../../shared/services/notification-util.service';
import { AsignacionService } from '../../../../../../../core/services/activo/asignacion.service';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrl: './modal-view.component.scss'
})

export class ModalViewComponent implements OnInit {

  title!: string;
  isLoading: boolean = false;
  formGroup: FormGroup = new FormGroup({})
  data!: null | Assigned;

  imgs: { id: string, url: string }[] = []
  assignmentConditions: { id: number, name: string }[] = [
    {
      id: 1,
      name: 'Nuevo',
    },
    {
      id: 2,
      name: 'Usado',
    },
  ]


  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private service: AsignacionService, private modalService: NgbModal, private notificationService: NotificationUtilService) {
    this.formGroup = this.fb.group({
      "files": this.fb.array([])
    })
  }
  get filesArray(): FormArray {
    return this.formGroup.controls["files"] as FormArray;
  }

  newfile(item: any): FormGroup {
    return this.fb.group({
      "name": item.name,
      "file": item?.file,
      "type": item?.type,
      "filePreview": item?.filePreview,
      "isActive": item.isActive != undefined ? item.isActive : true,
      "assetId": [item?.assetId, []],
      "id": [item?.id, []],
      "objectKey": [item?.objectKey, []]
    })
  }


  ngOnInit(): void {
    if (this.data!=null) {
      
      const { files } = this.data;
      files?.map(async (e: any) => {
        const fileExtension = e.name.split('.').pop()?.toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension!)) {
          const json = {
            objectKey: e.objectKey,
          }
          this.service.getAssetPreviewFile(json).subscribe((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              const url = reader.result as string;
              this.imgs.push({ id: e.id, url: url })
            }
          })
        } else if (fileExtension == 'pdf') {
          this.filesArray.push(this.newfile(e))
          this.formGroup.updateValueAndValidity();
        }
      })
    }
  }

  async eventDisplay({ name, file, type, objectKey }: any) {
    if (name != null) {
      if (objectKey != null) {
        try {
          const json = {
            objectKey: objectKey,
          }
          this.service.getAssetPreviewFile(json).subscribe((blob) => {
            const fileExtension = name.split('.').pop()?.toLowerCase();
            if (fileExtension === 'pdf') {
              var blobpdf = blob.slice(0, blob.size, "application/pdf")
              const pdfUrl = URL.createObjectURL(blobpdf);
              ModalPreviewFileComponent.prototype.src = pdfUrl;
              ModalPreviewFileComponent.prototype.type = 'pdf';
              this.modalService.open(ModalPreviewFileComponent, {
                backdrop: 'static',
                keyboard: false,
                size: 'lg',
                ariaLabelledBy: 'modal-basic-title',
                centered: true,
              });
            }
          });
        } catch (error) {
          this.notificationService.configToast(
            'Error al obtener o mostrar el archivo:' + error, 'toast-error'
          );
        }
      }
    }
  }

  enventFiles(event: FormArray) {
    event.updateValueAndValidity()
    this.formGroup.updateValueAndValidity();
  }


  eventRemove(iArray: FormGroup,) {
    iArray.updateValueAndValidity();
    this.formGroup.updateValueAndValidity();
  }


  changeCondition(id: any) {
    return id != null ? this.assignmentConditions.find((e) => e.id == id)?.name : ''
  }

  onGuardar() { }


}
