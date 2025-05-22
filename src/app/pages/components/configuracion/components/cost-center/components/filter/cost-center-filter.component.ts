import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { BusinessUnitService } from '../../../../../../../core/services/activo/businessUnitService.service';
import { BusinessUnit } from '../../../../../../../core/models/businessUnit.model';

@Component({
  selector: 'app-cost-center-filter',
  templateUrl: './cost-center-filter.component.html',
})
export class CostCenterFilterComponent implements OnInit {
  @Output() filter = new EventEmitter<string>();
  businessUnits: BusinessUnit[] = [];
  formGroup = new FormGroup({
    businessUnitId: new FormControl<string | null>(null),
  });
  constructor(  private bussinesUnitService: BusinessUnitService) {}

  async ngOnInit() {
    await this.getBusinessUnit();
    setTimeout(() => {
      this.onFilter(this.businessUnits[0].id!);
    }, 1000);
  }
 async getBusinessUnit() {
   this.businessUnits = (await lastValueFrom(this.bussinesUnitService.get())).data;
   this.formGroup.get('businessUnitId')!.setValue(this.businessUnits[0].id!);
 }
  onFilter(id: string) {
    this.filter.emit(id);
  }
}
