import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { CountAccountExoneratedService } from '../../../../../../../../core/services/configuration/countAccountExonerated.service';
import { CountAccountandExonerated } from '../../../../../../../../core/models/costCenter.model';

@Component({
  selector: 'app-count-exonerated-modal',
  templateUrl: './count-exonerated-modal.component.html',
})
export class CountExoneratedModalComponent implements OnInit {
  title?: string;
  countAccountExoneratedId?: string;
  isLoading: boolean = false;
  formGroup = new FormGroup({
    id: new FormControl<string | null>(null),
    account: new FormControl<string | null>(null, [Validators.required]),
    description: new FormControl<string | null>(null, [Validators.required]),
  });
  constructor(public activeModal:NgbActiveModal, private countAccountExoneratedService: CountAccountExoneratedService, private toastService:ToastrService) {}

 async ngOnInit() {
    if(this.countAccountExoneratedId){
      const response = await lastValueFrom(this.countAccountExoneratedService.getCountAccountandExoneratedById(this.countAccountExoneratedId));
      this.formGroup.patchValue(response);
    }
  }
  async onSave() {
    this.isLoading = true;
    this.isLoading = true;

    try {
      const response = this.countAccountExoneratedId
        ? await lastValueFrom(this.countAccountExoneratedService.putCostCenterExonerated(this.formGroup.value as CountAccountandExonerated))
        : await lastValueFrom(this.countAccountExoneratedService.postCountAccountandExonerated(this.formGroup.value as CountAccountandExonerated));
      if (response) {
        this.activeModal.close(true);
        this.toastService.success(this.countAccountExoneratedId ? 'Cuenta Contable actualizada' : 'Cuenta contable creada');
      }
    } finally {
      this.isLoading = false;
    }
  }

}
