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
