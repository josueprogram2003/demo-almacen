import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { Asset } from "../../models/asset.model";
import { PurchaseOrder } from "../../models/purchaseOrder.model";
import { Pagination, Response } from "../../models/paginationResponse.model";
import { Assigned } from "../../models/assigned.model";
import { AssetEmployee, AssigmentPlaceholder } from "../../models/assetEmployee.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {
  companyId: string|null = sessionStorage.getItem('companyId');

  constructor(private http: HttpClient) { }

  getEmployee(value: string) {
    const endpoint = `${environment.url_gth}${environment.api.main_gth}/employee/employee-file-access/company/${this.companyId}/search?value=${value}`
    return this.http.get<Response<any[]>>(endpoint).pipe(map((response)=>response.data));
  }

  getPurchaseOrder(value: string) {
    const endpoint = `${environment.url}${environment.api.main}/asset/order/${value}`;
    return this.http.get<Response<PurchaseOrder[]>>(endpoint).pipe(map((e)=>e.data.map((e:any)=>({...e, namePurchaseOrder: e.serie+'-'+e.number}))));
  }

  getAssetNew(params:any) {
    const endpoint = `${environment.url}${environment.api.main}/asset/company/${this.companyId}`;
    return this.http.get<Response<Pagination<Asset[]>>>(endpoint, {params:params});
  }

  getAssetNewById(id: string) {
    const endpoint = `${environment.url}${environment.api.main}/asset/${id}`;
    return this.http.get<Response<Asset>>(endpoint);
  }

  getAssetByIdActive(id: string){
    const endpoint = `${environment.url}${environment.api.main}/asset/${id}/active`;
    return this.http.get<Response<Asset>>(endpoint);
  }



  getAssetAvailable(){
    const endpoint = `${environment.url}${environment.api.main}/asset/company/${this.companyId}/available`;
    return this.http.get<Response<Asset[]>>(endpoint);
  }

  exportAsset(params:any){
    const endpoint = `${environment.url}${environment.api.main}/asset/company/${this.companyId}/export`;
    return this.http.get(endpoint, {params:params, responseType:'blob'});
  }

  postAssetNew(body: any) {
    const endpoint = `${environment.url}${environment.api.main}/asset`;
    return this.http.post<any>(endpoint, body);
  }
  putAssetNew(body: any, id:string) {
    const endpoint = `${environment.url}${environment.api.main}/asset/${id}`;
    return this.http.put<any[]>(endpoint, body);
  }

  deleteAssetNew(id:string) {
    const endpoint = `${environment.url}${environment.api.main}/asset/${id}`;
    return this.http.delete<any[]>(endpoint);
  }

  getAssetPreviewFile(params: any) {
    const endpoint = `${environment.url}${environment.api.main}/asset/download`;
    return this.http.get(endpoint, { responseType: 'blob', params: params, });
  }

  getAssetDepreciation(){
     const endpoint = `${environment.url}${environment.api.main}/asset/depreciation/company/${this.companyId}`;
    return this.http.get<any[]>(endpoint);
  }


  getAssetEmployee(params:{},employeeId:string) {
    const endpoint = `${environment.url}${environment.api.main}/asset/company/${this.companyId}/employee/${employeeId}`;
    return this.http.get<Assigned[]>(endpoint,{params:params});
  }

  getAssigment(params:any){
    const endpoint = `${environment.url}${environment.api.main}/assignment/company/${this.companyId}`
    return this.http.get<Response<AssetEmployee[]>>(endpoint, {params:params});
  }
  getAssigmentExport(params:any){
    const endpoint = `${environment.url}${environment.api.main}/assignment/company/${this.companyId}/export`
    return this.http.get(endpoint, {params:params,responseType:'blob'});
  }



  getAssigmentDocLoan(id:string, type:string){
    const params = {
      type:type,
    }
    const endpoint = `${environment.url}${environment.api.main}/assignment/format-lend/${id}`
    return this.http.get(endpoint,{params:params,responseType:'blob'});
  }


  getAssigmentDocReturn(id:string, type:string){
    const params = {
      type:type,
    }
    const endpoint = `${environment.url}${environment.api.main}/assignment/format-lend/${id}`
    return this.http.get(endpoint,{params:params,responseType:'blob'});
  }

  getAssigmentDocDowloand(objectKey:string){
    const params = {
      objectKey:objectKey
    }
    const endpoint = `${environment.url}${environment.api.main}/assignment/format-lend/download`
    return this.http.get(endpoint,{params:params,responseType:'blob'});
  }

  getassignmentPlaceholders(id:string){
    const endpoint = `${environment.url}${environment.api.main}/assignment/${id}/placeholders`
    return this.http.get<AssigmentPlaceholder>(endpoint);
  }

  getHistoryAssigment(id:string){
    const endpoint = `${environment.url}${environment.api.main}/assignment/history/${id}`
    return this.http.get<Response<AssetEmployee[]>>(endpoint);
  }




  putIsApprovedAssigment(id:string, params:any){
    const endpoint = `${environment.url}${environment.api.main}/assignment/${id}/approved`
    return this.http.put(endpoint,params);
  }


  asyncAssigment(params:any){
    const endpoint = `${environment.url}${environment.api.main}/assignment/company/${this.companyId}`
    return this.http.get<Response<AssetEmployee[]>>(endpoint, {params:params}).toPromise();
  }

  getAssetEmployeeById(id:string){
    const endpoint = `${environment.url}${environment.api.main}/assignment/${id}`;
    return this.http.get<Response<Assigned>>(endpoint);
  }

  postAssetEmployee(body: any) {
    const endpoint = `${environment.url}${environment.api.main}/assignment`;
    return this.http.post<any[]>(endpoint, body);
  }

  putAssetEmployee(body: any,id:string) {
    const endpoint = `${environment.url}${environment.api.main}/assignment/return/${id}`;
    return this.http.put<any[]>(endpoint, body);
  }

  getAllCodesAsset(code:string){
    const params = {
      code: code
    }
     const endpoint = `${environment.url}${environment.api.main}/asset/codes/all`;
    return this.http.get<String[]>(endpoint,{params:params});
  }

  getAllSeriesAsset(serialNumber:string){
    const params = {
      serialNumber:serialNumber,
    }
    const endpoint = `${environment.url}${environment.api.main}/asset/series/all`;
    return this.http.get<String[]>(endpoint,{params:params});
  }

  getAllDescriptionsAsset(description:string){
    const params = {
      description:description,
    }
    const endpoint = `${environment.url}${environment.api.main}/asset/descriptions/all`;
    return this.http.get<String[]>(endpoint,{params:params});
  }

  getEmployeeById(id:string){
    const endpoint = `${environment.url_gth}${environment.api.main_gth}/employee/${id}`;
    return this.http.get<Response<any>>(endpoint).toPromise();
  }

}

