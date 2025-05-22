import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountExoneratedCostCenterContainerComponent } from './container/count-exonerated-cost-center-container.component';
import { RouterModule } from '@angular/router';
import { countExonerateCostCenterdRoutes } from './count-exonerated-cost-center.routing';
import { CountExoneratedCostCenterModalComponent } from './components/modals/count-exonerated-modal/count-exonerated-cost-center-modal.component';
import { CountExoneratedCostCenterListComponent } from './components/list/count-exonerated-cost-center-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormGroupComponent } from '../../../../../shared/components/form-group/form-group.component';
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { NoResultMessageComponent } from '../../../../../shared/components/no-result-message/no-result-message.component';



@NgModule({
  declarations: [
    CountExoneratedCostCenterContainerComponent,
    CountExoneratedCostCenterModalComponent,
    CountExoneratedCostCenterListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(countExonerateCostCenterdRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgSelectModule,
    FormGroupComponent,
    BreadcrumbsComponent,
    NoResultMessageComponent,
    NgxSpinnerModule.forRoot({ type: 'ball-spin-clockwise' }),
    PaginationModule.forRoot(),
  ]
})
export class CountExoneratedCostCenterModule { }
