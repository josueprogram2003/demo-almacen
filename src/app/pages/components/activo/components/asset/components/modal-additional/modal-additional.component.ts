import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, UntypedFormArray } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { AdditionalActivoService } from '../../../../../../../core/services/activo/additionalActivo.service';

@Component({
  selector: 'app-modal-additional',
  templateUrl: './modal-additional.component.html',
  styleUrl: './modal-additional.component.scss'
})
export class ModalAdditionalComponent implements OnInit {

  minDate = new Date();
  title!: string;
  isLoading: boolean = false;
  data: any;
  formGroup: FormGroup = new FormGroup({})

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal,private service: AdditionalActivoService) {
    this.formGroup = this.fb.group({
      "date": [this.minDate, [Validators.required]],
      "description": ["", [Validators.required]],
      "amount": ["", [Validators.required]],
      "asset": this.fb.group({
        "id": ["", [Validators.required]],
      }),
      "files": this.fb.array([], []),
      "isPriceToDepreciate": [false, [Validators.required]]
    })
  }

  get filesArray(): FormArray {
    return this.formGroup.controls["files"] as UntypedFormArray;
  }

  ngOnInit(): void {
    const { serialNumber, id } = this.data;
    this.formGroup.patchValue({
      "asset": {
        "id": id
      },
    })
  }

  onChangesValues(item: any) {
    // console.log(item);
  }


  changefile(event: any) {
    this.formGroup.get('file')?.setValue(event);
    this.filesArray.updateValueAndValidity();
    this.formGroup.updateValueAndValidity();
  }

  displayfile(event: any) {
    // console.log(event);
  }

  enventFiles(event: FormArray) {
    event.updateValueAndValidity();
    this.filesArray.updateValueAndValidity();
    this.formGroup.updateValueAndValidity();
  }

  eventRemove(iArray: FormArray) {
    iArray.updateValueAndValidity();
    this.filesArray.updateValueAndValidity();
    this.formGroup.updateValueAndValidity();
  }


  onGuardar() { 
    if (!this.formGroup.invalid) {
      this.isLoading = true;
      var files: File[] = [];
      this.filesArray.value.map((e:any) => {
        if (e.file != null)
          files.push(e.file)
      })
      this.filesArray.updateValueAndValidity();
      this.formGroup.updateValueAndValidity();
      var body = this.formGroup.value;
      body.date = moment(body.date).format('YYYY-MM-DD');
      body.files = body.files.map((e:any) => ({
        name: e.name,
        isActive:true,
      }))
      let formData = new FormData();
      formData.append("request", JSON.stringify(body));
      files.map((e) => {
        formData.append("files", e);
      })
      this.service.postAdditional(formData).subscribe((res)=>{
        this.isLoading = false;
        this.activeModal.close(true);
      },(err)=>{
        console.log(err);
        this.isLoading = false;
      })
    }
  }
}

