import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
type accept_string = 'pdf' | 'image';

@Component({
  selector: 'app-modal-preview-file',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './modal-preview-file.component.html',
  styleUrl: './modal-preview-file.component.scss',
})
export class ModalPreviewFileComponent implements OnInit {
  @Input() zoom: number = 1;
  @Input() title: string = 'Previsualización';
  @Input() type!: accept_string;
  @Input() src: any;
  @Input() name?:string;
  urlSafe!: SafeResourceUrl;

  constructor(public activeModal: NgbActiveModal, public sanitizer: DomSanitizer){}

  ngOnInit(): void {
    if (this.type == 'pdf') {
      if (this.src == undefined) {
        this.src =
          'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
      }
      this.urlSafe = this.getlink(this.src)
    }

  }

  downloadPdf() {
    const a = document.createElement('a');
    a.href = this.src;
    a.download = `${this.name}.pdf`;
    a.click();
  }

  onResize(data: string) {
    if (data == '-') this.zoom -= 0.1;
    if (data == '+') this.zoom += 0.1;
  }

  getlink(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
