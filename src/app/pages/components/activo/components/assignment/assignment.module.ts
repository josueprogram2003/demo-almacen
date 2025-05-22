import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentRoutingModule } from './assignment-routing.module';
import { ContentMainComponent } from './components/content-main/content-main.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UiSwitchModule } from 'ngx-ui-switch';
import { TreeTableModule } from 'primeng/treetable';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalReturnComponent } from './components/modal-return/modal-return.component';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { FlatpickrModule } from 'angularx-flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { FormGroupComponent } from '../../../../../shared/components/form-group/form-group.component';
import { NoResultMessageComponent } from '../../../../../shared/components/no-result-message/no-result-message.component';
import { SearchInputComponent } from '../../../../../shared/components/search-input/search-input.component';
import { FormInputFilesComponent } from '../../../../../shared/components/form-input-files/form-input-files.component';
import { ListComponent } from './components/list/list.component';
import { ModalViewComponent } from './components/modal-view/modal-view.component';
import { ModalApprovedComponent } from './components/modal-approved/modal-approved.component';

@NgModule({
  declarations: [
    ContentMainComponent,
    ListComponent,
    ModalFormComponent,
    FiltersComponent,
    ModalReturnComponent,
    ModalViewComponent,
    ModalApprovedComponent,
  ],
  imports: [
    CommonModule,
    BreadcrumbsComponent,
    FormGroupComponent,
    NoResultMessageComponent,
    SearchInputComponent,
    FormInputFilesComponent,
    AssignmentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule,
    TypeaheadModule,
    NgxSpinnerModule,
    TabsModule.forRoot(),
    AngularDualListBoxModule,
    NgbModule,
    NgxMaskDirective,
    NgxMaskPipe,
    TreeTableModule,
    TableModule,
    ButtonModule,
    NgbAccordionModule,
    NgStepperModule,
    CdkStepperModule,
    FlatpickrModule.forRoot({ locale: Spanish }),
    UiSwitchModule.forRoot({
      color: '#44C47D',
      defaultBgColor: '#EB6532',
      checkedTextColor: '#FFF',
      uncheckedTextColor: '#FFF',
    }),
  ],
})
export class AssignmentModule {}
