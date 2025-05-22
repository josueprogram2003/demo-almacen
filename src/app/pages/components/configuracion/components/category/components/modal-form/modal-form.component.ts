import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfiguracionService } from '../../../../../../../core/services/activo/configuracion.service';
import { Brand } from '../../../../../../../core/models/activoDetails.model';
import { Category } from '../../../../../../../core/models/category.model';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.scss'
})
export class ModalFormComponent implements OnInit {
  title!: string;
  isLoading: boolean = false;
  formGroup: FormGroup = new FormGroup({})
  data!: null | Category;

  marcas: Brand[] = [];

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private service: ConfiguracionService) {
    this.formGroup = this.fb.group({
      "id": ["", []],
      "name": ["", Validators.required],
      "description": ["", Validators.required],
      "code": ["", Validators.required],
      "type": ["", Validators.required],
      "isActive": ["", []],
      "companyId": [sessionStorage.getItem('companyId'), Validators.required],
    })
  }

  ngOnInit(): void {
    if (this.data) {
      this.formGroup.patchValue({
        ...this.data
      })
    }
  }

  onGuardar() {
    if (!this.formGroup.invalid) {
      this.isLoading = true;
      if (this.data == null) {
        // Add
        let body = this.formGroup.value;
        delete body.id;
        this.service.postCategory(body).subscribe(
          (data) => {
            this.isLoading = false;
            this.activeModal.close(true);
          }, (err) => {
            this.isLoading = false;
            console.log(err);
          }
        )
      } else {
        // Edit
        this.service.putCategory(this.formGroup.value).subscribe(
          (data) => {
            this.isLoading = false;
            this.activeModal.close(true);
          }, (err) => {
            this.isLoading = false;
            console.log(err);
          }
        )
      }
    }
  }

}