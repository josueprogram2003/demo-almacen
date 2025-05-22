import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubdiaryRoutingModule } from './subdiary-routing.module';
import { ContainerComponent } from './container/container.component';
import { ListComponent } from './components/list/list.component';
import { FilterComponent } from './components/filter/filter.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UiSwitchModule } from 'ngx-ui-switch';
import { SynchronizeModalComponent } from './components/modals/synchronize-modal/synchronize-modal.component';
import { BreadcrumbsComponent } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { NoResultMessageComponent } from '../../../../shared/components/no-result-message/no-result-message.component';

@NgModule({
  declarations: [ContainerComponent, ListComponent, FilterComponent,SynchronizeModalComponent],
  imports: [
    CommonModule,
    SubdiaryRoutingModule,
    BreadcrumbsComponent,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    UiSwitchModule.forRoot({
      color: '#44C47D',
      defaultBgColor: '#EB6532',
      checkedTextColor: '#FFF',
      uncheckedTextColor: '#FFF',
    }),
    NgbModalModule,
    NoResultMessageComponent
  ],
})
export class SubdiaryModule {}
