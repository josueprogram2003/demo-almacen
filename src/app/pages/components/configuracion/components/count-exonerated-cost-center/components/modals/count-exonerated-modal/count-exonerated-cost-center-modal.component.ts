import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { CountAccountCostCenterExoneratedService } from '../../../../../../../../core/services/configuration/countAccountCostCenterExonerated.service';
import { BusinessUnitService } from '../../../../../../../../core/services/activo/businessUnitService.service';
import { CostCenterService } from '../../../../../../../../core/services/configuration/costCenter.service';
import { CostCenter, CountAccountandCostCenterExonerated } from '../../../../../../../../core/models/costCenter.model';
import { BusinessUnit } from '../../../../../../../../core/models/businessUnit.model';

@Component({
  selector: 'app-count-exonerated-cost-center-modal',
  templateUrl: './count-exonerated-cost-center-modal.component.html',
})
export class CountExoneratedCostCenterModalComponent implements OnInit {
  title?: string;
  countAccountExoneratedId?: string;
  businessUnits: BusinessUnit[] = [];
  costCenters: CostCenter[] = [];
  isLoading: boolean = false;
  formGroup = new FormGroup({
    id: new FormControl<string | null>(null),
    count: new FormControl<string | null>(null, [Validators.required]),
    description: new FormControl<string | null>(null, [Validators.required]),
    businessUnitId: new FormControl<string | null>(null, [Validators.required]),
    costCenterId: new FormControl<string | null>(null, [Validators.required]),
  });
  constructor(
    public activeModal: NgbActiveModal,
    private countAccountExoneratedCostCenterService: CountAccountCostCenterExoneratedService,
    private toastService: ToastrService,
    private bussinesUnitService: BusinessUnitService,
    private costCenterService: CostCenterService
  ) {}

  async ngOnInit() {
    await this.getBusinessUnit();
    if (this.countAccountExoneratedId) {
      const response = await lastValueFrom(
        this.countAccountExoneratedCostCenterService.getCountAccountandExoneratedCostCenterById(
          this.countAccountExoneratedId
        )
      );
      this.formGroup.patchValue(response);
      this.getCostCenterByBusinessUnit(response.businessUnitId!);
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
  async onSave() {
    this.isLoading = true;
    this.isLoading = true;

    try {
      const response = this.countAccountExoneratedId
        ? await lastValueFrom(
            this.countAccountExoneratedCostCenterService.putCostCenterExoneratedCostCenter(
              this.formGroup.value as CountAccountandCostCenterExonerated
            )
          )
        : await lastValueFrom(
            this.countAccountExoneratedCostCenterService.postCountAccountandExoneratedCostCenter(
              this.formGroup.value as CountAccountandCostCenterExonerated
            )
          );
      if (response) {
        this.activeModal.close(true);
        this.toastService.success(
          this.countAccountExoneratedId
            ? 'Cuenta Contable por Centro de Costo actualizada'
            : 'Cuenta contable por Centro de Costo  creada'
        );
      }
    } finally {
      this.isLoading = false;
    }
  }
}
