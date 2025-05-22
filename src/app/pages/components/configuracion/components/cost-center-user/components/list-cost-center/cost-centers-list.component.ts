import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserCostCenterDetail } from '../../../../../../../core/models/user-cost-center';

@Component({
  selector: 'app-cost-centers-list',
  templateUrl: './cost-centers-list.component.html',
  styles:[
    `
    .table-height{
      max-height: 60vh;
    }
    `
  ]
})
export class CostCentersListComponent {
@Input() userCostCenterDetailData: UserCostCenterDetail[] = [];
@Output() evenDelete = new EventEmitter<string>();
onDelete(id:string){
  this.evenDelete.emit(id);
}
}
