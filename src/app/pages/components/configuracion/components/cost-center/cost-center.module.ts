
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { costCenterRoutes } from './cost-center.routing';
import { CostCenterContainerComponent } from './container/cost-center-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CostCenterFilterComponent } from './components/filter/cost-center-filter.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CostCenterListComponent } from './components/list/cost-center-list.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CostCenterModalComponent } from './components/modals/cost-center-modal/cost-center-modal.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { NoResultMessageComponent } from '../../../../../shared/components/no-result-message/no-result-message.component';



@NgModule({
  declarations: [
    CostCenterContainerComponent,
    CostCenterFilterComponent,
    CostCenterListComponent,
    CostCenterModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(costCenterRoutes),
    BreadcrumbsComponent,
    NgSelectModule,
    NoResultMessageComponent,
    NgbModalModule,
    NgxSpinnerModule.forRoot({ type: 'ball-spin-clockwise' })
  ]
})
export class CostCenterModule { }
