import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ModalPreviewFileComponent } from '../../../../../../../shared/components/modal-preview-file/modal-preview-file.component';
import { Asset } from '../../../../../../../core/models/asset.model';


@Component({
  selector: 'app-modal-code',
  templateUrl: './modal-code.component.html',
  styleUrl: './modal-code.component.scss',
})
export class ModalCodeComponent implements OnInit {
  title!: string;
  isLoading: boolean = false;
  formGroup: FormGroup = new FormGroup({});
  date: Date = new Date();

  data!: Asset;
  @ViewChild('pdfTable') pdfTable: ElementRef | undefined;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {
    this.formGroup = this.fb.group({
      contador: [1, []],
    });
  }

  ngOnInit(): void {}

  print() {
    const pdfTable = this.pdfTable?.nativeElement;
    const contador = Math.max(this.formGroup.value.contador || 1, 1); // Mínimo 1

    html2canvas(pdfTable, {
      useCORS: true,
      scale: 2,
      logging: true,
      backgroundColor: '#ffffff', // Fondo blanco
    }).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [50.8, 25.4],
      });

      for (let index = 0; index < contador; index++) {
        const pageWidth = pdf.internal.pageSize.getWidth(); // Ancho de la página
        const pageHeight = pdf.internal.pageSize.getHeight(); // Altura de la página

        const widthRatio = pageWidth / canvas.width;
        const heightRatio = pageHeight / canvas.height;
        const ratio = Math.min(widthRatio, heightRatio);

        const canvasWidth = canvas.width * ratio;
        const canvasHeight = canvas.height * ratio;

        const marginX = (pageWidth - canvasWidth) / 2;
        const marginY = (pageHeight - canvasHeight) / 2;

        pdf.addImage(
          contentDataURL,
          'PNG',
          marginX,
          marginY,
          canvasWidth,
          canvasHeight
        );

        if (index + 1 < contador) {
          pdf.addPage();
        }
      }

      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Abrir modal con el PDF generado
      ModalPreviewFileComponent.prototype.src = pdfUrl;
      ModalPreviewFileComponent.prototype.type = 'pdf';
      this.modalService.open(ModalPreviewFileComponent, {
        backdrop: 'static',
        keyboard: false,
        size: 'lg',
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
      });
    });
  }

  onGuardar() {}
}
