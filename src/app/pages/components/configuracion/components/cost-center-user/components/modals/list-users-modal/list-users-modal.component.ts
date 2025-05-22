import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { User } from '../../../../../../../../core/models/user.model';
import { UserCostCenterService } from '../../../../../../../../core/services/configuration/userCostCenter.service';

@Component({
  selector: 'app-list-users-modal',
  templateUrl: './list-users-modal.component.html'
})
export class ListUsersModalComponent {
  title?: string;
  isLoading = false;
  keyword = 'search';
  // Fruit Data
  usersData:User[] = [];
  userSelected?:User;
  constructor(public activeModal:NgbActiveModal, private userCostCenter:UserCostCenterService, private toastService:ToastrService) {}
  ngOnInit(){
  }
  async onSave(){
    this.isLoading = true;
    try {
      const response= await lastValueFrom(this.userCostCenter.postUserCostCenter(this.userSelected!))
      if (response) {
        this.activeModal.close(true);
        this.toastService.success('Usuario agregado correctamente');
      }
    } finally {
      this.isLoading = false;
    }
  }
  selectEvent(item: any) {
    this.userSelected = item;
    // console.log(this.userSelected)
  }
  onCleared(){
    this.userSelected = undefined;
  }
  async onChangeSearch(search: string) {
    if(search.length > 2){
      this.usersData =  await lastValueFrom(this.userCostCenter.getUsersByName(search));
  }
}


}
