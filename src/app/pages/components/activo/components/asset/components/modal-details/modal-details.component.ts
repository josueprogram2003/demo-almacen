import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.component.html',
  styleUrl: './modal-details.component.scss'
})
export class ModalDetailsComponent implements OnInit {
  zoom: number = 1;
  public src: any;
  urlSafe: SafeResourceUrl | undefined;
  data: any;
  isLoading:boolean = false;
  formGroup: FormGroup = new FormGroup({});
  constructor(public activeModal: NgbActiveModal, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if (this.src == undefined) {
      this.src =
        'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
    }
    this.urlSafe = this.getlink(this.src)
  }



  getlink(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
