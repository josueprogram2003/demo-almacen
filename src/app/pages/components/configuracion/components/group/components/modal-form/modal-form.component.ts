import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfiguracionService } from '../../../../../../../core/services/activo/configuracion.service';
import { Group } from '../../../../../../../core/models/groups.model';
import { Account } from '../../../../../../../core/models/account.model';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.scss'
})
export class ModalFormComponent implements OnInit {
  title!: string;
  isLoading: boolean = false;
  formGroup: FormGroup = new FormGroup({})
  data!: null | Group;


  accounts: Account[] = []
  accountsDepresiation: any[] = []
  accountsActivation: any[] = []

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private service: ConfiguracionService) {
    this.formGroup = this.fb.group({
      "id": ["", []],
      "name": ["", Validators.required],
      "companyId": [sessionStorage.getItem('companyId'), Validators.required],
      "account": this.fb.group({
        "id": ["", [Validators.required]],
      }),
      "depreciationPercentage": ["", [Validators.required, Validators.max(100), Validators.min(1)]],
      "activationAccount": this.fb.group({
        "id": ["", [Validators.required]]
      })
    })
  }

  ngOnInit(): void {
    this.getAccount();
    this.getAccountDepreciation();
    if (this.data) {
      const { depreciationPercentage } = this.data;
      this.formGroup.patchValue({
        ...this.data,
        depreciationPercentage: depreciationPercentage != null ? depreciationPercentage * 100 : ''
      })
    }
  }

  getAccount() {
    this.service.getAccount({ page: 1, size: 100 }).subscribe((res) => {
      this.accounts = res.data.content
      this.accountsActivation = this.accounts.filter((res) => res.accountNumber.startsWith('33') || res.accountNumber.startsWith("34"))
    })
  }

  getAccountDepreciation() {
    this.service.getAllAccountByCompanyAccountNumber({ accountNumberPrefix: "39" }).subscribe((res) => {
      this.accountsDepresiation = res.data;
    })
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  onGuardar() {
    if (!this.formGroup.invalid) {
      this.isLoading = true;
      if (this.data == null) {
        // Add
        let body = this.formGroup.value;
        body.depreciationPercentage = body.depreciationPercentage / 100;
        delete body.assetGroupId;
        this.service.postGroup(body).subscribe(
          (data) => {
            this.isLoading = false;
            this.activeModal.close(true);
          }, (err) => {
            this.isLoading = false;
            console.log(err);
          }
        )
      } else {
        // Edit
        let body = this.formGroup.value;
        body.depreciationPercentage = body.depreciationPercentage / 100;
        this.service.putGroup(body).subscribe(
          (data) => {
            this.isLoading = false;
            this.activeModal.close(true);
          }, (err) => {
            this.isLoading = false;
            console.log(err);
          }
        )
      }
    }
  }


}