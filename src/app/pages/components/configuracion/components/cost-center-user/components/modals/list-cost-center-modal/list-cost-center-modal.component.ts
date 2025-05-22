import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { BusinessUnitService } from '../../../../../../../../core/services/activo/businessUnitService.service';
import { CostCenterService } from '../../../../../../../../core/services/configuration/costCenter.service';
import { UserCostCenterService } from '../../../../../../../../core/services/configuration/userCostCenter.service';
import { BusinessUnit } from '../../../../../../../../core/models/businessUnit.model';
import { CostCenter } from '../../../../../../../../core/models/costCenter.model';

@Component({
  selector: 'app-list-cost-center-modal',
  templateUrl: './list-cost-center-modal.component.html',
})
export class ListCostCenterModalComponent implements OnInit {
  title?: string;
  costCenterUserId?: string;
  isLoading = false;
  businessUnits: BusinessUnit[] = [];
  costCenters: CostCenter[] = [];
  formGroup: FormGroup = new FormGroup({
    businessUnitId: new FormControl(null, [Validators.required]),
    costCenterId: new FormControl(null, [Validators.required]),
    costCenterUserId: new FormControl(this.costCenterUserId, [
      Validators.required,
    ]),
  });
  constructor(
    public activeModal: NgbActiveModal,
    private bussinesUnitService: BusinessUnitService,
    private costCenterService: CostCenterService,
    private userCostCenter:UserCostCenterService,
    private toastService:ToastrService
  ) {}
  async ngOnInit() {
    await this.getBusinessUnit();
  }
  async onSave() {
    this.isLoading = true;
    const body = this.formGroup.value;
    delete body.businessUnitId;
    try {
      const response = await lastValueFrom(
        this.userCostCenter.postUserCostCenterDetail(body)
      );
      if (response) {
        this.activeModal.close(true);
        this.toastService.success('Usuario agregado correctamente');
      }
    } finally {
      this.isLoading = false;
    }
  }

  async getBusinessUnit() {
    this.businessUnits = (await lastValueFrom(this.bussinesUnitService.get())).data;
  }
  async getCostCenterByBusinessUnit(id: string) {
    if (id) {
      this.costCenters = await lastValueFrom(
        this.costCenterService.getCostCenterByBusinessUnit(id)
      );
    } else {
      this.formGroup.get('costCenterId')!.setValue(null);
      this.costCenters = [];
    }
  }
}
