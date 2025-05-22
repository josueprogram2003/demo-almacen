import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, type OnInit } from '@angular/core';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ngx-pagination',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PaginationModule
  ],
  templateUrl: './ngx-pagination.component.html',
  styleUrl: './ngx-pagination.component.scss',
})
export class NgxPaginationComponent implements OnInit {

  @Output() pageChange = new EventEmitter<any>();
  @Input() currentPage: number = 1;
  @Input() pagination?: PaginationSpring;
  maxSize: number = 3;


  ngOnInit(): void { }


  pageChanged(event: PageChangedEvent): void {
    if (event.page != this.currentPage) {
      this.pageChange.emit(event);
    }
  }

}


export interface Sort {
  sorted?: boolean;
  unsorted?: boolean;
  empty?: boolean;
}

export interface Pageable {
  sort?: Sort;
  offset?: number;
  pageSize?: number;
  pageNumber?: number;
  paged?: boolean;
  unpaged?: boolean;
}

export interface PaginationSpring {
  content?: any;
  pageable?: Pageable;
  totalElements?: number;
  last?: boolean;
  totalPages?: number;
  number?: number;
  size?: number;
  sort?: Sort;
  numberOfElements?: number;
  first?: boolean;
  empty?: boolean;
}

