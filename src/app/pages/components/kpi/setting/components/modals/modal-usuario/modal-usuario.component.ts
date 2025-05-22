import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndicadorService } from '../../../../core/services/Indicador.service';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrl: './modal-usuario.component.scss',
})
export class ModalUsuarioComponent implements OnInit {

  public idIndicador!: number;
  formGroup: UntypedFormGroup = new UntypedFormGroup({})
  title = "Nuevo Usuario"
  isLoading: boolean = false;

  constructor(private formBuilder: UntypedFormBuilder, private indicadorService: IndicadorService, public activeModal: NgbActiveModal){
    this.formGroupInit();
  }

  ngOnInit(): void {
  }

   onGuardar(){
    if(!this.formGroup.invalid){
      this.isLoading = true;
      this.indicadorService.postIndicadorUsuario(this.formGroup.getRawValue()).subscribe(res => {
        if (res) {
          this.isLoading = false;
          this.activeModal.close(true);
        }
      },(err)=>{
          this.isLoading = false;
      })
    }
  }

  userSelected(data:any){
    if (data) {
      this.formGroup.patchValue({
        username:null,
        userId: data.userId,
      });
    }
  }

  formGroupInit() {
    this.formGroup = this.formBuilder.group({
      username: [""],
      userId: [null, Validators.required],
      indicatorPowerBI: this.formBuilder.group({
        id: [this.idIndicador, [Validators.required]]
      })
    })
  }


}
