import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SynchronizeModalComponent } from '../components/modals/synchronize-modal/synchronize-modal.component';
import Swal from 'sweetalert2';
import { Pagination } from '../../../../../core/models/paginationResponse.model';
import { SubdiaryService } from '../../../../../core/services/subdiary/subdiary.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
})
export class ContainerComponent implements OnInit {
  breadCrumbItems!: Array<any>;
  subdiaries: Pagination<any>={
    content:[],
    page:1,
    totalItems:0,
    pageSize:10,
  };
  private timeoutId: any = null;
  filter={
    tkey:null,
    description:null,
    page:1,
    size:10
  }
  constructor(private subdiarySService: SubdiaryService, private toast:ToastrService, private modal:NgbModal) {}
  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.subdiarySService.get(this.filter).subscribe(res => {
      this.subdiaries = res.data;
    })
  }
  onFilter(filter: any) {
    this.filter = {
      ...this.filter,
      ...filter,
    };
    this.filter.page = 1;
    this.getAll();
  }
  onPaginate(page: number) {
    this.filter.page = page;
    this.getAll();
  }
  onModalSynchronize() {
    this.modal.open(SynchronizeModalComponent, { size: 'lg' });
  }

  onUpdate(data:any) {
    let {id, shortDescription} = data;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => {
      Swal.fire({
        title: '¿Está seguro?',
        text: '¿Estás seguro de actualizar el campo?',
        icon: 'warning',
        showCancelButton: true,
      }).then((result) => {
        if(result){
          const body = {
            shortDescription: shortDescription,
          }
          this.subdiarySService.putShorDescription(id, body).subscribe(res => {
            this.toast.success('Descripción actualizada');
          })
        }else{
          this.getAll();
        }
      })

    }, 2000);
  }
}
