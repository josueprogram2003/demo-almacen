import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaestraService } from '../../../../../../../core/services/maestra.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  formGroup: FormGroup = new FormGroup({});
  date: Date = new Date();
  @Output() params = new EventEmitter<Object>();
  mes: { month: number, name: string }[] = []

  yearsData = this.getYearsSince(2020)
  constructor(private fb: FormBuilder, private service: MaestraService) {
    this.formGroup = this.fb.group({
      "year": [this.date.getFullYear(), []],
      "month": ["", []],
      "status": ["", []],
      "value":["",[]],
    })
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Activo' },
      { label: 'Asiento depreciación', active: true },
    ];
    this.mes = this.service.getMonths();
    this.search();
  }

  changeFiltro(){
    this.search();
  }

  search() {
    this.params.emit({ action: 'search', values: this.formGroup.value })
  }

  newCreate() {
    this.params.emit({
      action: 'new',
      values: null,
    })
  }

  getYearsSince(initYear: number): { year: number }[] {
    const array = []
    while (initYear <= new Date().getFullYear()) {
      array.push({ year: initYear })
      initYear++
    }
    return array
  }
}
