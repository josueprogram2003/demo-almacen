import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepreciationEntryRoutingModule } from './depreciation-entry-routing.module';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ListComponent } from './components/list/list.component';
import { ContentMainComponent } from './components/content-main/content-main.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UiSwitchModule } from 'ngx-ui-switch';
import { TreeTableModule } from 'primeng/treetable';
import { ModalDetailsComponent } from './components/modal-details/modal-details.component';
import { CountUpModule } from 'ngx-countup';
import { FlatpickrModule } from 'angularx-flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es';
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { FormGroupComponent } from '../../../../../shared/components/form-group/form-group.component';
import { NoResultMessageComponent } from '../../../../../shared/components/no-result-message/no-result-message.component';
import { SearchInputComponent } from '../../../../../shared/components/search-input/search-input.component';
// import { NgxPaginationQuarkusComponent } from '../../../../../shared/components/ngx-pagination-quarkus/ngx-pagination-quarkus.component';


@NgModule({
  declarations: [
    ModalFormComponent,
    FiltersComponent,
    ListComponent,
    ContentMainComponent,
    ModalDetailsComponent
  ],
  imports: [
    CommonModule,
    DepreciationEntryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule,
    BreadcrumbsComponent,
    TypeaheadModule,
    NgxSpinnerModule,
    CountUpModule,
    FormGroupComponent, NoResultMessageComponent, SearchInputComponent,
    // NgxPaginationQuarkusComponent,
    NgbModule,
    NgxMaskDirective, NgxMaskPipe,
    FlatpickrModule.forRoot({ locale: Spanish }),
    TreeTableModule,
    UiSwitchModule.forRoot({
      color: '#44C47D',
      defaultBgColor: '#EB6532',
      checkedTextColor: '#FFF',
      uncheckedTextColor: '#FFF',
    }),
  ]
})
export class DepreciationEntryModule { }
