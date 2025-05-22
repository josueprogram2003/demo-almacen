import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CostCenter, CostCenterSync, SyncData } from '../../models/costCenter.model';


@Injectable({
  providedIn: 'root',
})
export class CostCenterService {
  constructor(private http: HttpClient) {}

  public getCostCenterByBusinessUnit(id:string, name?:string): Observable<CostCenter[]> {
    let params= new HttpParams().set('name',name?name:'')
    return this.http.get<CostCenter[]>(
      `${environment.url}${environment.api.main}${
        environment.api.costCenter
      }${environment.api.businessUnit}/${id}/search`,{params:params}
    );
  }
  public putChangeStatusCostCenter(code:string, state: boolean) {
    return this.http.put<any>(
      `${environment.url}${environment.api.main}${environment.api.costCenter}/change-state/${code}/cost-center`,
      { state: state }
    );
  }
  public getCompareCostCenter(): Observable<CostCenterSync[]> {
    const companyId = sessionStorage.getItem('companyId');
    return this.http.get<SyncData[]>(`${environment.url}${environment.api.main}/compare-cost-center/company/${companyId}`)
      .pipe(
        map((data: SyncData[]) => {
          return data.map((res: SyncData) => ({
            name: res.description,
            description: res.description,
            code: res.clave,
            companyId: companyId || '' // Fallback in case companyId is null
          }));
        })
      );
  }
  public postCostCenterSync(body: CostCenterSync[]): Observable<any> {
    return this.http.post<any>(
      `${environment.url}${environment.api.budget}/compare-cost-center/synchronize`,
      body
    );
  }
}
