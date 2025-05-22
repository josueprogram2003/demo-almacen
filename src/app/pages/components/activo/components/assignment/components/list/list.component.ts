import { Component, Input, OnInit } from '@angular/core';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalReturnComponent } from '../modal-return/modal-return.component';
import { TreeNode } from 'primeng/api';
import moment from 'moment';
import { ModalDetailsComponent } from '../../../asset/components/modal-details/modal-details.component';
import { BehaviorSubject } from 'rxjs';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalApprovedComponent } from '../modal-approved/modal-approved.component';
import { ModalAssignmentComponent } from '../../../asset/components/modal-assignment/modal-assignment.component';
import { ExportDocService } from '../../../../../../../core/services/assignment/exportDoc.service';
import { FileService } from '../../../../../../../core/services/file.service';
import { pdfAssigmentService } from '../../../../../../../core/services/activo/pdfAssigment.service';
import { AsignacionService } from '../../../../../../../core/services/activo/asignacion.service';
import { AssetEmployee } from '../../../../../../../core/models/assetEmployee.model';
import { NotificationUtilService } from '../../../../../../../shared/services/notification-util.service';
import { ModalPreviewFileComponent } from '../../../../../../../shared/components/modal-preview-file/modal-preview-file.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  data: AssetEmployee[] = [];
  dataTransform: TreeNode[] = [];
  paramsFilter: { employeeId: string, fullName: string } = { employeeId: '', fullName: '' };
  page_size: number = 10;
  page_number: number = 1;
  code: string = '';
  description: string = '';
  paramsPagination: any = {
    page: this.page_number,
    size: this.page_size,
  }
  state: number = 1;

  page: number = 1;
  pageSize: number = 10;
  maxSize: number = 3;
  _details$ = new BehaviorSubject<AssetEmployee[]>([]);
  _total$ = new BehaviorSubject<number>(0);
  employee: any;


  @Input() set params(values: any) {
    if (values) {
      this.changeAction(values)
    }
  }

  constructor(private service: AsignacionService, private notificationService: NotificationUtilService, private modalService: NgbModal, private file: FileService, private servicePDF: pdfAssigmentService, private spinner: NgxSpinnerService, private serviceDoc: ExportDocService) { }

  ngOnInit(): void {
  }
  onList() {
    const { employeeId } = this.paramsFilter;
    const params = {
      employeeId: employeeId,
      state: this.state,
    }
    this.spinner.show();
    this.service.getAssigment(params).subscribe((res:any) => {
      this.data = res.data;
 /*      if (this.data.length > 0) {
        this.employee = this.data[0];
        if (this.employee.assetId==null) {
          this.data.splice(0, 1);
        }
      } */
      this.changeDatalist();
      this.changePagination()
      this.spinner.hide();
    })
  }

  onSearch() {
    const { employeeId } = this.paramsFilter;
    const params = {
      employeeId: employeeId,
      state: this.state,
      code: this.code,
      description: this.description
    }
    this.spinner.show();
    this.service.getAssigment(params).subscribe((res:any) => {
      this.data = res.data;
      this.changeDatalist();
      this.changePagination()
      this.spinner.hide();
    })
  }

  select(item: number) {
    this.state = item;
    this.onList();
  }

  changeDatalist() {
    this.data = this.data.map((r) => {
      var temp = Object.assign({}, r);
      temp.files = temp.files.map((e:any) => ({
        ...e,
        icon: this.file.getIcon(this.file.getExtencion(e.name)),
      }))
      return temp;
    })

  }

  modalNew() {
    ModalFormComponent.prototype.date_string = "Fecha de asignación";
    ModalFormComponent.prototype.title = "Asignar activos";
    ModalFormComponent.prototype.data = this.paramsFilter;
    this.modalService.open(ModalFormComponent, {
      backdrop: 'static',
      keyboard: false,
      size: "xl"
    }).closed.subscribe((res:any) => {
      if (res) {
        this.onList();
        this.notificationService.configToast(
          'Realizado correctamente', 'toast-success'
        );
      }
    });


  }

  removeAssignation(item: AssetEmployee) {
    if (item != undefined) {
      this.service.getAssetNewById(item.assetId).subscribe((res:any) => {
        ModalReturnComponent.prototype.title = "Devolver activos";
        ModalReturnComponent.prototype.data = { ...res.data, id: item.id, employeeId: item.employeeId, employeeName: item.employeeName, assetId: res.data.id };
        this.modalService.open(ModalReturnComponent, {
          backdrop: 'static',
          keyboard: false,
          size: "xl"
        }).closed.subscribe((data:any) => {
          if (data) {
            this.onList();
            this.notificationService.configToast(
              'Realizado correctamente', 'toast-success'
            );
          }
        });
      })
    }
  }

  async generatepdf() {
    const { employeeId } = this.paramsFilter;
    const assignments = (await this.service.asyncAssigment({
      employeeId: employeeId,
      state: 1,
    }))?.data.filter((item: any) => item.assetId != null);
    const returns = (await this.service.asyncAssigment({
      employeeId: employeeId,
      state: 2,
    }))?.data.filter((item: any) => item.assetId != null);
    if (employeeId) {
      this.employee = (await (this.service.getEmployeeById(employeeId)))?.data;
      const assignment = {
        ...this.paramsFilter,
        assignments: assignments,
        returns: returns,
        employee: this.employee,
      }
      const url = await this.servicePDF.viewPdfModal(assignment);
      ModalDetailsComponent.prototype.src = url;
      this.modalService.open(ModalDetailsComponent, {
        backdrop: 'static',
        keyboard: false,
        size: "xl"
      })
    }

  }


  open(file: any) {
    const { name, type, objectKey } = file;
    if (name != null) {
      if (objectKey != null) {
        try {
          const json = {
            objectKey: objectKey,
          }
          this.service.getAssetPreviewFile(json).subscribe((blob:any) => {
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

  changePagination() {
    this.setPagination();
  }
  setPagination() {
    const details = this.data;
    const total = this.data.length;
    let observation_details = this.data;
    let startIndex = ((this.page - 1) * this.pageSize) + 1;
    let endIndex = ((this.page - 1) * this.pageSize) + this.pageSize;
    if (endIndex > total) {
      endIndex = total;
    }
    observation_details = details.slice(
      startIndex - 1, endIndex
    )
    this._details$.next(observation_details);
    this._total$.next(total)
  }
  pageChanged(event: PageChangedEvent): void {
    if (event) {
      this.page = event.page;
      this.setPagination();
    }
  }

  changeIsApproved(item: AssetEmployee) {

    if (item != null) {
      ModalApprovedComponent.prototype.title = 'Estado de recepción';
      ModalApprovedComponent.prototype.item = item;
      ModalApprovedComponent.prototype.state = 1;
      this.modalService.open(ModalApprovedComponent, {
        backdrop: 'static',
        keyboard: false,
        size: "xl"
      }).closed.subscribe((res:any) => {
        if (res) {
          this.onList();
          this.notificationService.configToast(
            'Realizado correctamente', 'toast-success'
          );
        }
      });
    }
  }

  changeIsReturn(item: AssetEmployee) {
    if (item != null) {
      ModalApprovedComponent.prototype.title = 'Estado devolución';
      ModalApprovedComponent.prototype.item = item;
      ModalApprovedComponent.prototype.state = 2;
      this.modalService.open(ModalApprovedComponent, {
        backdrop: 'static',
        keyboard: false,
        size: "xl"
      }).closed.subscribe((res:any) => {
        if (res) {
          this.onList();
          this.notificationService.configToast(
            'Realizado correctamente', 'toast-success'
          );
        }
      });
    }


  }

  changeAssignmentV2(item: AssetEmployee) {
    if (item?.assetId) {
      this.service.getAssetByIdActive(item.asset.id).subscribe((res:any) => {
        const { employeeId } = res.data;
        if(employeeId!=null){
          this.notificationService.configToast(
            'Activo ya asignado', 'toast-warning'
          );
        }else{
          ModalAssignmentComponent.prototype.title = "Asignar activo";
          ModalAssignmentComponent.prototype.data = res.data;
          this.modalService.open(ModalAssignmentComponent, {
            backdrop: 'static',
            keyboard: false,
            size: "xl"
          }).closed.subscribe((res:any) => {
            if (res) {
              this.onList();
              this.notificationService.configToast(
                'Realizado correctamente', 'toast-success'
              );
            }
          });
        }
      }, () => {
        this.notificationService.configToast(
          'Activo no disponible', 'toast-error'
        );
      });
    }
  }

  exportExcel() {
    const { employeeId } = this.paramsFilter;
    const params = {
      employeeId: employeeId,
    }
    this.service.getAssigmentExport(params).subscribe((res:any) => {
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `activos_${moment().format('YYYYMMDD_HHmmss')}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
    })
  }

  changeAction(item: any) {
    switch (item.action) {
      case 'search':
        this.paramsFilter = item.values;
        this.onList();
        break;
      case 'new':
        this.paramsFilter = item.values;
        this.modalNew();
        break;
      case 'pdf':
        this.paramsFilter = item.values;
        this.generatepdf();
        break;
      case 'export':
        this.paramsFilter = item.values;
        this.exportExcel();
        break;
      default:
        break;
    }
  }

}
