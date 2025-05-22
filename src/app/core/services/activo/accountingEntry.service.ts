import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Pagination, Response } from '../../models/paginationResponse.model';
import { depreciationEntry } from '../../models/depreciation-entry.model';
import { ActivoDepresiation } from '../../models/activoDepresiation.model';
import { AccountingDetail } from '../../models/accountingDetail.model';

@Injectable({
  providedIn: 'root'
})
export class AccountingEntryService {

  companyId: string | null = sessionStorage.getItem('companyId');

  constructor(private http: HttpClient) { }


  getaccountingEntry(params: any) {
    const endpoint = `${environment.url}${environment.api.main}/accounting-entry/company/${this.companyId}`;
    return this.http.get<Response<Pagination<depreciationEntry[]>>>(endpoint, { params: params })
  }

  getaccountingEntryDepreciton(params: any) {
    const endpoint = `${environment.url}${environment.api.main}/accounting-entry/depreciation/company/${this.companyId}`;
    return this.http.get<ActivoDepresiation>(endpoint, { params: params });
  }

   getaccountingEntryDeprecitonExport(params: any) {
    const endpoint = `${environment.url}${environment.api.main}/accounting-entry/depreciation/company/${this.companyId}/export`;
    return this.http.get(endpoint, {params:params, responseType:'blob'});
  }

  deleteAccountingEntry(id: string) {
    const endpoint = `${environment.url}${environment.api.main}/accounting-entry/${id}/revert`;
    return this.http.put<any[]>(endpoint, {});
  }

  getAccountingEntryDetailsById(id: string, params: any) {
    const endpoint = `${environment.url}${environment.api.main}/accounting-entry/${id}/detail`;
    return this.http.get<Response<AccountingDetail[]>>(endpoint, { params: params });
  }

  postaccountingHeader(body: any) {
    const endpoint = `${environment.url}${environment.api.main}/accounting-entry`;
    return this.http.post<any[]>(endpoint, body);
  }


  getAccountingEntryDetailGrouped(id:string){
    const endpoint = `${environment.url}${environment.api.main}/accounting-entry/${id}/detail/grouped`;
    return this.http.get<Response<any[]>>(endpoint);
  }

  putAccountingEntryUploadtoConcar(id:string, body:any){
     const endpoint = `${environment.url}${environment.api.main}/accounting-entry/${id}/upload-to-concar`;
    return this.http.put<any>(endpoint,body);
  }


}
