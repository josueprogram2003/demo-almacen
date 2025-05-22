import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Observable, Observer, debounceTime, distinctUntilChanged, tap, filter, switchMap, catchError, of } from 'rxjs';
import { ConfiguracionService } from '../../../../../../../core/services/activo/configuracion.service';
import { AsignacionService } from '../../../../../../../core/services/activo/asignacion.service';
import { BusinessUnitService } from '../../../../../../../core/services/activo/businessUnitService.service';
import { MaestraService } from '../../../../../../../core/services/maestra.service';
import { CostCenter } from '../../../../../../../core/models/costCenter.model';
import { BusinessUnit } from '../../../../../../../core/models/businessUnit.model';
import { getYearsSince } from '../../../../../../../utils';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  yearsData = getYearsSince(1993)
  formGroup: FormGroup = new FormGroup({})
  groups: any[] = [];
  suggestions$?: Observable<any[]>;
  suggestionsCode$?: Observable<any[]>;
  suggestionsSerialNumber$?: Observable<any[]>;
  suggestionsDescription$?: Observable<any[]>;
  searching: boolean = false;
  searchFailed: boolean = false;
  employeed: any = {};
  businessUnits: BusinessUnit[] = [];
  costCenters: CostCenter[] = [];
  areas : any[] = [];
  mes: { month: number, name: string }[] = []

  depreciateStatus: { id: string, name: string }[] = [
    {
      id: "1",
      name: "Activo"
    },
    {
      id: "2",
      name: "Depreciado"
    },
    {
      id: "3",
      name: "De baja"
    },
    {
      id: "4",
      name: "Vendido"
    }
  ]



  @Output() params = new EventEmitter<{ action: string, values: any }>()
  constructor(private fb: FormBuilder, private serviceConfig: ConfiguracionService, private serviceUser: AsignacionService, private businessUnitService: BusinessUnitService, private service: AsignacionService, private master: MaestraService) {
    this.formGroup = this.fb.group({
      "year": ["", []],
      "month": ["", []],
      "state": ["", []],
      "assetGroupId": ["", []],
      "value": ["", []],
      "size": [10, []],
      "search": ["", []],
      "employeeId": ["", []],
      "businessUnitId": ["", []],
      "areaId": ["", []],
      "costCenterId": ["", []],
      "code": ["", []],
      "series": ["", []]
    })
  }

  ngOnInit(): void {
    this.mes = this.master.getMonths();
    this.breadCrumbItems = [
      { label: 'Activo' },
      { label: 'Inicio', active: true },
    ];
    this.getGroup();
    this.changeWriter();
    this.getBusinessUnits();
    this.changeWriterCode();
    this.changeWriterDescription();
    this.changeWriterSerialNumber();
  }

  getDepreciateStatus(state: string) {
    return this.depreciateStatus.find((e: any) => e.id == state)?.id
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
      switchMap((term:any) =>
        this.serviceUser.getEmployee(term).pipe(
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

  changeWriterCode() {
    this.suggestionsCode$ = new Observable((observer: Observer<string | undefined>) => {
      const { code } = this.formGroup.value;
      observer.next(code)
    }).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      filter((term:any) => term.length > 3),
      switchMap((term) =>
        this.service.getAllSeriesAsset(term).pipe(
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

  changeWriterDescription() {
    this.suggestionsDescription$ = new Observable((observer: Observer<string | undefined>) => {
      const { value } = this.formGroup.value;
      observer.next(value)
    }).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      filter((term:any) => term.length > 3),
      switchMap((term) =>
        this.service.getAllDescriptionsAsset(term).pipe(
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



  changeWriterSerialNumber() {
    this.suggestionsSerialNumber$ = new Observable((observer: Observer<string | undefined>) => {
      const { series } = this.formGroup.value;
      observer.next(series)
    }).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      filter((term:any) => term.length > 3),
      switchMap((term) =>
        this.service.getAllSeriesAsset(term).pipe(
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




  getBusinessUnits() {
    this.businessUnitService.get().subscribe((res) => {
      this.businessUnits = res.data;
    })
  }

  search() {
    const data = this.formGroup.value;
    data.state = data.state ? data.state : 0;
    data.assetGroupId = data.assetGroupId ? data.assetGroupId : 0;
    data.businessUnitId = data.businessUnitId ? data.businessUnitId : 0;
    data.areaId = data.areaId ? data.areaId : 0;
    data.costCenterId = data.costCenterId ? data.costCenterId : 0;
    data.employeeId = data.employeeId ? data.employeeId : 0;
    data.year = data.year ? data.year : 0;
    data.month = data.month ? data.month : 0;
    data.value = data.value ? data.value : 0;
    data.code = data.code ? data.code : 0;
    data.series = data.series ? data.series : 0;
    if (data.areaId == 0) {
      delete data.areaId;
    }
    if (data.assetGroupId == 0) {
      delete data.assetGroupId;
    }
    if (data.businessUnitId == 0) {
      delete data.businessUnitId;
    }
    if (data.costCenterId == 0) {
      delete data.costCenterId;
    }
    if (data.employeeId == 0) {
      delete data.employeeId;
    }
    if (data.year == 0) {
      delete data.year;
    }
    if (data.state == 0) {
      delete data.state;
    }
    if (data.month == 0) {
      delete data.month;
    }
    if(data.value == 0){
      delete data.value;
    }
    if(data.code == 0){
      delete data.code;
    }
    if(data.series == 0){
      delete data.series
    }


    delete data.search;
    let json = {
      action: "search",
      values: data,
    }
    this.params.emit(json)
    this.closeoffcanvas();
  }

  getCostCenter(id: string): void {
    this.formGroup.get('costCenterId')?.setValue("");
    this.businessUnitService.costCenterByBussinesUnitId(id).subscribe((response) => {
      this.costCenters = response;
    });
  }

  getAreas(id: string): void {
    this.formGroup.get('areaId')?.setValue("");
    this.businessUnitService.getAreas(id).subscribe((response) => {
      this.areas = response.data;
    });
  }
  clear() {
    this.formGroup.reset();
    this.formGroup.get("size")?.setValue(10);
    let json = {
      action: "search",
      values: null,
    }
  }


  async getGroup() {
    this.groups = (await this.serviceConfig.getGroupAll())?.data;
    if (this.groups.length > 0) {
      this.search();
    }
  }

  add() {
    let json = {
      action: "new",
      values: null
    }
    this.params.emit(json)
  }

  sync() {
    let json = {
      action: "sync",
      values: null
    }
    this.params.emit(json)
  }

  generateQR() {
    this.params.emit({ "action": "qr", "values": null })
  }

  export() {
    this.params.emit({ "action": "export", "values": this.formGroup.value })
  }

  openEnd() {
    document.getElementById('filters')?.classList.add('show');
    document.querySelector('.backdrop1')?.classList.add('show');
  }

  closeoffcanvas() {
    document.getElementById('filters')?.classList.remove('show');
    document.querySelector('.backdrop1')?.classList.remove('show');
  }

  changeWrite(item: any) {
    if (item?.target?.value == '') {
      this.formGroup.get('employeeId')?.setValue("");
    }
  }

  changeWriteCode(item: any) {

  }

  onChange({ item }: TypeaheadMatch) {
    this.employeed = item;
    this.formGroup.get('employeeId')?.setValue(this.employeed?.id)
  }

  onChangeCode({ item }: TypeaheadMatch) {
  }
}
