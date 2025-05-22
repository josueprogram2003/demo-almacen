import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, type OnInit } from '@angular/core';

@Component({
  selector: 'app-active-status',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './active-status.component.html',
  styleUrl:'./active-status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveStatusComponent implements OnInit {

  ngOnInit(): void { }
  @Input() active: boolean = false;
}
