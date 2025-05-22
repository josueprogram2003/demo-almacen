import { CommonModule } from '@angular/common';
import { Component, type OnInit, forwardRef, Input } from '@angular/core';
import { AbstractControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormGroupComponent } from '../form-group/form-group.component';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FormGroupComponent
  ],
})
export class SearchInputComponent implements OnInit {
  /**
* Set <label> text
*/
  @Input() label: string = "";

  /**
   * Set disabled attribute
   */
  @Input() disable: boolean = false;

  /**
   * Show (*) symbol before <label>
   */
  @Input() requiredSymbol: boolean = false;

  /**
   * Set custom classes to Search <button>
   */
  @Input() buttonClass: string = "";

  /**
   * Set custom classes to <div class="form-group">
   */
  @Input() formGroupClass?: AbstractControl;

  ngOnInit(): void {
  }


}
