import { Component, Input, OnInit, Type } from '@angular/core';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ModalSyncComponent } from '../modal-sync/modal-sync.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ModalCodeComponent } from '../modal-code/modal-code.component';
import { ModalDetailsComponent } from '../modal-details/modal-details.component';
import { ModalAdditionalComponent } from '../modal-additional/modal-additional.component';
import { ModalAssignmentComponent } from '../modal-assignment/modal-assignment.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AsignacionService } from '../../../../../../../core/services/activo/asignacion.service';
import { CurrencyService } from '../../../../../../../core/services/activo/currency.service';
import { AdditionalActivoService } from '../../../../../../../core/services/activo/additionalActivo.service';
import { pdfDetailsService } from '../../../../../../../core/services/activo/pdfDetails.service';
import { FileService, NotificationUtilService } from '../../../../../../../utils';
import { pdfAssignmentHistoryService } from '../../../../../../../core/services/activo/pdfAssigmentHistory.service';
import { ModalPreviewFileComponent } from '../../../../../../../shared/components/modal-preview-file/modal-preview-file.component';
import { Asset } from '../../../../../../../core/models/asset.model';
import { Currency } from '../../../../../../../core/models/currency.model';
import { Additional } from '../../../../../../../core/models/additional.model';
import { Pagination, Response } from '../../../../../../../core/models/paginationResponse.model';
import * as QRCode from 'qrcode';


interface History {
  employeeId: string;
  employeeName: string;
  costCenterName: string;
  status: string;
  condition: string;
  assignmentDate: Date;
  returnDate: Date;
}

interface HistoryAssignment {
  asset: Asset;
  history: History[];
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  isLoadingList: boolean = false;
  paramsFilter: any;
  currentPage: number = 1;
  maxSize: number = 3;
  date: Date = new Date();
  assets: Asset[] = [];
  pagination: Response<Pagination<Asset[]>> = {
    status: '',
    message: '',
    data: {
      content: [],
      page: 0,
      pageSize: 0,
      totalItems: 0,
    },
  };

  depreciateStatus: { id: string; name: string }[] = [
    {
      id: '1',
      name: 'Activo',
    },
    {
      id: '2',
      name: 'Depreciado',
    },
    {
      id: '3',
      name: 'De baja',
    },
    {
      id: '4',
      name: 'Vendido',
    },
  ];

  currencys: Currency[] = [];
  additionals: Additional[] = [];
  page_size: number = 10;
  page_number: number = 1;
  paramsPagination: any = {
    page: this.page_number,
    size: this.page_size,
  };

  @Input() set params(values: any) {
    if (values) {
      this.changeAction(values);
    }
  }

  constructor(
    private service: AsignacionService,
    private notificationService: NotificationUtilService,
    private modalService: NgbModal,
    private currencyService: CurrencyService,
    private serviceAdditional: AdditionalActivoService,
    private pdfService: pdfDetailsService,
    private file: FileService,
    private spinner: NgxSpinnerService,
    private pdfHistory: pdfAssignmentHistoryService
  ) {}

  ngOnInit(): void {
    this.getCurrencys();
  }

  onList() {
    this.isLoadingList = true;
    this.spinner.show();
    this.paramsPagination = {
      page: this.page_number,
      ...this.paramsFilter,
      size: this.paramsFilter?.size ? this.paramsFilter?.size : this.page_size,
    };
    // this.service.getAssetNew(this.paramsPagination).subscribe(
    //   (res) => {
    //     this.pagination = res;
    //     this.assets = this.pagination.data.content;
    //     this.assets = this.assets.map((r) => {
    //       var temp = Object.assign({}, r);
    //       temp.additionals = temp.additionals?.map((a) => {
    //         var temp1 = Object.assign({}, a);
    //         temp1.files = temp1.files.map((e) => ({
    //           ...e,
    //           icon: this.file.getIcon(this.file.getExtencion(e.name)),
    //         }));
    //         return temp1;
    //       });
    //       return temp;
    //     });
    //     this.pagination.data.content = this.assets;
    //     this.isLoadingList = false;
    //     this.spinner.hide();
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.isLoadingList = false;
    //     this.spinner.hide();
    //   }
    // );
  }

  modalNew() {
    ModalFormComponent.prototype.data = null;
    ModalFormComponent.prototype.title = 'Registrar activo';
    this.modalService
      .open(ModalFormComponent, {
        keyboard: false,
        backdrop: 'static',
        size: 'xl',
      })
      .result.then((res) => {
        if (res) {
          this.onList();
          this.notificationService.configToast(
            'Realizado correctamente',
            'toast-success'
          );
        }
      });
  }

  edit(item: Asset) {
    this.service.getAssetNewById(item.id).subscribe((res) => {
      ModalFormComponent.prototype.data = res.data;
      ModalFormComponent.prototype.title = 'Editar activo';
      this.modalService
        .open(ModalFormComponent, {
          keyboard: false,
          backdrop: 'static',
          size: 'xl',
        })
        .result.then((res) => {
          if (res) {
            this.onList();
            this.notificationService.configToast(
              'Realizado correctamente',
              'toast-success'
            );
          }
        });
    });
  }

  remove(item: Asset) {
    this.notificationService
      .configSwalDelete(
        '¿Está seguro?',
        '¿Estás seguro de que deseas eliminar este registro?',
        'warning'
      )
      .then((data) => {
        if (data.isConfirmed) {
          this.service.deleteAssetNew(item.id).subscribe((data) => {
            this.onList();
            this.notificationService.configToast(
              'Realizado correctamente',
              'toast-success'
            );
          });
        }
      });
  }

  viewDetails(item: Asset) {
    this.service.getAssetNewById(item.id).subscribe(async (res) => {
      var asset = res.data;
      asset.employeeId = item.employeeId;
      asset.employeeName = item.employeeName;
      const currency = this.currencys.find(
        (e) => e.id === asset.currencyId.toUpperCase()
      );
      asset.currency = currency;
      await this.getAdditional(asset.id);
      asset.additionals = this.additionals.map((e) => ({
        ...e,
        amount: Intl.NumberFormat('en-IN', {
          maximumSignificantDigits: 3,
        }).format(+e.amount),
      }));
      asset.amountDepreciation = Intl.NumberFormat('en-IN', {
        maximumSignificantDigits: 3,
      }).format(+asset.amountDepreciation);
      const url = await this.pdfService.viewPdfModal(asset);
      ModalDetailsComponent.prototype.data = asset;
      ModalDetailsComponent.prototype.src = url;
      this.modalService.open(ModalDetailsComponent, {
        backdrop: 'static',
        keyboard: false,
        size: 'xl',
      });
    });
  }

  changeAdd(item: Asset) {
    ModalAdditionalComponent.prototype.title = 'Agregar adicionales';
    ModalAdditionalComponent.prototype.data = item;
    this.modalService
      .open(ModalAdditionalComponent, {
        backdrop: 'static',
        keyboard: false,
        size: 'xl',
      })
      .closed.subscribe((e) => {
        if (e) {
          this.notificationService.configToast(
            'Realizado correctamente',
            'toast-success'
          );
          this.onList();
        }
      });
  }

  modelCode(item: Asset) {
    ModalCodeComponent.prototype.title = 'Generar QR';
    ModalCodeComponent.prototype.data = item;
    this.modalService
      .open(ModalCodeComponent, {
        backdrop: 'static',
        keyboard: false,
        size: 'lg',
      })
      .closed.subscribe((e) => {});
  }

  openSync() {
    ModalSyncComponent.prototype.title = 'Registro de nuevos activos';
    this.modalService
      .open(ModalSyncComponent, {
        keyboard: false,
        backdrop: 'static',
        size: 'xl',
      })
      .result.then((res) => {
        if (res) {
          this.onList();
          this.notificationService.configToast(
            'Realizado correctamente',
            'toast-success'
          );
        }
      });
  }

  async getHistory(item: Asset) {
    this.service.getHistoryAssigment(item.id).subscribe(async (res) => {
      const historyAssignment: HistoryAssignment = {
        asset: item,
        history: res.data.map((e:any) => ({
          employeeId: e.employeeId,
          employeeName: e.employeeName,
          costCenterName: e.costCenterName,
          status: e.state === 1 ? 'Activo' : 'Devuelto',
          condition: e.condition,
          assignmentDate: e.assignmentDate,
          returnDate: e.returnDate,
        })),
      };
      const url = await this.pdfHistory.viewPdfModal(
        historyAssignment.history,
        historyAssignment.asset
      );
      ModalDetailsComponent.prototype.src = url;
      this.modalService.open(ModalDetailsComponent, {
        backdrop: 'static',
        keyboard: false,
        size: 'xl',
      });
      /*    ModalDetailsComponent.prototype.data = historyAssignment;
      this.modalService.open(ModalDetailsComponent, {
        backdrop: 'static',
        keyboard: false,
        size: "xl"
      }) */
    });
  }
  open(file: any) {
    const { name, type, objectKey } = file;
    if (name != null) {
      if (objectKey != null) {
        try {
          const json = {
            objectKey: objectKey,
          };
          this.service.getAssetPreviewFile(json).subscribe((blob) => {
            const fileExtension = name.split('.').pop()?.toLowerCase();
            if (fileExtension === 'pdf') {
              var blobpdf = blob.slice(0, blob.size, 'application/pdf');
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
              };
            } else {
              this.notificationService.configToast(
                'Tipo de archivo desconocido o no compatible.',
                'toast-error'
              );
            }
          });
        } catch (error) {
          this.notificationService.configToast(
            'Error al obtener o mostrar el archivo:' + error,
            'toast-error'
          );
        }
      } else {
        this.notificationService.configToast(
          'Error al cargar el archivo',
          'toast-error'
        );
      }
    }
  }

  async generateQR() {
    const array = this.assets.map((e) => ({ description: e.description, serialNumber: e.serialNumber, url: e.url, code: e.code }));
    let pdf = new jsPDF('l', 'mm', [50.8, 25.4]);
    await Promise.all(array.map(async (res, index) => {
      var urlQr: string = "";
      await QRCode.toDataURL(res.url, { errorCorrectionLevel: 'L', version: 3 }).then((url: any) => {
        urlQr = url;
      })
      let html = `<div class="row" #pdfTable style="background-color: #ffff; padding-top: 25px;">
                <div class="card" style="background-color: #ffff; box-shadow: none !important;">
                    <div class="" style="background-color: #ffff; width:800px">
                        <div style="background-color: #ffff; display: grid; grid-template-columns: 450px 300px;">
                            <div class="">
                                <div class="" style="display: flex; justify-content: center;">
                                    <img src="./assets/img/logo/logo-horizontal-default.png" class="img-fluid"
                                        style="height: 80px;" alt="">
                                </div>
                                <div class="p-1"></div>
                                <div>
                                    <div>
                                     <p class=""
                                        style="font-weight: 600; font-size: 30px; margin-bottom: 0px; text-align: center; font-weight: bolder; text-transform: uppercase;">${res.description}
                                    </p>
                                    <br>
                                    <p class="" style="font-weight: 600; font-size: 30px; margin-bottom: 0px; text-align: center;">
                                        ${res.serialNumber}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="">
                                <div class="" style="display: flex; justify-content: center; margin: 0px; padding: 0px;">
                                    <img src="${urlQr}" class="img-fluid"
                                        style="height: 290px; width:290px" alt="">
                                </div>
                                <div style="font-weight: bold; font-size: 20px; text-align: center;">
                                  INV-2025
                                </div>
                            </div>
                        </div>
                        <p class="" style="font-weight: 600; font-size: 30px; margin-bottom: 0px; text-align: center; margin-top: 0px;">
                            ${this.date.getFullYear()} - ${res?.code}
                        </p>
                    </div>
                </div>
            </div>`

      await this.htmlStringToPdf(html, pdf, index, array)
    }))
    const pdfUrl = URL.createObjectURL(pdf.output("blob"));
    ModalPreviewFileComponent.prototype.src = pdfUrl;
    ModalPreviewFileComponent.prototype.type = 'pdf';
    this.modalService.open(ModalPreviewFileComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
    });

  }


  changeAssignment(item: Asset) {
    if (item.employeeId == null) {
      ModalAssignmentComponent.prototype.title = 'Asignar activo';
      ModalAssignmentComponent.prototype.data = item;
      this.modalService
        .open(ModalAssignmentComponent, {
          backdrop: 'static',
          keyboard: false,
          size: 'xl',
        })
        .closed.subscribe((res) => {
          if (res) {
            this.onList();
            this.notificationService.configToast(
              'Realizado correctamente',
              'toast-success'
            );
          }
        });
    }
  }

  getCurrencys() {
    this.currencyService.getAll().subscribe((response) => {
      this.currencys = response;
    });
  }
  async getAdditional(assetId: string) {
    this.additionals = (await this.serviceAdditional.getAdditionalById(
      assetId
    ))!.data;
  }

  async htmlStringToPdf(
    htmlString: any,
    pdf: jsPDF,
    index: number,
    array: any[]
  ) {
    // let pdf = new jsPDF('l', 'mm', [2, 4]);
    let iframe = document.createElement('iframe');
    iframe.style.visibility = 'hidden';
    document.body.appendChild(iframe);
    let iframedoc = iframe.contentDocument || iframe.contentWindow?.document;
    iframedoc!.body.innerHTML = htmlString;
    await html2canvas(iframedoc!.body).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const widthRatio = pageWidth / canvas.width;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
      const canvasWidth = canvas.width * ratio;
      const canvasHeight = canvas.height * ratio;
      const marginX = (pageWidth - canvasWidth) / 2;
      const marginY = (pageHeight - canvasHeight) / 2;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, canvasWidth, canvasHeight);
      if (index < array.length - 1) {
        pdf.addPage();
      }
    });
  }

  onExportExcel() {
    const download = (blob: any) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `ReporteActivos.xlsx`;
      link.click();
    };
    this.paramsPagination = {
      page: this.page_number,
      ...this.paramsFilter,
      size: this.paramsFilter?.size ? this.paramsFilter?.size : this.page_size,
    };

    this.service.exportAsset(this.paramsPagination).subscribe((result) => {
      download(result);
    });
  }

  pageChanged(event: PageChangedEvent): void {
    if (event) {
      this.page_number = event.page;
      this.onList();
    }
  }

  changeAction(item: any) {
    switch (item.action) {
      case 'search':
        this.paramsFilter = item.values;
        this.onList();
        break;
      case 'new':
        this.modalNew();
        break;
      case 'sync':
        this.openSync();
        break;
      case 'qr':
        this.generateQR();
        break;
      case 'export':
        this.paramsFilter = item.values;
        this.onExportExcel();
        break;
      default:
        break;
    }
  }
  getDepreciateStatus(state: string) {
    return this.depreciateStatus.find((e) => e.id == state)?.id;
  }
}
