import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Pagination } from '../../../../../../core/models/paginationResponse.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  @Input() accountingEntry!: Pagination<any>
  @Output() evenPaginate = new EventEmitter<number>();
  @Output() evenUpdatedAccountingEntry = new EventEmitter<any>();
  @Output() evenViewFile = new EventEmitter<any>();
  @Output() evenModal = new EventEmitter<any>();
  @Output() evenReview = new EventEmitter<any>();

  pageChanged(event: any): void {
    this.evenPaginate.emit(event.page);
  }
  onUpdatedAccountingEntry(id:string,shortDescription:string,detail:string ): void {
    this.evenUpdatedAccountingEntry.emit({id,shortDescription,detail});
  }
  onViewFile(data: any): void {
    this.evenViewFile.emit(data);
  }
  onModal(id:string,year:number,month:number): void {
    this.evenModal.emit({id,year,month});
  }
  onChangeReview(id: string, review: boolean): void {
    this.evenReview.emit({id, review});
  }
}
