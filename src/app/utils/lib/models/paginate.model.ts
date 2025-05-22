export interface Paginate<T> {
  content?: T[];
  pageable?: Pageable;
  sort?: Sort;
  last?: boolean;
  first?: boolean;
  totalPages?: number;
  totalElements?: number;
  numberOfElements?: number;
  number?: number;
  size?: number;
  empty?: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}
export interface Response<T> {
  status: string;
  message: string;
  data: T
}
export interface Pagination<T>{
  content: T,
  page: number,
  pageSize: number,
  totalItems: number,
}

export interface PaginationQuarkus<T>{
  content: T,
  page: number,
  pageSize: number,
  totalItems: number,
}
