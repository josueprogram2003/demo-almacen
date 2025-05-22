import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Pagination, Response } from '../../models/paginationResponse.model';

@Injectable({
  providedIn: 'root'
})
export class SubdiaryService {

  constructor(private http:HttpClient) { }
  get(params: any) {
    let param = new HttpParams()
    .set('tkey', params.tkey ?? '')
    .set('description', params.description ?? '')
    .set('page', params.page)
    .set('size', params.size);
    const endpoint = `${environment.url}${environment.api.main}/subdiary/filter`;
    return this.http.get<Response<Pagination<any>>>(endpoint, { params: param });
  }

  getSynchronize(params: any) {
    const endpoint = `${environment.url}${environment.api.main}/subdiary/subdiary-concar`;
    return this.http.get<Response<any>>(endpoint, { params: params });
  }

  putShorDescription(id: string, body:any) {
    const endpoint = `${environment.url}${environment.api.main}/subdiary/short-description/${id}`;
    return this.http.put(endpoint, body);
  }

  postSynchronize(body:any) {
    const endpoint = `${environment.url}${environment.api.main}/subdiary/sync`;
    return this.http.post(endpoint, body);
  }
}
