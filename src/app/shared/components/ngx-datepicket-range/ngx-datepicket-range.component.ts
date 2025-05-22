import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, type OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'adra-ngx-datepicket-range',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule
  ],
  templateUrl: './ngx-datepicket-range.component.html',
  styleUrl: './ngx-datepicket-range.component.scss',
})
export class NgxDatepicketRangeComponent implements OnInit {
  @Input() control?: AbstractControl;
  @Input() date: Date[] = [];
  @Input() IsConvocatoria: boolean = false;
  @Input() OtherDate: boolean = false;
  @Input() DateIngress = new Date();
  @Input() DateminDate = new Date();
  @Output() onChangesValues = new EventEmitter<any>();

  today: Date = new Date();
  minDate!: Date;
  maxDate!: Date;

  constructor(private _localeService: BsLocaleService) {
    this._localeService.use('es');
  }

  ngOnInit(): void {
    this.changeFechas();
  }

  changeFechas() {
    if (this.IsConvocatoria) {
      this.maxDate = new Date(
        this.DateIngress.getFullYear(),
        this.DateIngress.getMonth(),
        this.DateIngress.getDate() - 1,
        this.DateIngress.getHours(),
        this.today.getMinutes()
      );
      this.minDate = new Date(
        this.DateminDate.getFullYear(),
        this.DateminDate.getMonth(),
        this.DateminDate.getDate(),
        this.today.getHours(),
        this.today.getMinutes()
      );
    }
    if (this.IsConvocatoria != true && this.OtherDate) {
      this.minDate = new Date(
        this.DateminDate.getFullYear(),
        this.DateminDate.getMonth(),
        this.DateminDate.getDate(),
        this.today.getHours(),
        this.today.getMinutes()
      );
    }
  }
  onValueChange(value: any): void {
    if (value) {
      this.control?.setValue(value);
      this.onChangesValues.emit(value)
    }
  }
  change() {
    this.control?.setValue(this.date);
  }
}
