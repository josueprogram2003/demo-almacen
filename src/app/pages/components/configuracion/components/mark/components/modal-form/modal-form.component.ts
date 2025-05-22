import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfiguracionService } from '../../../../../../../core/services/activo/configuracion.service';
import { Brand } from '../../../../../../../core/models/brand.model';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.scss'
})
export class ModalFormComponent implements OnInit {
  title!: string;
  isLoading: boolean = false;
  formGroup: FormGroup = new FormGroup({})
  data!: null | Brand;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private service: ConfiguracionService) {
    this.formGroup = this.fb.group({
      "id": ["", []],
      "companyId": [sessionStorage.getItem('companyId'), Validators.required],
      "name": ["", Validators.required],
      "owner": ["", Validators.required],
      "industry": ["", Validators.required],
      "isActive": ["", []],
      "countryOrigin": ["", []],
      "website": ["", [Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]],
      "description": ["", []],
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
        this.service.postBrand(body).subscribe(
          (data) => {
            this.isLoading = false;
            this.activeModal.close(true);
          }, (err) => {
            console.log(err);
            this.isLoading = false;
          }
        )
      } else {
        this.service.putBrand(this.formGroup.value).subscribe(
          (data) => {
            this.isLoading = false;
            this.activeModal.close(true);
          }, (err) => {
            console.log(err);
            this.isLoading = false;
          }
        )
      }
    }
  }

}
