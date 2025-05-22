import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef, Type, type OnInit } from '@angular/core';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationUtilService } from '../../services/notification-util.service';

type accept_string = 'pdf' | 'image';


@Component({
  selector: 'app-form-input-file',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './form-input-file.component.html',
  styleUrl: './form-input-file.component.scss',
})
export class FormInputFileComponent implements OnInit {

  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial'; // Variable to store file status
  accept_string: string = '';

  @Input() name_file: string = 'Seleccione un archivo';
  @Input() name_file_prefijo: string = '';
  @Input() name_file_sufijo: string = '';
  @Input() size_bytes: number = 7;
  @Input() accept_type: string = 'application/pdf,image/jpeg,image/png,image/gif,image/svg+xml';
  @Input() control!: AbstractControl;
  @Input() type: string = 'bank';
  @Output() evenChange = new EventEmitter<any>();
  @Output() evenDisplay = new EventEmitter<any>();
  @Input() changeName = true;
  @Input() classNameInput="sm"

  accept_images: string[] = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/jpeg',
    'image/svg+xml',
  ];
  accept_documents: string[] = ['application/pdf'];
  maxSizeInBytes: number = this.size_bytes * 1024 * 1024;
  file_size: number = 0;
  file: File | null = null; // Variable to store file

  filePreview: any = {};
  file_type: string = '';
  urlSafe!: SafeResourceUrl;
  display: boolean = true;


  constructor(private service: NgbModal,
    public sanitizer: DomSanitizer,
    private notificationService: NotificationUtilService) { }


  ngOnInit(): void {
  }


  checkedDisplay() {
    if (this.name_file != 'Seleccione un archivo') {
      this.display = false;
    }
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

  onChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      {
        if (this.change_accept_type(file) == false) {
          this.notificationService.configToast(
            `Solo se permiten archivos de tipo ${this.accept_string}`, 'toast-error'
          );
        } else {
          if (file.size > this.maxSizeInBytes) {
            this.notificationService.configToast(
              `El archivo no debe superar ${this.size_bytes}MB`, 'toast-error'
            );
          } else {
            this.status = 'success';
            this.file = file;
            this.name_file = this.file.name;
            if(this.changeName){
              this.change_name_file();
            }
            this.file_type = this.file.type;
            this.file_size = this.file.size;
            const static_file = new File([file], this.name_file, { type: file.type });
            const reader = new FileReader();
            reader.onload = () => {
              this.filePreview = reader.result;
            };
            reader.readAsDataURL(static_file);
            this.control.setValue(static_file);
            this.evenChange.emit({ name: this.name_file, file: static_file });
            this.display = false;
          }
        }
      }
    }
  }


  change_name_file() {
    this.name_file =
      this.name_file_prefijo +
      '-' +
      this.name_file_sufijo +
      '.' +
      this.file?.name.split('.')[this.file?.name.split('.').length - 1];
  }

  open(content: TemplateRef<any>) {
    if (this.file != undefined) {
      this.urlSafe = this.getlink(this.filePreview);
      this.service.open(content, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
      });
    } else if (this.name_file != 'Seleccione un archivo') {
      this.evenDisplay.emit({ name: this.name_file, file: this.file, type: this.type });
    }
    if (this.name_file == 'Seleccione un archivo') {
      this.notificationService.configToast(
        `Seleccione un archivo`, 'toast-warning'
      );
    }
  }

  getlink(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
