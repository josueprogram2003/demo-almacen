
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountExoneratedContainerComponent } from './container/count-exonerated-container.component';
import { CountExoneratedListComponent } from './components/list/count-exonerated-list.component';
import { CountExoneratedModalComponent } from './components/modals/count-exonerated-modal/count-exonerated-modal.component';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { countExoneratedRoutes } from './count-accountand-exonerated.routing';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { NoResultMessageComponent } from '../../../../../shared/components/no-result-message/no-result-message.component';
import { FormGroupComponent } from '../../../../../shared/components/form-group/form-group.component';



@NgModule({
  declarations: [
    CountExoneratedContainerComponent,
    CountExoneratedListComponent,
    CountExoneratedModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    BreadcrumbsComponent,
    NgxSpinnerModule.forRoot({ type: 'ball-spin-clockwise' }),
    RouterModule.forChild(countExoneratedRoutes),
    PaginationModule.forRoot(),
    NoResultMessageComponent,
    FormGroupComponent
  ]
})
export class CountAccountandExoneratedModule { }
