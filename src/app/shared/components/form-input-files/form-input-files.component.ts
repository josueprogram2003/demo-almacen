import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef, type OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { uuidv7 } from "uuidv7";
import { NotificationUtilService } from '../../services/notification-util.service';
import { FileService } from '../../../core/services/file.service';


@Component({
  selector: 'app-form-input-files',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './form-input-files.component.html',
  styleUrl: './form-input-files.component.scss',
})
export class FormInputFilesComponent implements OnInit {

  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';
  accept_string: string = '';
  formGroup: FormGroup = new FormGroup({});
  formGroupData: FormGroup = new FormGroup({})

  @Input() title: string = "";
  // @Input() name_file: string = 'Seleccione un archivo';
  @Input() name_file: string = '';
  @Input() name_file_static: string = '';
  @Input() number_files: number = 3;
  @Input() name_file_prefijo: string = '';
  @Input() name_file_sufijo: string = '';
  @Input() size_bytes: number = 7;
  @Input() control: FormArray = this.fb.array([]);
  @Input() controlRemove: FormArray = this.fb.array([]);
  @Input() accept_types:string = "application/pdf,image/jpeg,image/png,image/gif,image/svg+xml";
  @Input() disabled:boolean = false;
  @Output() eventChange = new EventEmitter<FormArray>();
  @Output() eventRemove = new EventEmitter<FormArray>();
  @Output() evenDisplay = new EventEmitter<Object>();
  @Input() classNameInput="sm"
  @Input() titleBoolean:boolean = true;

  file: File | undefined;
  maxSizeInBytes: number = this.size_bytes * 1024 * 1024;
  accept_documents: string[] = ['application/pdf'];
  accept_images: string[] = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/jpeg',
    'image/svg+xml',
  ];
  urlSafe: SafeResourceUrl | undefined;

  constructor(private service: NgbModal,
    public sanitizer: DomSanitizer,
    private notificationService: NotificationUtilService,
    private fb: FormBuilder, private fileService: FileService) {
  }


  ngOnInit(): void {
    this.formGroup = this.fb.group({
      files: this.control,
      filesRemove: this.controlRemove,
    })
  }

  get files(): FormArray {
    return this.formGroup.controls["files"] as FormArray;
  }
  get filesRemove(): FormArray {
    return this.formGroup.controls["filesRemove"] as FormArray;
  }


  newFile(item: any): FormGroup {
    return this.fb.group({
      "name": item.name,
      "file": item?.file,
      "type": item?.type,
      "filePreview": item?.filePreview,
      "isActive": true,
      "icon": [this.getIcon(this.getExtencion(item.name)), []],
      "assetId": [item?.assetId, []],
      "id": [item?.id ? item.id : "", []],
      "objectKey": item?.objectKey,
    })
  }

  onFileChange(event: Event) {
    var limite_files: boolean = false;
    const inputElement = event.target as HTMLInputElement;
    if (this.files.length + 1 <= this.number_files) {
      Array.from(inputElement.files as FileList).map((e, index) => {
        // this.name_file = "";
        if (this.files.length + index + 1 <= this.number_files) {
          if (this.change_accept_type(e) == false) {
            this.notificationService.configToast(
              `Solo se permiten archivos de tipo ${this.accept_string}`, 'toast-error'
            );
          } else {
            if (e.size > this.maxSizeInBytes) {
              this.notificationService.configToast(
                `El archivo no debe superar ${this.size_bytes}MB`, 'toast-error'
              );
            } else {
              this.file = e;
              const id =uuidv7()
              this.name_file = (this.name_file_static!=null &&this.name_file_static!='' ? this.name_file_static+'-'+Math.floor(1000 + Math.random() * 9000) : ''+id ) + '.' + this.file.name.split('.')[this.file.name.split('.').length - 1];
              var filePreview: any;
              const static_file = new File([e], this.name_file, { type: e.type });
              this.blobToData(static_file).then((res) => {
                filePreview = res;
                this.files.push(this.newFile({ name: static_file.name, file: static_file, type: e.type, filePreview: filePreview,id: id }));
                this.eventChange.emit(this.files);
              })
            }
          }
        } else {
          limite_files = true;
        }
      })
      if (limite_files) {
        this.notificationService.configToast(
          `El limite de archivos son de ${this.number_files}`, 'toast-error'
        );
      }
    } else {
      this.notificationService.configToast(
        `El limite de archivos son de ${this.number_files}`, 'toast-error'
      );
    }
  }

  getExtencion(name: any) {
    return name.split('.').pop();
  }
  change_accept_type(file: File) {
    let validate = true;
    if (this.accept_string === this.accept_documents.toString()) {
      if (!this.accept_documents.includes(file.type)) {
        validate = false;
      }
    }
    if (this.accept_string === this.accept_images.toString()) {
      if (!this.accept_images.includes(file.type)) {
        validate = false;
      }
    }
    return validate;
  }

  blobToData = (blob: Blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.readAsDataURL(blob)
    })
  }

  remove(index: number, i: FormGroup) {
    i.get('isActive')?.setValue(false);
    if (this.controlRemove != undefined) {
      this.filesRemove.push(i);
    }
    this.files.removeAt(index);
    this.eventRemove.emit(this.files);
  }

  getlink(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  open(content: TemplateRef<any>, i: any) {
    const { name , filePreview, file } = i.value;
    if (this.getIconStatus(this.getExtencion(name))) {
      if (filePreview != undefined) {
        this.urlSafe = this.getlink(filePreview);
        this.formGroupData = i;
        this.service.open(content, {
          ariaLabelledBy: 'modal-basic-title',
          centered: true,
          size: 'lg'
        });
      } else if (name != "selecione un archivo") {
        this.evenDisplay.emit({ ...i.value })
      }
    } else {
      if(filePreview){
        var link = document.createElement('a');
        link.href = filePreview;
        link.download = `${file.name}`;
        link.click();
      }else{
        this.evenDisplay.emit({ ...i.value })
      }
    }

  }


  onDeleteFile(index: number, i: any) {
    i.get('isActive').setValue(false);
    if (this.controlRemove != undefined) {
      this.filesRemove.push(i);
    }
    this.files.removeAt(index);
    this.eventRemove.emit(this.files);
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
