import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  @Output() evenFilter = new EventEmitter<any>();
  formGroup: FormGroup=new FormGroup({
    tkey: new FormControl(null),
    description: new FormControl(null),
  });
  onFilter() {
    this.evenFilter.emit(this.formGroup.value);
  }
}
