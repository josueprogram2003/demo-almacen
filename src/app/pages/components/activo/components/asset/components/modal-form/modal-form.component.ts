import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import  moment from 'moment';
import { ModalAssignmentComponent } from '../modal-assignment/modal-assignment.component';
import { ConfiguracionService } from '../../../../../../../core/services/activo/configuracion.service';
import { CostcenterService } from '../../../../../../../core/services/activo/costcenter.service';
import { CurrencyService } from '../../../../../../../core/services/activo/currency.service';
import { AsignacionService } from '../../../../../../../core/services/activo/asignacion.service';
import { BusinessUnitService } from '../../../../../../../core/services/activo/businessUnitService.service';
import { MaestraService } from '../../../../../../../core/services/maestra.service';
import { FileService, NotificationUtilService } from '../../../../../../../utils';
import { Group } from '../../../../../../../core/models/groups.model';
import { CostCenter } from '../../../../../../../core/models/costCenter.model';
import { Currency } from '../../../../../../../core/models/currency.model';
import { Asset } from '../../../../../../../core/models/asset.model';
import { BusinessUnit } from '../../../../../../../core/models/businessUnit.model';
import { ModalPreviewFileComponent } from '../../../../../../../shared/components/modal-preview-file/modal-preview-file.component';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.scss'
})
export class ModalFormComponent implements OnInit {
  title!: string;
  isLoading: boolean = false;
  formGroup: FormGroup = new FormGroup({})
  yearData: any[] = [];
  brands: any[] = [];
  models: any[] = [];
  groups: Group[] = [];
  categorys: any[] = [];
  materials: any[] = [];
  costCenters: CostCenter[] = [];
  currencys: Currency[] = [];
  accounts: any[] = []
  accountsActivacion: any[] = []
  files: File[] = [];
  minDate = new Date();
  numberIGV: number = 0.18
  businessUnits: BusinessUnit[] = [];
  data!: null | Asset;
  isAssignment: boolean = true;
  isNext: boolean =false;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private serviceConfig: ConfiguracionService, private costCenterService: CostcenterService, private currencyService: CurrencyService, private service: AsignacionService, private businessUnitService: BusinessUnitService, private sMaestra: MaestraService, private file: FileService, private notificationService: NotificationUtilService, private modalService: NgbModal) {
    this.formGroup = this.fb.group({
      "id": [],
      "brand": this.fb.group({
        "id": ["", Validators.required],
        "name": ["", []],
      }),
      "description": ["", [Validators.required]],
      // "model": this.fb.group({
      //   "id": ["", Validators.required],
      // }),
      "assetGroup": this.fb.group({
        "id": ["", Validators.required],
      }),
      "supplierName": [{ value: "", disabled: false }, []],
      "supplierId": ["", []],
      "nomenclature": ["", []],
      "exchangeRate": ["", []],
      "material": this.fb.group({
        "id": ["", Validators.required]
      }),
      "serialNumber": ["", Validators.required],
      // "category": this.fb.group({
      //   "id": ["", Validators.required],
      // }),
      "invoiceDate": ["", Validators.required],
      "currencyId": ["", Validators.required],
      "currencyName": ["", Validators.required],
      "costCenterId": [{ value: "", disabled: false }, Validators.required],
      "companyId": [sessionStorage.getItem('companyId'), Validators.required],
      "account": this.fb.group({
        "id": [{ value: "", disabled: true }, [Validators.required]],
      }),
      "igv": [this.numberIGV, []],
      "selectionIgv": [false, []],
      "unitPrice": ["", [Validators.required]],
      "assetValue": ["", Validators.required],
      "depreciationPercentage": [{ value: "", disabled: true }, []],
      "igvstatic": ["", []],
      "total": ["", Validators.required],
      "insurance_range_date": ["", []],
      "insuranceStartDate": ["", []],
      "insuranceEndDate": ["", []],
      "warranty_range_date": ["", []],
      "warrantyStartDate": ["", []],
      "warrantyEndDate": ["", []],
      "files": this.fb.array([]),
      "filesRemove": this.fb.array([]),
      "invoiceNumber": ["", Validators.required],
      "activationDate": [new Date(), [Validators.required]],
      "manufacturingYear": ["", []],
      "businessUnitId": ["", [Validators.required]],
    })
  }


  newfile(item: any): FormGroup {
    return this.fb.group({
      "name": item.name,
      "file": item?.file,
      "type": item?.type,
      "filePreview": item?.filePreview,
     // "icon": [this.file.getIcon(this.file.getExtencion(item.name)), []],
      "isActive": item.isActive != undefined ? item.isActive : true,
      "assetId": [item?.assetId, []],
      "id": [item?.id, []],
      "objectKey": [item?.objectKey, []],
    })
  }

  async ngOnInit(): Promise<void> {
    this.yearData = this.sMaestra.getYears(1980);
    await this.getBrand();
    await this.getCategory();
    await this.getMaterial();
    await this.getCurrencys();
    await this.getGroup();
    await this.getBusinessUnits();

    if (this.data) {
      this.formGroup.get('businessUnitId')?.clearValidators();
      const { costCenterId, costCenterName, unitPrice, insuranceStartDate, insuranceEndDate, warrantyStartDate, warrantyEndDate, selectionIgv, currencyId, exchangeRate, assetGroup, files } = this.data;
      const insuranceRangeDate = [insuranceStartDate != null ? new Date(moment(insuranceStartDate).format()) : "", insuranceEndDate != null ? new Date(moment(insuranceEndDate).format()) : ""];
      const warrantyRangeDate = [warrantyStartDate != null ? new Date(moment(warrantyStartDate).format()) : "", warrantyEndDate != null ? new Date(moment(warrantyEndDate).format()) : ""];
      files.map((e: any) => this.filesArray.push(this.newfile(e)));
      this.formGroup.patchValue({
        ...this.data,
        "igv": (+unitPrice * this.numberIGV).toFixed(2),
        "igvstatic": (+unitPrice * this.numberIGV).toFixed(2),
        "activationDate": this.data.activationDate != null ? new Date(moment(this.data.activationDate).format()) : '',
        "insurance_range_date": insuranceRangeDate,
        "insuranceStartDate": insuranceStartDate != null ? insuranceStartDate : '',
        "insuranceEndDate": insuranceEndDate != null ? insuranceEndDate : '',
        "invoiceDate": this.data.invoiceDate != null ? new Date(moment(this.data.invoiceDate).format()) : '',
        "warranty_range_date": warrantyRangeDate,
        "warrantyStartDate": warrantyStartDate != null ? warrantyStartDate : '',
        "warrantyEndDate": warrantyEndDate != null ? warrantyEndDate : '',
        "currencyId": currencyId?.toUpperCase(),
        "account": assetGroup.account
      })
      this.formGroup.get("businessUnitId")?.disable();
      this.formGroup.get("currencyName")?.disable();
      this.formGroup.get("costCenterId")?.disable();
      this.formGroup.updateValueAndValidity();
      if (!this.costCenters.find((e) => e.id == costCenterId)) {
        this.costCenters.push({ id: costCenterId, name: costCenterName })
      }
      this.minDate = new Date(moment(this.data.createdDate).format())
      // if (brand) {
      // const { id } = brand;
      // this.changeMarca(id);
      // }
      if (currencyId) {
        const currency = this.currencys.find((e) => e.id == currencyId?.toUpperCase());
        if (currency?.name == "SOLES") {
          this.formGroup.get("exchangeRate")?.disable();
        }
      }

      this.accounts = [];
      if (assetGroup) {
        const { id, account, activationAccount } = assetGroup;
        this.accounts.push(account)
        this.accountsActivacion.push(activationAccount)
        this.changeGroup(id)

      }
    }

  }


  get filesArray(): FormArray {
    return this.formGroup.controls["files"] as FormArray;
  }
  get filesRemoveArray(): FormArray {
    return this.formGroup.controls["filesRemove"] as FormArray;
  }

  getCostCenter(id: string): void {
    this.businessUnitService.costCenterByBussinesUnitId(id).subscribe((response) => {
      this.costCenters = response;
    });
  }

  onItemChangeIGV(item: any) {
    const checked: boolean = this.formGroup.get("selectionIgv")?.value;
    const unitPrice = this.formGroup.get("unitPrice")?.value;
    const assetValue = this.formGroup.get("assetValue")?.value;
    const igv = this.formGroup.get("igvstatic")?.value;
    const currencyId = this.formGroup.get("currencyId")?.value;
    if (checked) {
      this.formGroup.get("assetValue")?.setValue((+unitPrice) + (+igv))
    } else {
      if (assetValue > 0) {
        this.formGroup.get("assetValue")?.setValue((+assetValue) - (+igv))
      }
    }
    this.formGroup.updateValueAndValidity();
    if (currencyId) {
      this.change2Currys(currencyId);
    }
  }

  change2Currys(event: any) {
    // id de soles
    const currency = this.currencys.find((e) => e.id == event);
    if (currency) {
      if (currency.name == 'SOLES') {
        const assetValue = +this.formGroup.get("assetValue")?.value;
        this.formGroup.get("total")?.setValue(assetValue)
        this.formGroup.get("exchangeRate")?.clearValidators();
        this.formGroup.get("exchangeRate")?.setValue("1");
        this.formGroup.get("exchangeRate")?.disable();
      } else {
        this.formGroup.get("exchangeRate")?.setValidators(Validators.required);
        this.formGroup.get("exchangeRate")?.enable();
        const { exchangeRate, total } = this.formGroup.value;
        if (!exchangeRate || !total) {
          this.formGroup.get("exchangeRate")?.setValue("");
          this.formGroup.get("total")?.setValue("");
        } else {
          const assetValue = +this.formGroup.get("assetValue")?.value;
          this.formGroup.get("total")?.setValue((assetValue * exchangeRate).toFixed(3))
        }
      }
      this.formGroup.updateValueAndValidity();
    }
  }

  changeCurrys(event: any) {
    const currency = this.currencys.find((e) => e.id == event);
    if (currency) {
      this.formGroup.get("currencyName")?.setValue(currency.name);
      if (currency.name == 'SOLES') {
        const assetValue = +this.formGroup.get("assetValue")?.value;
        this.formGroup.get("total")?.setValue(assetValue)
        this.formGroup.get("exchangeRate")?.clearValidators();
        this.formGroup.get("exchangeRate")?.setValue("1");
        this.formGroup.get("exchangeRate")?.disable();
      } else {
        this.formGroup.get("exchangeRate")?.setValidators(Validators.required);
        this.formGroup.get("exchangeRate")?.enable();
        const { exchangeRate, total } = this.formGroup.value;
        if (exchangeRate == null) {
          this.formGroup.get("exchangeRate")?.setValue("");
          this.formGroup.get("total")?.setValue("");
        }
      }
      this.formGroup.updateValueAndValidity();
    }
  }

  changeGroup(event: any) {
    const group = this.groups.find((e) => e.id?.toUpperCase() == event.toUpperCase())
    if (group) {
      const { account, depreciationPercentage, activationAccount } = group;
      this.accounts = [];
      this.accountsActivacion = []
      if (account) {
        this.accounts.push(account)
        this.formGroup.get("account.id")?.setValue(account.id);
      }
      if(activationAccount){
        this.accountsActivacion.push(activationAccount);
      }
      if (depreciationPercentage != null) {
        this.formGroup.get("depreciationPercentage")?.setValue(depreciationPercentage * 100)
      }
      this.formGroup.updateValueAndValidity();
    }
  }

  changetype(event: any) {
    let keycode = String.fromCharCode(event.charCode);
    if (event.target.value != "") {
      const number = +event.target.value;
      const assetValue = +this.formGroup.get("assetValue")?.value;
      this.formGroup.get("total")?.setValue((number * assetValue).toFixed(3))
    } else {
      this.formGroup.get("total")?.setValue("");
    }

  }
  enventFiles(event: FormArray) {
    this.filesArray.updateValueAndValidity();
    this.formGroup.updateValueAndValidity();
  }
  eventRemove(iArray: FormArray) {
    iArray.updateValueAndValidity();
    this.formGroup.updateValueAndValidity();
  }

  async eventDisplay({ name, file, type, objectKey }: any) {
    if (name != null) {
      if (objectKey != null) {
        try {
          const json = {
            objectKey: objectKey,
          }
          this.service.getAssetPreviewFile(json).subscribe((blob) => {
            const fileExtension = name.split('.').pop()?.toLowerCase();
            if (fileExtension === 'pdf') {
              var blobpdf = blob.slice(0, blob.size, "application/pdf")
              const pdfUrl = URL.createObjectURL(blobpdf);
              ModalPreviewFileComponent.prototype.src = pdfUrl;
              ModalPreviewFileComponent.prototype.type = 'pdf';
              this.modalService.open(ModalPreviewFileComponent, {
                backdrop: 'static',
                keyboard: false,
                size: 'lg',
                ariaLabelledBy: 'modal-basic-title',
                centered: true,
              });

            } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = () => {
                const url = reader.result as string;
                ModalPreviewFileComponent.prototype.src = url;
                ModalPreviewFileComponent.prototype.type = 'image';
                this.modalService.open(ModalPreviewFileComponent, {
                  backdrop: 'static',
                  keyboard: false,
                  size: 'lg',
                  ariaLabelledBy: 'modal-basic-title',
                  centered: true,
                });
              }
            } else {
              this.notificationService.configToast('Tipo de archivo desconocido o no compatible.', 'toast-error')
            }
          });
        } catch (error) {
          this.notificationService.configToast('Error al obtener o mostrar el archivo:' + error, 'toast-error')
        }
      } else {
        this.notificationService.configToast('Error al cargar el archivo', 'toast-error')
      }
    }
  }

  onChangesValues(item: any) {
    this.formatDate();
  }
  formatDate() {
    const { insurance_range_date, warranty_range_date } = this.formGroup.value;
    if (insurance_range_date) {
      this.formGroup
        .get('insuranceStartDate')?.setValue(this.formGroup.get('insurance_range_date')?.value[0]);
      this.formGroup
        .get('insuranceEndDate')?.setValue(this.formGroup.get('insurance_range_date')?.value[1]);
    }
    if (warranty_range_date) {
      this.formGroup
        .get('warrantyStartDate')?.setValue(this.formGroup.get('warranty_range_date')?.value[0]);
      this.formGroup
        .get('warrantyEndDate')?.setValue(this.formGroup.get('warranty_range_date')?.value[1]);

    }

  }

  changeMarca(event: any) {
    this.formGroup.get('brand.name')?.setValue(null)
    if (event?.label) {
      this.formGroup.get('brand.name')?.setValue(event.label)
    }
  }
  async getBrand() {
    await this.serviceConfig.getBrandAll().subscribe((res) => {
      this.brands = res.data
    }, (err) => {
      console.log(err);
    })

  }
  async getModel(id: any) {
    await this.serviceConfig.getModelBrandId(id).subscribe((res) => {
      this.models = res.data;
    }, (err) => {
      console.log(err);
    })
  }

  async getGroup() {
    this.groups = (await this.serviceConfig.getGroupAll())?.data;

  }

  async getCategory() {
    await this.serviceConfig.getCategoryAll().subscribe((res) => {
      this.categorys = res.data;
    })
  }

  async getMaterial() {
    await this.serviceConfig.getMaterialAll().subscribe((res) => {
      this.materials = res.data;
    })
  }
  getBusinessUnits() {
    this.businessUnitService.get().subscribe((res) => {
      this.businessUnits = res.data;
    }, (err) => {
      console.log(err);
    });
  }


  async getCurrencys() {
    this.currencys = await this.currencyService.getAllPromesis()
  }
  onKey(event: any) { // without type info
    const { unitPrice, currencyId, selectionIgv } = this.formGroup.value;
    if (unitPrice != null) {
      this.formGroup.get("igvstatic")?.setValue((+unitPrice * this.numberIGV).toFixed(2));
      this.changeCurrys(currencyId)
      this.formGroup.get("assetValue")?.setValue(+(unitPrice))
      if (selectionIgv) {
        this.onItemChangeIGV(selectionIgv)
      } else {
        if (currencyId) {
          this.change2Currys(currencyId);
        }
      }
    }
  }

  onGuardar() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.invalid) {
      this.isLoading = true;
      if (this.data == null) {
        var filesStatic: File[] = [];
        this.filesArray.controls.map((e) => {
          filesStatic.push(e.value.file)
        })
        const { costCenterId, files, brand } = this.formGroup.value;
        const { name } = brand;
        var data = this.formGroup.value;
        if (name != null && name != "") {
          data.brand.id = null;
        }
        data.exchangeRate = this.formGroup.get('exchangeRate')?.value;
        data.account = this.formGroup.get("account")?.value;
        data.costCenterId = costCenterId
        data.name = this.formGroup.get("description")?.value;
        data.depreciationPercentage = this.formGroup.get("depreciationPercentage")?.value / 100;
        delete data.filesRemove;
        delete data.id;
        delete data.warranty_range_date;
        delete data.insurance_range_date;
        data.files = files.map((e: any) => ({ name: e.name, isActive: e.isActive, objectKey: e?.objectKey }))

        let formData = new FormData();
        formData.append("request", JSON.stringify({ data: [data] }));
        filesStatic.map((e) => {
          formData.append("files", e);
        })
        this.service.postAssetNew(formData).subscribe((data) => {
          if(this.isNext){
            ModalAssignmentComponent.prototype.title='Asignar activo'
            ModalAssignmentComponent.prototype.data = data;
            this.isAssignment= false;
          }else{
            this.isLoading = false;
            this.activeModal.close(true);
          }

        }, (err) => {
          this.isLoading = false;
          console.log(err);
        });
      } else {
        var files: File[] = [];
        this.filesArray.value.map((e: any) => {
          if (e.file != null)
            files.push(e.file)
        })
        this.filesRemoveArray.value.map((e: any) => {
          if (e.id) {
            this.filesArray.push(this.newfile(e));
          }
        })
        this.filesArray.updateValueAndValidity();
        this.formGroup.updateValueAndValidity();
        const { brand } = this.formGroup.value;
        const { name } = brand;
        var body = this.formGroup.value;
        if (name != null && name != "") {
          body.brand.id = null;
        }
        body.files = body.files.map((e: any) => {
          var temp = Object.assign({}, e);
          if (temp?.filePreview != null) {
            temp.id = null
          }
          return temp;
        }).map((e: any) => ({
          id: e?.id,
          name: e?.name,
          isActive: e?.isActive,
          objectKey: e?.objectKey
        }));
        body.exchangeRate = this.formGroup.get('exchangeRate')?.value;
        body.account = this.formGroup.get("account")?.value
        body.depreciationPercentage = this.formGroup.get("depreciationPercentage")?.value / 100;
        body.costCenterId = this.formGroup.get("costCenterId")?.value;
        if (body.manufacturingYear == null) {
          body.manufacturingYear = 0;
        }
        delete body.warranty_range_date;
        delete body.insurance_range_date;
        delete body.filesRemove;

        let formData = new FormData();
        formData.append("request", JSON.stringify(body));
        files.map((e) => {
          formData.append("files", e);
        })

        this.service.putAssetNew(formData, body.id).subscribe((res) => {
          this.isLoading = false;
          this.activeModal.close(true);
        }, (err) => {
          this.isLoading = false;
          console.log(err);

        })

      }
    }
  }

  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,3})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);

    if (!reg.test(input)) {
      event.preventDefault();
    }
  }


  changeGroupName(id: string) {
    this.accounts.find((r) => r.id == id);
  }

}
