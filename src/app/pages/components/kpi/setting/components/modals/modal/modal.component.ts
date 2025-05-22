import { Component, type OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndicadorService } from '../../../../core/services/Indicador.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {

  isLoading: boolean = false;
  formGroup: UntypedFormGroup = new UntypedFormGroup({});
  public id!: number;
  public isView!: boolean;
  title: string = 'Nuevo indicador';
  businesstUnit!: any[];

  constructor(public activeModal: NgbActiveModal,
    private indicadorService: IndicadorService,
    private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.getbusinessUnit();
    this.formGroupInit();
    if (this.id) {
      this.title = 'Editar indicador';
      this.indicadorService.getIndicadorById(this.id).subscribe((res) => {
        this.formGroup.patchValue(res);
        if (this.isView) {
          this.title = 'Ver detalle indicador';
          this.formGroup.disable();
        }
      });
    }

  }

  getbusinessUnit() {
    this.indicadorService.getbusinessUnit().subscribe((res) => {
      this.businesstUnit = res;
    });
  }
  onGuardar() {
    if (!this.formGroup.invalid) {
      this.isLoading = true;
      if (this.id) {
        //!Editar
        this.indicadorService
          .putIndicador(this.formGroup.getRawValue())
          .subscribe((res) => {
            if (res) this.activeModal.close(res);
            this.isLoading = false;
          }, (err) => {
            this.isLoading = false;
          });
      }else{
        this.indicadorService
          .postIndicador(this.formGroup.getRawValue())
          .subscribe((res) => {
            if (res) this.activeModal.close(res);
            this.isLoading = false;
          }, (err) => {
            this.isLoading = false;
          });
      }
    }

  }

  formGroupInit() {
    this.formGroup = this.formBuilder.group({
      id: [null],
      code:[null,[]],
      businessUnitId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      url: [null, [Validators.required]],
      companyId: [sessionStorage.getItem('companyId'), [Validators.required]],
    });
  }

}
