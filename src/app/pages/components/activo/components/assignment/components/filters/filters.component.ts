import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Observer, debounceTime, distinctUntilChanged, tap, filter, switchMap, catchError, of } from 'rxjs';
import { AsignacionService } from '../../../../../../../core/services/activo/asignacion.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  formGroup: FormGroup = new FormGroup({})
  materials: any[] = [];
  suggestions$?: Observable<any[]>;
  searching: boolean = false;
  searchFailed: boolean = false;
  @Output() params = new EventEmitter<{action:string, values:any}>()
  employeed: any = {};

  constructor(private fb: FormBuilder, private service: AsignacionService) {
    this.formGroup = this.fb.group({
      "search": ["", [Validators.required]],
      "employeeId": ["", [Validators.required]],
      "fullName":["",[Validators.required]],
    });
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Activo' },
      { label: 'Asignar usuario', active: true },
    ];
    this.changeWriter();
  }

  changeWriter() {
    this.suggestions$ = new Observable((observer: Observer<string | undefined>) => {
      const { search } = this.formGroup.value;
      observer.next(search)
    }).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      filter((term:any) => term.length > 3),
      switchMap((term) =>
        this.service.getEmployee(term).pipe(
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
    )
  }


  onChange(event: any) {
    this.employeed = event.item;
    this.formGroup.get('employeeId')?.setValue(event.item.id)
    this.formGroup.get('fullName')?.setValue(event.item.fullName)
    this.params.emit({ action: 'search', values: this.formGroup.value })
  }

  search() {
    this.params.emit({ action: "search", values: this.formGroup.value })
  }

  add() {
    this.params.emit({ action: 'new', values: this.formGroup.value })
  }

  info(){
    this.params.emit({action:'pdf',values: this.formGroup.value})
  }

  export(){
    this.params.emit({action:'export',values: this.formGroup.value})
  }

}
