import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { lastValueFrom } from 'rxjs';
import { ListUsersModalComponent } from '../components/modals/list-users-modal/list-users-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListCostCenterModalComponent } from '../components/modals/list-cost-center-modal/list-cost-center-modal.component';
import { UserCostCenterService } from '../../../../../../core/services/configuration/userCostCenter.service';
import { AlertUtilService } from '../../../../../../utils';
import { Pagination } from '../../../../../../core/models/paginationResponse.model';
import { Filter } from '../../../../../../core/models/filter.model';
import { UserCostCenter, UserCostCenterDetail } from '../../../../../../core/models/user-cost-center';

@Component({
  selector: 'app-cost-center-user-container',
  templateUrl: './cost-center-user-container.component.html',
})
export class CostCenterUserContainerComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  initialState: boolean = true;
  usersCostCenters: Pagination<any> = {
    content: [],
    page: 0,
    pageSize: 0,
    totalItems: 0,
  };
  term: string = '';
  filter = {
    pageNumber: 1,
    size: 10,
    name: '',
  };
  isInitalLoading = true;
  userCostCenter?: UserCostCenter;
  userCostCenterDetail: UserCostCenterDetail[] = [];
  constructor(
    private spinner: NgxSpinnerService,
    private userCostCenterService: UserCostCenterService,
    private modalActive: NgbModal,
    private alertService:AlertUtilService
  ) {}
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Configuración' },
      { label: 'Centro de Costo Usuario', active: true },
    ];
    this.getUsersCostCenter(this.filter);
  }
  async getUsersCostCenter(filter: Filter) {
    if (!this.isInitalLoading) {
      this.spinner.show();
    }
    setTimeout(async () => {
      this.usersCostCenters = await lastValueFrom(
        this.userCostCenterService.getUsersCostCenterByCompany(filter)
      );
      this.spinner.hide();
    }, 500);
    this.isInitalLoading = false;
  }
  eventPaginate(page: number) {
    if (page !== this.filter.pageNumber) {
      this.filter.pageNumber = page;
      this.getUsersCostCenter(this.filter);
    }
  }
  eventFilter() {
    this.filter.pageNumber = 1;
    this.filter.name = this.term;
    this.getUsersCostCenter(this.filter);
  }
  returnState() {
    this.breadCrumbItems = [
      { label: 'Configuración' },
      { label: 'Centro de Costo Usuario', active: true },
    ];
    this.initialState = true;
  }
  async eventView(userCostCenter: UserCostCenter) {
    this.userCostCenterDetail = [];
    this.spinner.show();
    this.breadCrumbItems = [
      { label: 'Configuración' },
      { label: 'Centro de Costo de Usuario' },
      { label: 'Detalle', active: true },
    ];
    this.initialState = false;
    this.userCostCenter = userCostCenter;
    setTimeout(async () => {
      this.userCostCenterDetail = await lastValueFrom(
        this.userCostCenterService.getCosCentersByUser(userCostCenter.id!)
      );
      this.spinner.hide();
    }, 700);
  }
 async onDelete(id:string){
    const response = await this.alertService.delete();
    if(response){
      const result = await lastValueFrom(this.userCostCenterService.deleteCostCenterDetail(id))
      if(result){
        this.eventView(this.userCostCenter!);
      }
    }
  }
  onModalUser() {
    ListUsersModalComponent.prototype.title = 'Agregar Usuario';
    this.modalActive.open(ListUsersModalComponent,  { backdrop: 'static', keyboard: false, centered:true}).result.then((res) => {
      if (res) {
        this.getUsersCostCenter(this.filter);
      }
    })
  }
  onModalCostCenter(){
    ListCostCenterModalComponent.prototype.title = 'Agregar Centro de Costo';
    ListCostCenterModalComponent.prototype.costCenterUserId = this.userCostCenter?.id;
    this.modalActive.open(ListCostCenterModalComponent,  { backdrop: 'static', keyboard: false}).result.then((res) => {
      if (res) {
        this.eventView(this.userCostCenter!);
      }
    })
  }
}
