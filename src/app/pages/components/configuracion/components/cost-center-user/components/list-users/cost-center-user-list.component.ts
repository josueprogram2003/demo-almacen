import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from '../../../../../../../utils';
import { UserCostCenter } from '../../../../../../../core/models/user-cost-center';

@Component({
  selector: 'app-cost-center-user-list',
  templateUrl: './cost-center-user-list.component.html',
})
export class CostCenterUserListComponent {
  @Output() evenView = new EventEmitter<UserCostCenter>();
  @Output() evenPaginate = new EventEmitter<number>();
  @Input() costCenterUserData: Pagination<any> = {
    content: [],
    page: 0,
    pageSize: 0,
    totalItems: 0,
  };
  onView(userCostCenter: UserCostCenter) {
    this.evenView.emit(userCostCenter);
  }
  pageChanged(event: any): void {
    this.evenPaginate.emit(event.page);
  }
}
