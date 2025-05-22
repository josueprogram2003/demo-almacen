import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Filter } from '../../models/filter.model';
import { CountAccountandCostCenterExonerated } from '../../models/costCenter.model';

@Injectable({providedIn: 'root'})
export class CountAccountCostCenterExoneratedService  {
  constructor(private http: HttpClient) {}
  getCountAccountandExoneratedCostCenter(filter?:Filter): Observable<any[]> {
    let params = new HttpParams()
      .set('pageNumber', filter?.pageNumber!)
      .set('size', filter?.size!);
    return this.http.get<any[]>(
      `${environment.url}${environment.api.main}${environment.api.accountCostCenterExonerated}`,{params:params}
    );
  }
  getCountAccountandExoneratedCostCenterById(id: string): Observable<CountAccountandCostCenterExonerated> {
    return this.http.get<CountAccountandCostCenterExonerated>(
      `${environment.url}${environment.api.main}${environment.api.accountCostCenterExonerated}/${id}`
    );
  }
  postCountAccountandExoneratedCostCenter(body: CountAccountandCostCenterExonerated): Observable<CountAccountandCostCenterExonerated> {
    return this.http.post<CountAccountandCostCenterExonerated>(
      `${environment.url}${environment.api.main}${environment.api.accountCostCenterExonerated}`, body
    );
  }
  putCostCenterExoneratedCostCenter(body: CountAccountandCostCenterExonerated): Observable<CountAccountandCostCenterExonerated> {
    return this.http.post<CountAccountandCostCenterExonerated>(
      `${environment.url}${environment.api.main}${environment.api.accountCostCenterExonerated}`, body
    );
  }
  deleteCountAccountandExoneratedCostCenter(id: string): Observable<CountAccountandCostCenterExonerated> {
    return this.http.delete<CountAccountandCostCenterExonerated>(
      `${environment.url}${environment.api.main}${environment.api.accountCostCenterExonerated}/${id}`
    );
  }

}
