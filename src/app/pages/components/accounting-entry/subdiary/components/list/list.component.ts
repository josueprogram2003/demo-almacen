import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from '../../../../../../core/models/paginationResponse.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  @Input() subdiaries?: Pagination<any>;
  @Output() evenPaginate = new EventEmitter<number>();
  @Output() evenUpdate = new EventEmitter<any>();

  pageChanged(event: any): void {
 this.evenPaginate.emit(event.page);
  }
  onUpdate(id: string, shortDescription: string) {
    this.evenUpdate.emit({ id, shortDescription });
  }
}
