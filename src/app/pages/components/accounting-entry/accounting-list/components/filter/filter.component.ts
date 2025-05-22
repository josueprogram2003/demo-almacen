import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  projects: any[] = [];

  @Input() set chipDelete(values:{label:string, name:string,value:any}){
    if(values){
      this.formgroup.get(values.name)?.setValue(null)
    }
  }


  @Output() evenFilterProjects = new EventEmitter<any>();
  @Output() eventChipsObject = new EventEmitter<any>();
  data = new Date();
  public formgroup = new FormGroup({
    year: new FormControl<any>(this.data.getFullYear()),
    month: new FormControl<any>(this.data.getMonth() + 1),
    project: new FormControl<any>(0),
    state: new FormControl<any>(0),
    username: new FormControl<any>(""),
    seat: new FormControl<any>(null),
    lastDigitSeat: new FormControl<any>(null)
  });
  years: number[] = [];
  months: any[] = [];
  nameMonths = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  states: {id:number, name:string}[] = [
    {id: 1, name:'Sin sustento'},
    {id: 2, name:'Por revisar'},
    {id: 3, name:'Observado'},
    {id: 4, name:'Revisado'},
  ]
  digitSeat = [
    { value: 1, name: 'VENTAS' },
    { value: 2, name: 'COMPRAS CREDITO FISCAL' },
    { value: 3, name: 'COMPRAS SIN CREDITO FISCAL' },
    { value: 4, name: 'COMPRAS NO GRAVADAS' },
    { value: 5, name: 'HONORARIOS' },
    { value: 6, name: 'LIBRE' },
    { value: 7, name: 'TRANSFERENCIAS' },
    { value: 8, name: 'LIBRE' },
    { value: 9, name: 'DIARIO' }
  ]
  constructor() { }
  ngOnInit(): void {
    this.getData().then(() => {
      this.filter();
    });
  }

  async getData() {
    await this.getYears();
    this.getMonths(this.formgroup.value.year);
  }

  getYears() {
    for (let i = 2018; i <= this.data.getFullYear() + 1; i++) {
      this.years.push(i);
    }
  }

  filter() {
    this.chipsObjectArray();
    this.evenFilterProjects.emit(this.formgroup.value);
    this.closeoffcanvas();
  }
  resetForm() {
    this.formgroup.patchValue({
      year: this.data.getFullYear(),
      month: this.data.getMonth() + 1,
      project: null,
      state: null,
      username: null,
      seat: null,
      lastDigitSeat: null
    });
  }
  openEnd() {
    document.getElementById('projectsFilters')?.classList.add('show');
    document.querySelector('.backdropProject')?.classList.add('show');
  }

  closeoffcanvas() {
    document.getElementById('projectsFilters')?.classList.remove('show');
    document.querySelector('.backdropProject')?.classList.remove('show');
  }
  getMonths(year: number) {
    this.months = [];
    if (year === this.data.getFullYear()) {
      for (let i = 1; i <= this.data.getMonth() + 1; i++) {
        this.months.push({ id: i, name: this.nameMonths[i - 1] });
      }
    } else {
      for (let i = 1; i <= 12; i++) {
        this.months.push({ id: i, name: this.nameMonths[i - 1] });
      }
    }
  }

  chipsObjectArray() {
  //   var chipArray = Object.keys(this.formgroup.value).map((e, i) => {
  //     var label = "";
  //     switch (e) {
  //       case "month":
  //         label = this.nameMonths[this.formgroup.value[e]-1]
  //         break;
  //       case "state":
  //         if(this.formgroup.value[e]!= null){
  //           label = this.states.find((u:any)=>u.id == this.formgroup.value[e])?.name;
  //         }
  //         break;
  //       case "lastDigitSeat":
  //         if(this.formgroup.value[e]!= null){
  //           label = this.digitSeat.find((u)=>u.value == this.formgroup.value[e])?.name;
  //         }
  //         break;
  //       default:
  //         if(this.formgroup.value[e] != null){
  //           label = this.formgroup.value[e]?.toString();
  //         }
  //         break;
  //     }
  //     return { name: e, label: label, value: this.formgroup.value[e] }
  //   })
  //  chipArray  = chipArray.filter((e)=>e.label!= '');
  //   this.eventChipsObject.emit(chipArray);
  }

}
