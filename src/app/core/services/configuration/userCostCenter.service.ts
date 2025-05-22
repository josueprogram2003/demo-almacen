
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Pagination, User } from '../../../utils';
import { Filter } from '../../models/filter.model';
import { UserAutocomplete, UserCostCenterDetail } from '../../models/user-cost-center';


@Injectable({
  providedIn: 'root',
})
export class UserCostCenterService {
  constructor(private http: HttpClient) {}
  getUsersCostCenterByCompany(filter?: Filter): Observable<Pagination<any>> {
    let params = new HttpParams()
      .set('pageNumber', filter?.pageNumber! - 1)
      .set('size', filter?.size!)
      .set('name', filter?.name! || '');
    return this.http.get<Pagination<any>>(
      `${environment.url}${environment.api.main}${
        environment.api.userCostCenter
      }/company/${sessionStorage.getItem('companyId')}`,
      { params: params }
    );
  }
  getCosCentersByUser(id: string): Observable<UserCostCenterDetail[]> {
    return this.http.get<UserCostCenterDetail[]>(
      `${environment.url}${environment.api.main}${environment.api.userCostCenter}/${id}/detail`
    );
  }
  public getUsersByName(name: string): Observable<any[]> {
    let params = new HttpParams().set('name', name);
    return this.http
      .get<UserAutocomplete[]>(
        `${environment.url}${environment.api.main}/user/autocomplete`,
        { params: params }
      )
      .pipe(
        map((data: UserAutocomplete[]) => {
          return data.map((res: UserAutocomplete) => ({
            name: res.name,
            user: res.username,
            userId: res.id,
            userFullName: res.noUser,
            idPerson: res.idPerson,
            search: res.username + ' ' + res.noUser,
            companyId: sessionStorage.getItem('companyId') || '',
            details: [],
          }));
        })
      );
  }

  postUserCostCenter(body: any): Observable<User> {
    return this.http.post<User>(
      `${environment.url}${environment.api.main_budget}${environment.api.userCostCenter}`,
      body
    );
  }
  postUserCostCenterDetail(body: any): Observable<any> {
    return this.http.post<any>(
      `${environment.url}${environment.api.main}${environment.api.userCostCenter}/detail`,
      body
    );
  }
  deleteCostCenterDetail(id: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.url}${environment.api.main}${environment.api.userCostCenter}/detail/${id}`
    );
  }
  /*
  putCostCenterExonerated(body: CountAccountandExonerated): Observable<CountAccountandExonerated> {
    return this.http.post<CountAccountandExonerated>(
      `${environment.api.url}${environment.api.main}${environment.api.costCenterExonerated}`, body
    );
  }
  deleteCountAccountandExonerated(id: string): Observable<CountAccountandExonerated> {
    return this.http.delete<CountAccountandExonerated>(
      `${environment.api.url}${environment.api.main}${environment.api.costCenterExonerated}/${id}`
    );
  } */
}
