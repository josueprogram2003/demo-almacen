import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-count-exonerated-cost-center-list',
  templateUrl: './count-exonerated-cost-center-list.component.html',
})
export class CountExoneratedCostCenterListComponent {
  @Input() countExoneratedCostCenterData: any[] = [];
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
