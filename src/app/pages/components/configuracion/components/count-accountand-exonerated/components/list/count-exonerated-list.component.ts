import { on } from '@ngrx/store';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from '../../../../../../../utils';
// import { Paginate, Pagination } from '@nx-angular/utils';

@Component({
  selector: 'app-count-exonerated-list',
  templateUrl: './count-exonerated-list.component.html',
})
export class CountExoneratedListComponent {
  @Input() countExoneratedData: Pagination<any> = {
    content: [],
    page: 0,
    pageSize: 0,
    totalItems: 0,
  };
  @Output() evenPaginate = new EventEmitter<number>();
  @Output() evenEdit= new EventEmitter<string>();
  @Output() evenDelete= new EventEmitter<string>();
  pageChanged(event: any): void {
    this.evenPaginate.emit(event.page);
  }
  onEdit(id: string){
    this.evenEdit.emit(id);
  }
  onDelete(id: string){
    this.evenDelete.emit(id);
  }
}
