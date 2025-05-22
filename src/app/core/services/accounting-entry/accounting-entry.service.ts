import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Pagination, Response } from '../../models/paginationResponse.model';
import { AccountingEntryFilter } from '../../models/accountingEntry.model';
@Injectable({
  providedIn: 'root'
})
export class AccountingEntryService {

  constructor(private http:HttpClient) { }

  getAccountingEntry(filter:AccountingEntryFilter) {
    let params = new HttpParams()
    .set('year', filter.year??0)
    .set('month', filter.month??0)
    .set('project', filter.project??'')
    .set('state', filter.state??0)
    .set('username', filter.username??'')
    .set('seat', filter.seat??'')
    .set('lastDigitSeat', filter.lastDigitSeat??0)
    .set('page', filter.page??'')
    .set('size', filter.size??'');
    const endpoint = `${environment.url}${environment.api.main}/digital-accounting/filter`;
    return this.http.get<Response<Pagination<any>>>(endpoint, { params: params });
  }
  getAccountingEntryIndicators(filter:AccountingEntryFilter) {
    let params = new HttpParams()
    .set('year', filter.year??0)
    .set('month', filter.month??0)
    .set('project', filter.project??'')
    .set('state', filter.state??0)
    .set('username', filter.username??'')
    .set('seat', filter.seat??'')
    .set('lastDigitSeat', filter.lastDigitSeat??0)
    .set('page', filter.page??'')
    .set('size', filter.size??'');
    const endpoint = `${environment.url}${environment.api.main}/digital-accounting/indicators`;
    return this.http.get<Response<any>>(endpoint, { params: params });
  }

  getCompareAccountIngentries(params: any): Observable<Response<any>> {
    return this.http.get<Response<any>>(`${environment.url}${environment.api.main}/digital-accounting/information-accounting`, { params: params });
  }
  postCompareAccountIngentriesSync(body: any[]): Observable<any> {
    return this.http.post<any>(`${environment.url}${environment.api.main}/digital-accounting/sync`, body);
  }
  putFields(id: string, body: any) {
    const endpoint = `${environment.url}${environment.api.main}/digital-accounting/${id}/company/${sessionStorage.getItem('companyId')}`;
    return this.http.put<any>(endpoint, body);
  }
  downloadFile(objectKey: string) {
    const endpoint = `${environment.url}${environment.api.main}/digital-accounting/download`;
    return this.http.get(endpoint, {
      responseType: 'blob',
      params: { objectKey: objectKey }
    });
  }
  putReview(id: string, data: any) {
    const body = {
      review: data
    }
    const endpoint = `${environment.url}${environment.api.main}/digital-accounting/${id}/change-review`;
    return this.http.put<any>(endpoint, body);
  }
  postFiles(file: File[], year: string) {
    const formData: FormData = new FormData();
    file.forEach((file) => formData.append('files', file, file.name));
    formData.append('year', year)
    const endpoint = `${environment.url}${environment.api.main}/digital-accounting/upload-files`;
    return this.http.post<any>(endpoint, formData);
  }
  postFile(files: File[],fileNames:string[], month: number, year: number, id:any) {
    const request={
      year:year,
      month:month ?? 0,
      fileNames:fileNames,
      id:id
    }
    const formData: FormData = new FormData();
    files.forEach((file) => formData.append('files', file, file.name));
    formData.append('request', JSON.stringify(request));
/*     formData.append('file', file, file.name) */
    const endpoint = `${environment.url}${environment.api.main}/digital-accounting/upload`;
    return this.http.post<any>(endpoint, formData);
  }
  putFileName(id: string, body: any) {
    const endpoint = `${environment.url}${environment.api.main}/digital-accounting/fileName/${id}`;
    return this.http.put<any>(endpoint, body);
  }
}
