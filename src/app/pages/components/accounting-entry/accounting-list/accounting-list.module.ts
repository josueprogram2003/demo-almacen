import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingListRoutingModule } from './accounting-list-routing.module';
import { ContainerComponent } from './container/container.component';
import { CountUpModule } from 'ngx-countup';
import { FilterComponent } from './components/filter/filter.component';
import { ListComponent } from './components/list/list.component';
import { SynchronizeModalComponent } from './components/modals/synchronize-modal/synchronize-modal.component';
import { UploadDocumentModalComponent } from './components/modals/upload-document-modal/upload-document-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'application/pdf',
  uploadMultiple: true,
};
import { ChipsModule } from 'primeng/chips';
import { ChipModule } from "primeng/chip";
import { BreadcrumbsComponent } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { NoResultMessageComponent } from '../../../../shared/components/no-result-message/no-result-message.component';



@NgModule({
  declarations: [
    ContainerComponent,
    FilterComponent,
    ListComponent,
    SynchronizeModalComponent,
    UploadDocumentModalComponent,
  ],
  imports: [
    CommonModule,
    AccountingListRoutingModule,
    BreadcrumbsComponent,
    CountUpModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NoResultMessageComponent,
    PaginationModule,
    UiSwitchModule.forRoot({
      color: '#44C47D',
      defaultBgColor: '#EB6532',
      checkedTextColor: '#FFF',
      uncheckedTextColor: '#FFF',
    }),
    NgbModalModule,
    DropzoneModule,
    ChipsModule,
    ChipModule,
  ],
  providers:[
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class AccountingListModule {}
