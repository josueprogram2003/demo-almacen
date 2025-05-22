import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { costCenterUserRoutes } from './cost-center-user.routing';
import { CostCenterUserContainerComponent } from './container/cost-center-user-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CostCentersListComponent } from './components/list-cost-center/cost-centers-list.component';
import { CostCenterUserListComponent } from './components/list-users/cost-center-user-list.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ListUsersModalComponent } from './components/modals/list-users-modal/list-users-modal.component';
import { ListCostCenterModalComponent } from './components/modals/list-cost-center-modal/list-cost-center-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { NoResultMessageComponent } from '../../../../../shared/components/no-result-message/no-result-message.component';
import { FormGroupComponent } from '../../../../../shared/components/form-group/form-group.component';



@NgModule({
  declarations: [
    CostCenterUserContainerComponent,
    CostCentersListComponent,
    CostCenterUserListComponent,
    ListUsersModalComponent,
    ListCostCenterModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(costCenterUserRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    BreadcrumbsComponent,
    NoResultMessageComponent,
    NgxSpinnerModule.forRoot({ type: 'ball-spin-clockwise' }),
    PaginationModule.forRoot(),
    AutocompleteLibModule,
    FormGroupComponent,
    NgSelectModule
  ]
})
export class CostCenterUserModule { }
