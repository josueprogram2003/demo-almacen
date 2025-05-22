import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CountExoneratedCostCenterModalComponent } from '../components/modals/count-exonerated-modal/count-exonerated-cost-center-modal.component';
import { lastValueFrom } from 'rxjs';
import { CountAccountCostCenterExoneratedService } from '../../../../../../core/services/configuration/countAccountCostCenterExonerated.service';
import { AlertUtilService } from '../../../../../../utils';
import { Filter } from '../../../../../../core/models/filter.model';

@Component({
  selector: 'app-count-exonerated-cost-center-container',
  templateUrl: './count-exonerated-cost-center-container.component.html',
})
export class CountExoneratedCostCenterContainerComponent {
  breadCrumbItems!: Array<{}>;
  countsAccountExoneratedCostCenter: any[] = [];
  filter = {
    pageNumber: 1,
    size: 10,
  };
  isInitalLoading = true;
  constructor(
    private countAccountExoneratedCostCenterService: CountAccountCostCenterExoneratedService,
    private spinner: NgxSpinnerService,
    private modalActive: NgbModal,
    private alertService: AlertUtilService
  ) {}
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Configuración' },
      { label: 'Cuenta Contable Exonerada por Centro de Costo', active: true },
    ];
    this.getCountsAcountsExonerated(this.filter);
  }
  async getCountsAcountsExonerated(filter: Filter) {
    if(!this.isInitalLoading){
      this.spinner.show();
    }
    setTimeout(async () => {
     this.countsAccountExoneratedCostCenter = await lastValueFrom(
        this.countAccountExoneratedCostCenterService.getCountAccountandExoneratedCostCenter(filter)
      );
      this.spinner.hide();
    }, 500);
    this.isInitalLoading = false;
  }
  eventPaginate(page: number) {
    if(page !== this.filter.pageNumber){
      this.filter.pageNumber = page;
      this.getCountsAcountsExonerated(this.filter);
    }
  }
  onModal(id: any) {
    CountExoneratedCostCenterModalComponent.prototype.title = `${id?'Editar':'Agregar'} Cuenta Contable  por Centro de Costo`;
    CountExoneratedCostCenterModalComponent.prototype.countAccountExoneratedId = id;
    this.modalActive
      .open(CountExoneratedCostCenterModalComponent, { backdrop: 'static', keyboard: false,})
      .result.then((res) => {
        if (res) {
          this.getCountsAcountsExonerated(this.filter);
        }
      });
  }
 async onDelete(id: string) {
    const result = await  this.alertService.delete();
     if(result){
     this.countAccountExoneratedCostCenterService.deleteCountAccountandExoneratedCostCenter(id).subscribe(() => {
        this.getCountsAcountsExonerated(this.filter);
      });
     }
  }
}
