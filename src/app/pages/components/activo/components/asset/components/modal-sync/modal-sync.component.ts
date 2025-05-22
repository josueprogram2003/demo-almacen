import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DualListComponent } from 'angular-dual-listbox';
import moment from 'moment';
import { FlatPickrOutputOptions } from 'angularx-flatpickr/lib/flatpickr.directive';
import { uuidv7 } from 'uuidv7';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Observable, Observer, debounceTime, distinctUntilChanged, tap, filter, switchMap, catchError, of } from 'rxjs';
import { AsignacionService } from '../../../../../../../core/services/activo/asignacion.service';
import { CostcenterService } from '../../../../../../../core/services/activo/costcenter.service';
import { CurrencyService } from '../../../../../../../core/services/activo/currency.service';
import { ConfiguracionService } from '../../../../../../../core/services/activo/configuracion.service';
import { MaestraService } from '../../../../../../../core/services/maestra.service';
import { Group } from '../../../../../../../core/models/groups.model';
import { Account } from '../../../../../../../core/models/account.model';
import { Currency } from '../../../../../../../core/models/currency.model';
import { CostCenter } from '../../../../../../../core/models/costCenter.model';
import { PurchaseOrder, PurchaseOrderAsset } from '../../../../../../../core/models/purchaseOrder.model';
import { Brand } from '../../../../../../../core/models/brand.model';
import { Model } from '../../../../../../../core/models/model.model';
import { Category } from '../../../../../../../core/models/category.model';
import { Material } from '../../../../../../../core/models/material.model';


@Component({
  selector: 'app-modal-sync',
  templateUrl: './modal-sync.component.html',
  styleUrl: './modal-sync.component.scss'
})
export class ModalSyncComponent implements OnInit {
  title!: string;
  isLoading: boolean = false;
  articlesboolean: boolean = false;
  formGroup: FormGroup = new FormGroup({})
  numberIGV: number = 0.18

  costCenters: CostCenter[] = [];
  purchaseOrderAsset: PurchaseOrderAsset[] = [];
  stations: Array<PurchaseOrderAsset> = [];
  confirmedStations: Array<PurchaseOrderAsset> = [];
  currencys: Currency[] = [];
  brands: Brand[] = [];
  models: Model[] = [];
  groups: Group[] = [];
  categorys: Category[] = [];
  materials: Material[] = [];
  accounts: Account[] = []
  accountsActivacion: Account[] = []
  sourceStations: Array<any> = [];
  yearData: any[] = [];

  suggestions$?: Observable<any[]>;
  searching: boolean = false;
  searchFailed: boolean = false;

  keepSorted = true;
  key: string = "";
  display: string[] = [] ;
  idKey: string = "";
  source: Array<any> = [];
  confirmed: Array<any> = [];
  disabled: boolean = false;
  filter: boolean = true;
  minDate = new Date();
  format: any = { add: 'Agregar', remove: 'Remover', all: 'Todos', none: 'Ninguno', direction: DualListComponent.LTR, draggable: true, locale: 'es' };

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private service: AsignacionService, private costCenterService: CostcenterService, private currencyService: CurrencyService, private serviceConfig: ConfiguracionService, private sMaestra: MaestraService) {
    this.formGroup = this.fb.group({
      "search": ["", Validators.required],
      "activos": this.fb.array([])
    })
  }

  get activos(): FormArray {
    return this.formGroup.controls["activos"] as FormArray
  }

  files(i: any): FormArray {
    return i.controls["files"] as FormArray;
  }

  filesRemove(i: any): FormArray {
    return i.controls["filesRemove"] as FormArray;
  }

  newactivo(item: PurchaseOrderAsset) {
    return this.fb.group({
      "id": [item.id, []],
      "name": [item.name, []],
      "brand": this.fb.group({
        "id": ["", Validators.required],
        "name": ["", []]
      }),
      "description": [item.name, [Validators.required]],
      "igv": ["", []],
      "selectionIgv": [false, []],
      "unitPrice": [{ value: item.unitPrice, disabled: true }, Validators.required],
      "assetValue": [item.unitPrice.toFixed(2), [Validators.required]],
      "depreciationPercentage": [{ value: "", disabled: true }, []],
      "igvstatic": [(+item.unitPrice * this.numberIGV).toFixed(2), []],
      "total": [{ value: item.purchaseOrder.currencyName != "SOLES" ? "" : (item.unitPrice).toFixed(3), disabled: true }, Validators.required],
      // "model": this.fb.group({
      //   "id": ["", Validators.required],
      // }),
      "assetGroup": this.fb.group({
        "id": ["", Validators.required],
      }),
      "activationAccount": ["", []],
      "supplierName": [{ value: item.purchaseOrder.supplierName, disabled: true }, []],
      "supplierId": [item.purchaseOrder.supplierId, Validators.required],
      "nomenclature": [item?.currency?.nomenclature, []],
      "exchangeRate": [{ value: item.purchaseOrder.currencyName != "SOLES" ? "" : "1", disabled: item.purchaseOrder.currencyName != "SOLES" ? false : true }, []],
      "material": this.fb.group({
        "id": ["", Validators.required]
      }),
      "serialNumber": ["", Validators.required],
      // "category": this.fb.group({
      //   "id": ["", Validators.required],
      // }),
      "manufacturingYear": [new Date().getFullYear(), []],
      "invoiceDate": [new Date(moment(item.purchaseOrder.deliveryDate).format()), Validators.required],
      "currencyId": [item.purchaseOrder.currencyId, Validators.required],
      "currencyName": [item.purchaseOrder.currencyName, Validators.required],
      // "measurementUnitId": [item.measureUnit.id, Validators.required],
      "costCenterId": [{ value: item?.purchaseOrder?.costCenterId, disabled: true }, Validators.required],
      "businessUnitId": [item?.purchaseOrder?.businessUnitId, []],
      "companyId": [sessionStorage.getItem('companyId'), Validators.required],
      "account": this.fb.group({
        "id": [{ value: "", disabled: true }, [Validators.required]],
      }),
      "insurance_range_date": ["", []],
      "insuranceStartDate": ["", []],
      "insuranceEndDate": ["", []],
      "warranty_range_date": ["", []],
      "warrantyStartDate": ["", []],
      "warrantyEndDate": ["", []],
      "activationDate": [new Date(), [Validators.required]],
      "files": this.fb.array([]),
      "invoiceNumber": ["", Validators.required],
      "purchaseOrderId": [item.purchaseOrderId, []],
      "purchaseOrderDetailId": [item.purchaseOrderDetailId, []],
    })
  }

  ngOnInit(): void {
    this.getBrand();
    this.getCategory();
    this.getGroup();
    this.getMaterial();
    this.getCostCenter();
    this.getCurrencys();
    this.yearData = this.sMaestra.getYears(1980);
    this.changeWriter();
  }



  changeWriter() {
    this.articlesboolean = false;
    this.suggestions$ = new Observable((observer: Observer<string | undefined>) => {
      const { search } = this.formGroup.value;
      observer.next(search)
    }).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      filter((term:any) => term.length > 1),
      switchMap((term) =>
        this.service.getPurchaseOrder(term).pipe(
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
    )
  }
  onChange({ item }: TypeaheadMatch) {
    if (item) {
      this.source = [];
      this.confirmed = [];
      this.stations = [];
      this.doReset();
      this.changePurchaseOrder(item);
    }
  }


  // search() {
  //   this.articlesboolean = false;
  //   if (!this.formGroup.invalid) {
  //     const { search } = this.formGroup.value;
  //     this.service.getPurchaseOrder(search).subscribe(async (res) => {
  //       this.purchaseOrderAsset = res;
  //       const Arrayunique = [...new Set(this.purchaseOrderAsset.map((item) => ({ id: item.id })))];
  //       (this.purchaseOrderAsset.map(async (e, i) => {
  //         var temp = Object.assign({}, e);
  //         temp.name = temp.name ? temp.name : '';
  //         const repetition = e.amount;
  //         const { description, amount, purchaseOrder } = e;
  //         const { currencyId } = purchaseOrder;
  //         temp.currency = this.currencys.find((x) => x.id == currencyId)
  //         temp.amount = amount;
  //         const name = `${temp.name} ${description}`;
  //         for (let index = 0; index < repetition; index++) {
  //           temp.name = `${name} (${index + 1})`;
  //           temp.amountId = `${temp.id}+(${index + 1})`;
  //           temp.index = index + 1;
  //           this.stations.sort((a, b) => a.index > b.index ? 1 : -1).push({ ...temp })
  //           temp.name = temp.name.replace(`(${index + 1})`, "");
  //         }
  //         this.doReset();
  //         this.articlesboolean = true;
  //       }))
  //     })
  //   }
  // }

  changePurchaseOrder(purchaseOrder: PurchaseOrder) {
    purchaseOrder.responseComplete?.map(async (e, i) => {
      var temp = Object.assign({}, e);
      temp.remainingQuantity = temp.remainingQuantity ? temp.remainingQuantity : 0;

      temp.name = temp.name ? temp.name : '';
      const repetition = e.amount - temp.remainingQuantity;
      const { description, amount, purchaseOrder } = e;
      const { currencyId, id } = purchaseOrder;
      temp.currency = this.currencys.find((x) => x.id == currencyId)
      temp.amount = amount;
      const name = `${temp.name} ${description ? description : ''}`;
      console.log(repetition);
      if (repetition > 0) {
        for (let index = 0; index < repetition; index++) {
          temp.name = `${name} (${index + 1})`;
          temp.amountId = `${temp.id}(${index + 1})`;
          temp.index = index + 1;
          temp.purchaseOrderDetailId = temp.id;
          temp.purchaseOrderId = id;
          this.stations.sort((a:any, b:any) => a.index > b.index ? 1 : -1).push({ ...temp })
          temp.name = temp.name.replace(`(${index + 1})`, "");
        }
        this.doReset();
        this.articlesboolean = true;
      }
    });
  }


  getCurrencys() {
    this.currencyService.getAll().subscribe((response) => {
      this.currencys = response;
    });
  }
  getCostCenter() {
    this.costCenterService.getByUser$().subscribe((response) => {
      this.costCenters = response;
    });
  }


  getBrand() {
    this.serviceConfig.getBrandAll().subscribe((res) => {
      this.brands = res.data;
    });
  }
  getModel(id: string) {
    this.serviceConfig.getModelBrandId(id).subscribe((res) => {
      this.models = res.data;
    });
  }

  async getGroup() {
    this.groups = (await this.serviceConfig.getGroupAll())?.data;
  }

  getCategory() {
    this.serviceConfig.getCategoryAll().subscribe((res) => {
      this.categorys = res.data;
    });
  }

  getMaterial() {
    this.serviceConfig.getMaterialAll().subscribe((res) => {
      this.materials = res.data;
    });
  }

  doReset() {
    this.sourceStations = JSON.parse(JSON.stringify(this.stations));
    this.sourceStations.sort((a, b) => a.item - b.item)
    console.log(this.sourceStations);
    this.confirmedStations = new Array<any>();
    this.useStations();
  }
  private useStations() {
    this.idKey = 'amountId';
    this.key = 'amountId';
    this.display = ['name','index']; // [ 'station', 'state' ];
    this.keepSorted = true;
    this.source = this.sourceStations;
    this.confirmed = this.confirmedStations;
  }

  removeActivos() {
    this.activos.clear()
    this.formGroup.updateValueAndValidity();
  }

  changeValues() {
    this.confirmedStations.map(async (e) => {
      if (e.amount) {
        const repetition = e.amount;
        const { costCenterId, costCenterName, currencyId } = e.purchaseOrder;
        e.purchaseOrder.currencyId = currencyId.toUpperCase();
        if (!this.costCenters.find((e) => e.id == costCenterId)) {
          this.costCenters.push({ id: costCenterId, name: costCenterName })
        }
        // e.name = e.name.replace(`(${repetition})`, "");
        // for (let index = 0; index < repetition; index++) {

        //   e.name = e.name.replace(/[0-9]/g, '')
        //   e.name = e.name.replace('.', '');
        //   e.name = `${index + 1}.${e.name}`;
        this.activos.push(this.newactivo(e))
        this.activos.controls.map((e: AbstractControl) => {
          e.get('account')?.disable();
          e.get('depreciationPercentage')?.disable();
        })
        // }
      }
    })
  }

  changeMarca(event: any, i: AbstractControl) {
    i.get('brand.name')?.setValue(null)
    if (event?.label) {
      i.get('brand.name')?.setValue(event.label)
    }
  }

  changeForm(i: AbstractControl, indexG: number, event?: FlatPickrOutputOptions, nodate?: string) {
    i.updateValueAndValidity();
    const { brand, id, assetGroup, material, account, invoiceNumber, insurance_range_date, warranty_range_date, currencyId, manufacturingYear, description } = i.value;
    const files = i.get('files') as FormArray;

    if (typeof this.activos != undefined && this.activos.length > 0) {
      const countArray = this.activos.controls.findIndex((e) => e.value.id == id);

      if (countArray == indexG) {
        this.activos.controls.filter((e) => e.value.id == id).map((e) => {
          e.patchValue({
            brand: brand,
            assetGroup: assetGroup,
            material: material,
            account: account,
            invoiceNumber: invoiceNumber,
            insurance_range_date: insurance_range_date,
            warranty_range_date: warranty_range_date,
            currencyId: currencyId,
            manufacturingYear: manufacturingYear,
            description: description,
          })
          if (files?.length > 0) {
            files.controls.map(element => {
              if (!(e.get('files') as FormArray).controls.find((e) => e.value.id == element.value.id)) {
                var formGroupstatic: AbstractControl = this.fb.group({
                  "name": ["", []],
                  "file": ["", []],
                  "type": ["", []],
                  "filePreview": ["", []],
                  "isActive": true,
                  "icon": ["", []],
                  "assetId": ["", []],
                  "id": ["", []],
                  "objectKey": ["", []],
                })
                const id = uuidv7();
                const { name, file } = element.value;
                const extension = name.split('.')[name.split('.').length - 1]
                const newName = id + '.' + extension;
                const fileStatic: File = new File([file], newName, { type: file.type });
                formGroupstatic.patchValue({
                  ...element.value,
                  name: newName,
                  file: fileStatic,
                })
                formGroupstatic.updateValueAndValidity();
                (e.get('files') as FormArray).push(formGroupstatic)
              }
            });
          } else {
            (e.get('files') as FormArray).clear();
          }
          e.updateValueAndValidity();
          if (nodate == 'invoiceDate') {
            e.get('invoiceDate')?.setValue(event?.selectedDates[0])
          }
          if (nodate == 'activationDate') {
            e.get('activationDate')?.setValue(event?.selectedDates[0])
          }
          if (assetGroup) {
            this.changeGroup(assetGroup.id, e)
          }
          if (currencyId) {
            this.changeCurrys(currencyId, e);
          }
          const exchangeRateUnit = i.get('exchangeRate')?.value;
          if (exchangeRateUnit) {
            const number = exchangeRateUnit;
            e.get('exchangeRate')?.setValue(exchangeRateUnit)
            const assetValue = +e.get("assetValue")?.value;
            e.get("total")?.setValue((number * assetValue).toFixed(3))
          } else {
            e.get("total")?.setValue("");
          }
          e.updateValueAndValidity();
        })
      }

    }
  }

  changeFormSelection(i: AbstractControl, indexG: number) {
    i.updateValueAndValidity();
    const { id, selectionIgv, assetValue } = i.value;
    const unitPrice = i.get('unitPrice')?.value;
    const total = i.get('total')?.value

    if (typeof this.activos != undefined && this.activos.length > 0) {
      const countArray = this.activos.controls.findIndex((e) => e.value.id == id);
      if (countArray == indexG) {
        this.activos.controls.filter((e) => e.value.id == id).map((e) => {
          e.patchValue({
            selectionIgv: selectionIgv,
            unitPrice: unitPrice,
            assetValue: assetValue,
            total: total
          });
          e.updateValueAndValidity();
          this.onItemChangeIGV(e);
          e.updateValueAndValidity();
        });
      } else {
        this.onItemChangeIGV(i);
      }
    }
  }


  changeGroup(event: string, i: AbstractControl) {
    const group = this.groups.find((e) => e.id?.toUpperCase() == event.toUpperCase())
    if (group) {
      const { account, depreciationPercentage, activationAccount } = group;
      // this.accounts = [];
      // this.accountsActivacion = []
      if (account) {
        if (!this.accounts.find((e) => e.id.toUpperCase() == account.id.toUpperCase())) {
          this.accounts.push(account);
        }
        i.get("account.id")?.setValue(account.id);
        i.updateValueAndValidity();
      }
      if (activationAccount) {
        if (!this.accountsActivacion.find((e) => e.id.toUpperCase() == activationAccount.id.toUpperCase())) {
          this.accountsActivacion.push(activationAccount);
        }
        i.get('activationAccount')?.setValue(activationAccount?.id)
      }
      if (depreciationPercentage != null) {
        i.get("depreciationPercentage")?.setValue(+depreciationPercentage * 100)
        i.updateValueAndValidity();
      }
    }
  }

  changeCurrys(event: any, i: AbstractControl) {
    const { assetValue, selectionIgv } = i.value;
    const currency = this.currencys.find((e) => e.id == event);
    const unitPrice = +i.get("unitPrice")?.value;
    if (currency) {
      if (currency.name == 'SOLES') {
        i.get("total")?.setValue(unitPrice)
        i.get("exchangeRate")?.clearValidators();
        i.get("exchangeRate")?.setValue("1");
        i.get("exchangeRate")?.disable();

      } else {
        i.get("exchangeRate")?.setValidators(Validators.required);
        i.get("exchangeRate")?.enable();
        const { exchangeRate, total } = i.value;
        if (exchangeRate == null) {
          i.get("exchangeRate")?.setValue("");
          i.get("total")?.setValue("");
        }
      }
      i.updateValueAndValidity();
    }
    if (assetValue == "") {
      i.get("assetValue")?.setValue(unitPrice);
      if (selectionIgv) {
        this.onItemChangeIGV(selectionIgv)
      }
    }
  }
  changetype(event: any, i: AbstractControl, index: number) {
    let keycode = String.fromCharCode(event.charCode);
    if (event.target.value != "") {
      const number = +event.target.value;
      const assetValue = +i.get("assetValue")?.value;
      i.get("total")?.setValue((number * assetValue).toFixed(3))
      this.changeForm(i, index)
    } else {
      i.get("total")?.setValue("");
      this.changeForm(i, index)
    }
  }
  onItemChangeIGV(i: AbstractControl) {
    const checked: boolean = i.get("selectionIgv")?.value;
    const unitPrice = i.get("unitPrice")?.value;
    const assetValue = i.get("assetValue")?.value;
    const igv = i.get("igvstatic")?.value;

    const currencyId = i.get("currencyId")?.value;
    if (checked) {
      i.get("assetValue")?.setValue((+unitPrice) + (+igv))
    } else {
      if (assetValue > 0) {
        i.get("assetValue")?.setValue((+assetValue) - (+igv))
      }
    }
    i.updateValueAndValidity();
    if (currencyId) {
      this.change2Currys(currencyId, i);
    }
  }


  change2Currys(event: string, i: AbstractControl) {
    const currency = this.currencys.find((e) => e.id == event);
    if (currency) {
      if (currency.name == 'SOLES') {
        const assetValue = +i.get("assetValue")?.value;
        i.get("total")?.setValue(assetValue.toFixed(3))
        i.get("exchangeRate")?.clearValidators();
        i.get("exchangeRate")?.setValue("1");
        i.get("exchangeRate")?.disable();
      } else {
        i.get("exchangeRate")?.setValidators(Validators.required);
        i.get("exchangeRate")?.enable();
        const { exchangeRate } = i.value;
        if (!exchangeRate) {
          i.get("exchangeRate")?.setValue("");
          i.get("total")?.setValue("");
        } else {
          const assetValue = +i.get("assetValue")?.value;
          i.get("total")?.setValue((assetValue * exchangeRate).toFixed(2))
        }
      }
      i.updateValueAndValidity();
    }
  }

  enventFiles(iArray: FormArray, i: AbstractControl, index: number) {
    iArray.updateValueAndValidity();
    i.updateValueAndValidity();
    this.formGroup.updateValueAndValidity();
    this.changeForm(i, index)
  }

  eventRemove(iArray: FormArray, i: AbstractControl, index: number) {
    iArray.updateValueAndValidity();
    this.formGroup.updateValueAndValidity();
    i.updateValueAndValidity();
    this.changeForm(i, index)
  }

  onChangesValues(i: AbstractControl, index: number) {
    this.formatDate(i, index);
  }

  formatDate(i: AbstractControl, index: number) {
    if (i.get('insurance_range_date')) {
      i.get('insuranceStartDate')?.setValue(i.get('insurance_range_date')?.value[0]);
      i.get('insuranceEndDate')?.setValue(i.get('insurance_range_date')?.value[1]);
      i.updateValueAndValidity()
      this.changeForm(i, index);
    }
    if (i.get('warranty_range_date')) {
      i.get('warrantyStartDate')?.setValue(i.get('warranty_range_date')?.value[0])
      i.get('warrantyEndDate')?.setValue(i.get('warranty_range_date')?.value[1])
      i.updateValueAndValidity()
      this.changeForm(i, index);
    }
  }

  onKey(i: AbstractControl) {
    const { unitPrice, currencyId, selectionIgv } = i.value;
    if (unitPrice != null) {
      i.get("igvstatic")?.setValue((+unitPrice * this.numberIGV).toFixed(2));
      i.get("assetValue")?.setValue(+(unitPrice))
      this.changeCurrys(currencyId, i)
      if (selectionIgv) {
        this.onItemChangeIGV(i)
      } else {
        if (currencyId) {
          this.change2Currys(currencyId, i);
        }
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


  changeInput(event: KeyboardEvent) {
    if ((event.target as HTMLInputElement).value.trim() == '') {
      this.articlesboolean = false;
    }
  }

  changeaccountNumber(id: String) {
    return this.accounts.find((e) => e?.id.toUpperCase() == id.toUpperCase())?.accountNumber
  }

  changeaccountNumberActivation(id: String) {
    return this.accountsActivacion.find((e) => e?.id.toUpperCase() == id.toUpperCase())?.accountNumber
  }


  onGuardar() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.invalid) {
      this.isLoading = true;
      var files: File[] = [];
      this.activos.controls.map((e: AbstractControl) => {
        this.files(e).value.map((e: any) => {
          files.push(e.file)
        })
      });
      const data = this.activos.controls.map((e: AbstractControl) => {
        const temp = Object.assign({}, e.value);
        delete temp.id;
        const { brand } = temp;
        const { name } = brand;
        if (name != null && name != "") {
          temp.brand.id = null;
        }
        temp.exchangeRate = e.get('exchangeRate')?.value;
        temp.total = e.get('total')?.value;
        temp.unitPrice = e.get('unitPrice')?.value;
        temp.account = e.get('account')?.value;
        temp.costCenterId = e.get('costCenterId')?.value;
        temp.exchangeRate = e.get('exchangeRate')?.value;
        temp.depreciationPercentage = e.get('depreciationPercentage')?.value / 100;
        temp.files = temp.files.map((e: any) => ({ name: e.name, isActive: e.isActive, }));
        return temp
      });
      let formData = new FormData();
      formData.append("request", JSON.stringify({ data: data }));
      files.map((e) => {
        formData.append("files", e);
      })
      if (typeof this.activos != undefined && this.activos.length > 0) {
        this.service.postAssetNew(formData).subscribe((res) => {
          this.isLoading = false;
          this.activeModal.close(true);
        }, (err) => {
          this.isLoading = false;
          console.log(err);
        })
      }

    }
  }

}
