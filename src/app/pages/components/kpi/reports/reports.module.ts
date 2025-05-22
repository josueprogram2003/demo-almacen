import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReportContainerComponent } from './container/report-container.component';
import { ListComponent } from './components/list/list.component';
import { BreadcrumbsComponent } from '../core/shared/breadcrumbs/breadcrumbs.component';
import { FiltersComponent } from './components/filters/filters.component';

@NgModule({
  declarations: [FiltersComponent,ReportContainerComponent,ListComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule,
    BreadcrumbsComponent,
    TypeaheadModule,
    NgxSpinnerModule,
    NgbModule,
  ]
})
export class ReportsModule { }
