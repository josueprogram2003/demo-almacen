import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CostCenter } from '../../../../../../../core/models/costCenter.model';
// import { CostCenter } from 'app/core/models/costCenter.model';

@Component({
  selector: 'app-cost-center-list',
  templateUrl: './cost-center-list.component.html',
  styles:[
    `
    .table-height{
      max-height: 60vh;
    }
    `
  ]
})
export class CostCenterListComponent {
 @Input() costCenterData: CostCenter[]=[];
 @Output() onChangeState = new EventEmitter<{id:string, state:boolean}>();
 changeState(id:string, state:boolean){
    const costCenter = {
      id: id,
      state: state
    }
    this.onChangeState.emit(costCenter);
 }
}
