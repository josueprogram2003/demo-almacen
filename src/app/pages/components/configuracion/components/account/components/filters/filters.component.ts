import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  formGroup: FormGroup = new FormGroup({})
  @Output() params = new EventEmitter<object>()

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      value: ["", []]
    })
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Configuración' },
      { label: 'Cuenta', active: true },
    ];
  }

  search() { }

  add() {
    let json = {
      action: "new",
      values: null,
    }
    this.params.emit(json)
  }

  typeBody(value: boolean) {
    let json = {
      action: "positicion",
      values: value,
    }
    this.params.emit(json)
  }




}
