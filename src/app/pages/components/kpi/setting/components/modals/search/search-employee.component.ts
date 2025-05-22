import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IndicadorService } from '../../../../core/services/Indicador.service';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrl: './search-employee.component.scss',
})
export class SearchEmployeeComponent implements OnInit {
  @Output() evenSearch = new EventEmitter<any>();
  keyword = 'fullName';
  usersData: any[] = [];
  employee?: any;
  constructor(private employeeService:IndicadorService) {}
  ngOnInit() {
  }
  onSearch() {
    this.evenSearch.emit(this.employee.personId);
  }
  async onChangeSearch(search: string) {
    if (search.length > 2) {
      this.usersData = await lastValueFrom(
        this.employeeService.getEmployeeByNameV2(search)
      );
      this.usersData = this.usersData.map((e)=>({...e, fullName: e.employee.person.name+' '+e.employee.person.firstSurname+' '+e.employee.person.secondSurname}))
    }
  }
  onSelectUser(user: any) {
    this.employee = user;
    this.evenSearch.emit(this.employee);
  }
  onCleared() {
    this.employee = undefined;
    this.evenSearch.emit(this.employee);
  }
}
