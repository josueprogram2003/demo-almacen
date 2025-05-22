import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetRoutingModule } from './asset-routing.module';
import { ListComponent } from './components/list/list.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ContentMainComponent } from './components/content-main/content-main.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
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
import { ModalCodeComponent } from './components/modal-code/modal-code.component';
import { ModalDetailsComponent } from './components/modal-details/modal-details.component';
import { ModalAdditionalComponent } from './components/modal-additional/modal-additional.component';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { FlatpickrModule } from 'angularx-flatpickr';
import { Spanish } from "flatpickr/dist/l10n/es.js";
import { ModalSyncComponent } from './components/modal-sync/modal-sync.component';
import { esLocale } from 'ngx-bootstrap/chronos';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { NgStepperModule } from 'angular-ng-stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ModalAssignmentComponent } from './components/modal-assignment/modal-assignment.component';
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { SearchInputComponent } from '../../../../../shared/components/search-input/search-input.component';
import { NoResultMessageComponent } from '../../../../../shared/components/no-result-message/no-result-message.component';
import { FormGroupComponent } from '../../../../../shared/components/form-group/form-group.component';
import { NgxDatepicketRangeComponent } from '../../../../../shared/components/ngx-datepicket-range/ngx-datepicket-range.component';
import { FormInputFilesComponent } from '../../../../../shared/components/form-input-files/form-input-files.component';

defineLocale('es', esLocale);

@NgModule({
  declarations: [
    ListComponent,
    FiltersComponent,
    ContentMainComponent,
    ModalFormComponent,
    ModalCodeComponent,
    ModalDetailsComponent,
    ModalAdditionalComponent,
    ModalSyncComponent,
    ModalAssignmentComponent
  ],
  imports: [
    CommonModule,
    AssetRoutingModule,
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
    NgxDatepicketRangeComponent,FormInputFilesComponent,
    NgbModule,
    InputNumberModule,
    NgStepperModule,
    CdkStepperModule,
    NgxMaskDirective, NgxMaskPipe,
    AngularDualListBoxModule,
    NgbAccordionModule,
    TreeTableModule,
    QRCodeModule,
    NgxBarcode6Module,
    TableModule,
    ButtonModule,
    TabsModule.forRoot(),
    FlatpickrModule.forRoot({ locale: Spanish }),
    UiSwitchModule.forRoot({
      color: '#44C47D',
      defaultBgColor: '#EB6532',
      checkedTextColor: '#FFF',
      uncheckedTextColor: '#FFF',
    }),
  ]
})
export class AssetModule { }
