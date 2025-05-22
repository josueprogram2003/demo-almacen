import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormsModule } from '@angular/forms';
@Component({
  selector: 'adra-form-group',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './form-group.component.html',
  styleUrl: './form-group.component.scss'
})
export class FormGroupComponent implements OnInit {

  @Input() control?: AbstractControl;

  @Input() label?: string;

  @Input() requiredSymbol = false;

  ngOnInit(): void {
  }
}
