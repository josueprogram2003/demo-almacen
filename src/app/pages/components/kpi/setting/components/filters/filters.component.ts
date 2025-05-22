import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IndicadorService } from '../../../core/services/Indicador.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  businesstUnit: any[] = [];
  @Output() paramsfilter = new EventEmitter<object>()

  formGroup:FormGroup = new FormGroup({})

  constructor(
    private indicadorService: IndicadorService,
    private fb:FormBuilder,
  ) { 
    this.formGroup = this.fb.group({
      value:["",[]],
      businessUnitId:["",[]],
    })
  }

  ngOnInit(): void {
    this.getbusinessUnit();
    this.breadCrumbItems = [
      { label: 'Configuracion' },
      { label: 'Indicadores', active: true },
    ];
    this.search();
  }

  getbusinessUnit() {
    this.indicadorService.getbusinessUnit().subscribe((res) => {
      this.businesstUnit = res;
    });
  }

  select(event:any){
    this.paramsfilter.emit({value:this.formGroup.value, action:'filter'})
  }

  search(){
    this.paramsfilter.emit({value:this.formGroup.value, action:'filter'})
  }

}
