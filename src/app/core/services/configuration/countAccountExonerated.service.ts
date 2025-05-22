import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Filter } from '../../models/filter.model';
import { Pagination } from '../../../utils';
import { CountAccountandExonerated } from '../../models/costCenter.model';

@Injectable({
  providedIn: 'root',
})
export class CountAccountExoneratedService {
  constructor(private http: HttpClient) {}
  getCountAccountandExonerated(filter?:Filter): Observable<Pagination<any>> {
    let params = new HttpParams()
      .set('pageNumber', filter?.pageNumber!)
      .set('size', filter?.size!);
    return this.http.get<Pagination<any>>(
      `${environment.url}${environment.api.main}${environment.api.costCenterExonerated}`,{params:params}
    );
  }
  getCountAccountandExoneratedById(id: string): Observable<CountAccountandExonerated> {
    return this.http.get<CountAccountandExonerated>(
      `${environment.url}${environment.api.main}${environment.api.costCenterExonerated}/${id}`
    );
  }
  postCountAccountandExonerated(body: CountAccountandExonerated): Observable<CountAccountandExonerated> {
    return this.http.post<CountAccountandExonerated>(
      `${environment.url}${environment.api.main}${environment.api.costCenterExonerated}`, body
    );
  }
  putCostCenterExonerated(body: CountAccountandExonerated): Observable<CountAccountandExonerated> {
    return this.http.post<CountAccountandExonerated>(
      `${environment.url}${environment.api.main}${environment.api.costCenterExonerated}`, body
    );
  }
  deleteCountAccountandExonerated(id: string): Observable<CountAccountandExonerated> {
    let body = {
      deleted:true
    }
    return this.http.delete<CountAccountandExonerated>(
      `${environment.url}${environment.api.main}${environment.api.costCenterExonerated}/${id}`,{body:body}
    );
  }
}
