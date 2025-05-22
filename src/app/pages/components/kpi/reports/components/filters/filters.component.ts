import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { RootReducerState } from '../../../../../../utils';
import { IndicadorService } from '../../../core/services/Indicador.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  indicadorLista: any[] = [];
  businesstUnit: any[] = [];
  formGroup:FormGroup = new FormGroup({})
  userId: string = '';
  @Output() params = new EventEmitter<object>()


  constructor(
    private indicadorSerivce: IndicadorService,
    private fb:FormBuilder,
    private store:Store<RootReducerState>
  ) {
    this.getbusinessUnit();
    this.formGroup = this.fb.group({
      "idIndicador":[null,Validators.required],
      "idBussinestUnit":[null,Validators.required]
    })
   }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Configuracion' },
      { label: 'Reportes', active: true },
    ];
    this.store.select('dataInitial').pipe(take(1)).subscribe((res:any)=>{
      this.userId = res.data.id;
    })
  }


   getIndicators() {
    const { idBussinestUnit } = this.formGroup.value;
    this.indicadorSerivce.getIndicadorByUnidadnegocio(idBussinestUnit,this.userId).subscribe(res=>{
      this.indicadorLista = res;
    })
  }
  getbusinessUnit() {
    this.indicadorSerivce.getbusinessUnit().subscribe((res) => {
      this.businesstUnit = res;
    });
  }

  onChangeReporte() {
    if(!this.formGroup.invalid){
      this.params.emit({option:"list",values:this.formGroup.value})
    }
    // this.indicadorSerivce
    //   .getIndicadorByIdandBussinesUnit(this.idIndicador, this.idBussinestUnit)
    //   .subscribe((res) => {
    //     this.url = this.sanitizer.bypassSecurityTrustResourceUrl(res.url);
    //   });
  }

}
