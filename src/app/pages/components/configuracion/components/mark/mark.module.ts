import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkRoutingModule } from './mark-routing.module';
import { ContentMainComponent } from './components/content-main/content-main.component';
import { ListComponent } from './components/list/list.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
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
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { FormGroupComponent } from '../../../../../shared/components/form-group/form-group.component';
import { NoResultMessageComponent } from '../../../../../shared/components/no-result-message/no-result-message.component';
import { SearchInputComponent } from '../../../../../shared/components/search-input/search-input.component';


@NgModule({
  declarations: [
    ContentMainComponent,
    ListComponent,
    FiltersComponent,
    ModalFormComponent
  ],
  imports: [
    CommonModule,
    MarkRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule,
    BreadcrumbsComponent,
    TypeaheadModule,
    NgxSpinnerModule,
    FormGroupComponent, NoResultMessageComponent, SearchInputComponent,
    NgbModule,
    NgxMaskDirective, NgxMaskPipe,
    TreeTableModule,
    UiSwitchModule.forRoot({
      color: '#44C47D',
      defaultBgColor: '#EB6532',
      checkedTextColor: '#FFF',
      uncheckedTextColor: '#FFF',
    }),
  ]
})
export class MarkModule { }
