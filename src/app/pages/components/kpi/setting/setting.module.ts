import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SettingContainerComponent } from './container/setting-container.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ListComponent } from './components/lists/list/list.component';
import { ModalUsuarioComponent } from './components/modals/modal-usuario/modal-usuario.component';
import { ModalComponent } from './components/modals/modal/modal.component';
import { ListUsuariosComponent } from './components/lists/list-usuarios/list-usuarios.component';
import { ListIndicadoresComponent } from './components/lists/list-indicadores/list-indicadores.component';
import { AutocompleteUserComponent } from './components/autocomplete-user/autocomplete-user.component';
import { UserListItemComponent } from './components/autocomplete-user/user-list-item.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchEmployeeComponent } from './components/modals/search/search-employee.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { BreadcrumbsComponent } from '../core/shared/breadcrumbs/breadcrumbs.component';
import { FormGroupComponent } from '../../../../shared/components/form-group/form-group.component';
@NgModule({
  declarations: [
    SettingContainerComponent,
    FiltersComponent,
    ListComponent,
    ModalUsuarioComponent,
    ModalComponent,
    ListUsuariosComponent,
    ListIndicadoresComponent,
    AutocompleteUserComponent,
    UserListItemComponent,
    SearchEmployeeComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule,
    NgSelectModule,
    BsDropdownModule,
    TypeaheadModule,
    NgxSpinnerModule,
    BreadcrumbsComponent,
    FormGroupComponent,
    PaginationModule.forRoot(),
    AutocompleteLibModule
  ]
})
export class SettingModule { }
