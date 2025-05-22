import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { CostCenterModalComponent } from '../components/modals/cost-center-modal/cost-center-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CostCenterService } from '../../../../../../core/services/configuration/costCenter.service';
import { CostCenter } from '../../../../../../core/models/costCenter.model';
@Component({
  selector: 'app-cost-center-container',
  templateUrl: './cost-center-container.component.html',
})
export class CostCenterContainerComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  term: string = '';
  costCenters: CostCenter[] = [];
  businessUnitId: string = '';
  initialLoading = true;
  constructor(
    private costCenterService: CostCenterService,
    private spinner: NgxSpinnerService,
    private modalActive: NgbModal
  ) {}
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Configuración' },
      { label: 'Centro de Costo', active: true },
    ];
  }

  async getCostCenterByBusinessUnit(id: string) {
    if (!this.initialLoading) {
      this.spinner.show();
    }
    this.businessUnitId = id;
    this.costCenters = await lastValueFrom(
      this.costCenterService.getCostCenterByBusinessUnit(
        this.businessUnitId,
        this.term
      )
    );
    if (!this.initialLoading) {
      setTimeout(() => {
        this.spinner.hide();
      }, 500);
    }
    this.initialLoading = false;
  }
  searchCostCenter() {
    this.getCostCenterByBusinessUnit(this.businessUnitId);
  }
  changeState(costcenter:any) {
    const { id, state } = costcenter;
    Swal.fire({
      title: '¿Estás seguro(a)?',
      text: `Estás a punto de ${state? 'revertir el cambio': 'dar de baja un centro de costo'}`,
      showCancelButton: true,
      confirmButtonColor: 'rgb(3, 142, 220)',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      //? Aceptó eliminar
      if (result.value) {
        this.costCenterService.putChangeStatusCostCenter(id, state).subscribe(res => {
          this.getCostCenterByBusinessUnit(this.businessUnitId);
        });
      }
    })
  }
  onSync() {
    CostCenterModalComponent.prototype.title = 'Sincronizar Centro de Costo';
    this.modalActive
      .open(CostCenterModalComponent, { backdrop: 'static', keyboard: false, size: 'lg' })
      .result.then((res) => {
        if (res) {
          this.getCostCenterByBusinessUnit(this.businessUnitId);
        }
      });
  }

}
