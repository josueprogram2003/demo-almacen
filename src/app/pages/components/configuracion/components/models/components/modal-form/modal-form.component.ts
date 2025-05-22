import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfiguracionService } from '../../../../../../../core/services/activo/configuracion.service';
import { Brand } from '../../../../../../../core/models/brand.model';
import { Model } from '../../../../../../../core/models/model.model';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.scss'
})
export class ModalFormComponent implements OnInit {
   title!: string;
  isLoading: boolean = false;
  formGroup: FormGroup = new FormGroup({})
  data!: null | Model;

  marcas: Brand[] = [];

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private service: ConfiguracionService) {
    this.formGroup = this.fb.group({
      "id": ["", []],
      "companyId": [sessionStorage.getItem('companyId'), Validators.required],
      "name": ["", Validators.required],
      "brand": this.fb.group({
        "id": ["", [Validators.required]],
      }),
      "isActive": ["", []],
    })
  }

  ngOnInit(): void {
    this.listMarcas();
    if (this.data) {
      this.formGroup.patchValue({
        ...this.data
      })
    }
  }

  listMarcas() {
    this.service.getBrandAll().subscribe((res) => {
      this.marcas = res.data;
    })
  }


  onGuardar() {
    if (!this.formGroup.invalid) {
      this.isLoading = true;
      if (this.data == null) {
        // Add
        let body = this.formGroup.value;
        delete body.modelId;
        this.service.postModel(body).subscribe(
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
        this.service.putModel(this.formGroup.value).subscribe(
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