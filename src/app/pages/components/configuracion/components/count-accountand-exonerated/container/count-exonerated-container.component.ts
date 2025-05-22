import { CountExoneratedModalComponent } from '../components/modals/count-exonerated-modal/count-exonerated-modal.component';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CountAccountExoneratedService } from '../../../../../../core/services/configuration/countAccountExonerated.service';
import { Filter } from '../../../../../../core/models/filter.model';
import { AlertUtilService } from '../../../../../../utils';
import { Pagination } from '../../../../../../core/models/paginationResponse.model';

@Component({
  selector: 'app-count-exonerated-container',
  templateUrl: './count-exonerated-container.component.html',
})
export class CountExoneratedContainerComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  countsAccountExonerated: Pagination<any> = {
    content: [],
    page: 0,
    pageSize: 0,
    totalItems: 0,
  };
  filter = {
    pageNumber: 1,
    size: 10,
  };
  isInitalLoading = true;
  constructor(
    private countAccountExoneratedService: CountAccountExoneratedService,
    private spinner: NgxSpinnerService,
    private modalActive: NgbModal,
    private alertService: AlertUtilService
  ) {}
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Configuración' },
      { label: 'Cuenta Contable Exonerada', active: true },
    ];
    this.getCountsAcountExonerated(this.filter);
  }
  async getCountsAcountExonerated(filter: Filter) {
    if(!this.isInitalLoading){
      this.spinner.show();
    }
    setTimeout(async () => {
      this.countsAccountExonerated = await lastValueFrom(
        this.countAccountExoneratedService.getCountAccountandExonerated(filter)
      );
      this.spinner.hide();
    }, 500);
    this.isInitalLoading = false;
  }
  eventPaginate(page: number) {
    if(page !== this.filter.pageNumber){
      this.filter.pageNumber = page;
      this.getCountsAcountExonerated(this.filter);
    }
  }
  onModal(id: any) {
    CountExoneratedModalComponent.prototype.title = `${id?'Editar':'Agregar'} Cuenta Contable Exonerada`;
    CountExoneratedModalComponent.prototype.countAccountExoneratedId = id;
    this.modalActive
      .open(CountExoneratedModalComponent, { backdrop: 'static', keyboard: false,})
      .result.then((res) => {
        if (res) {
          this.getCountsAcountExonerated(this.filter);
        }
      });
  }
 async onDelete(id: string) {
    const result = await  this.alertService.delete();
     if(result){
      this.countAccountExoneratedService.deleteCountAccountandExonerated(id).subscribe(() => {
        this.getCountsAcountExonerated(this.filter);
      });
     }
  }
}
