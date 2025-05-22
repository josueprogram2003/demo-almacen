import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { CostCenterService } from '../../../../../../../../core/services/configuration/costCenter.service';
import { CostCenterSync } from '../../../../../../../../core/models/costCenter.model';

@Component({
  selector: 'app-cost-center-modal',
  templateUrl: './cost-center-modal.component.html',
})
export class CostCenterModalComponent implements OnInit {
  title?: string;
  isLoading: boolean = false;
  costCenters: CostCenterSync[] = [];
  constructor(public activeModal:NgbActiveModal, private costCenterService:CostCenterService) {}

  async ngOnInit() {
    this.costCenters = await lastValueFrom(this.costCenterService.getCompareCostCenter());
  }

 async onSave() {
    this.isLoading = true;
    const response= await lastValueFrom(this.costCenterService.postCostCenterSync(this.costCenters));
    if(response){
      this.activeModal.close(true);
    }else{
      this.isLoading = false;
    }
  }

}
