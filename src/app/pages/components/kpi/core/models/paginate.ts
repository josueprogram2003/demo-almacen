export interface Paginate {
    content:          any[];
    pageable:         Pageable;
    sort:             Sort;
    last:             boolean;
    first:            boolean;
    totalPages:       number;
    totalElements:    number;
    numberOfElements: number;
    number:           number;
    size:             number;
    empty:            boolean;
}

export interface Pageable {
    sort:       Sort;
    offset:     number;
    pageNumber: number;
    pageSize:   number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}