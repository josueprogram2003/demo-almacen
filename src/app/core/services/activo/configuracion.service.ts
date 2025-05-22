import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Pagination, Response } from "../../models/paginationResponse.model";
import { Model } from "../../models/asset.model";
import { Account } from "../../models/account.model";
import { Brand } from "../../models/brand.model";
import { Group } from "../../models/groups.model";
import { Category } from "../../models/category.model";
import { Material } from "../../models/material.model";

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  companyId: string | null = sessionStorage.getItem('companyId');

  constructor(private http: HttpClient) { }

  getBrand(params:any) {
    const endpoint = `${environment.url}${environment.api.main}/brand/company/${this.companyId}`;
    return this.http.get<Response<Pagination<Brand[]>>>(endpoint,{params:params});
  }
   getBrandAll() {
    const endpoint = `${environment.url}${environment.api.main}/brand/company/${this.companyId}/all`;
    return this.http.get<Response<any>>(endpoint);
  }
  getBranId(id: string) {
    const endpoint = `${environment.url}${environment.api.main}/brand/${id}`;
    return this.http.get<Response<any>>(endpoint);
  }

  postBrand(body: any) {
    const endpoint = `${environment.url}${environment.api.main}/brand`;
    return this.http.post<any>(endpoint, body);
  }

  putBrand(body: any) {
    const endpoint = `${environment.url}${environment.api.main}/brand`;
    return this.http.put<any>(endpoint, body);
  }

  deleteBrand(id:string) {
    const endpoint = `${environment.url}${environment.api.main}/brand/${id}`;
    return this.http.delete<any>(endpoint);
  }

  getModel(params:any) {
    const endpoint = `${environment.url}${environment.api.main}/model`;
    return this.http.get<Response<Pagination<Model[]>>>(endpoint,{params:params});
  }

  getModelById(id: string) {
    const endpoint = `${environment.url}${environment.api.main}/model/${id}`;
    return this.http.get<Response<any>>(endpoint);
  }

  postModel(body: any) {
    const endpoint = `${environment.url}${environment.api.main}/model`;
    return this.http.post<any>(endpoint, body);
  }

  putModel(body: any) {
    const endpoint = `${environment.url}${environment.api.main}/model`;
    return this.http.put<any>(endpoint, body);
  }

  deleteModel(id:string) {
    const endpoint = `${environment.url}${environment.api.main}/model/${id}`;
    return this.http.delete<any>(endpoint);
  }

  getModelBrandId(id:string) {
    const endpoint = `${environment.url}${environment.api.main}/model/brand/${id}`;
    return this.http.get<Response<any>>(endpoint);
  }

  getGroup(params:any) {
    const endpoint = `${environment.url}${environment.api.main}/asset-group/company/${this.companyId}`;
    return this.http.get<Response<Pagination<Group[]>>>(endpoint,{params:params});
  }

  getGroupReport(){
    const endpoint = `${environment.url}${environment.api.main}/asset-group/company/${this.companyId}/report`;
    return this.http.get<Response<any>>(endpoint);
  }


  getGroupAll() {
    const endpoint = `${environment.url}${environment.api.main}/asset-group/company/${this.companyId}/all`;
    return this.http.get<Response<any>>(endpoint).toPromise();
  }

  getGroupById(id: string) {
    const endpoint = `${environment.url}${environment.api.main}/asset-group/group/${id}`;
    return this.http.get<Response<Group>>(endpoint);
  }

  postGroup(body: any) {
    const endpoint = `${environment.url}${environment.api.main}/asset-group`;
    return this.http.post<any>(endpoint, body);
  }

  putGroup(body: any) {
    const endpoint = `${environment.url}${environment.api.main}/asset-group`;
    return this.http.put<any>(endpoint, body);
  }

  deleteGroup(id:string) {
    const endpoint = `${environment.url}${environment.api.main}/asset-group/${id}`;
    return this.http.delete<any>(endpoint);
  }


  getCategory(params:any) {
    const endpoint = `${environment.url}${environment.api.main}/category/company/${this.companyId}`;
    return this.http.get<Response<Pagination<Category[]> >>(endpoint,{params:params});
  }

  getCategoryAll() {
    const endpoint = `${environment.url}${environment.api.main}/category/company/${this.companyId}/all`;
    return this.http.get<Response<any>>(endpoint);
  }



  getCategoryById(id: string) {
    const endpoint = `${environment.url}${environment.api.main}/category/${id}`;
    return this.http.get<Response<any>>(endpoint);
  }

  postCategory(body: any) {
    const endpoint = `${environment.url}${environment.api.main}/category`;
    return this.http.post<any>(endpoint, body);
  }

  putCategory(body: any) {
    const endpoint = `${environment.url}${environment.api.main}/category`;
    return this.http.put<any>(endpoint, body);
  }

  deleteCategory(id:string) {
    const endpoint = `${environment.url}${environment.api.main}/category/${id}`;
    return this.http.delete<any>(endpoint);
  }


  getMaterial(params:any) {
    const endpoint = `${environment.url}${environment.api.main}/material`;
    return this.http.get<Response<Pagination<Material[]>>>(endpoint,{params:params});
  }

  getMaterialAll() {
    const endpoint = `${environment.url}${environment.api.main}/material/all`;
    return this.http.get<Response<any>>(endpoint);
  }

  getMaterialById(id: string) {
    const endpoint = `${environment.url}${environment.api.main}/material/${id}`;
    return this.http.get<Response<any>>(endpoint);
  }

  postMaterial(body: any) {
    const endpoint = `${environment.url}${environment.api.main}/material`;
    return this.http.post<any>(endpoint, body);
  }

  putMaterial(body: any) {
    const endpoint = `${environment.url}${environment.api.main}/material`;
    return this.http.put<any>(endpoint, body);
  }

  deleteMaterial(id:string) {
    const endpoint = `${environment.url}${environment.api.main}/material/${id}`;
    return this.http.delete<any>(endpoint);
  }


  getAccount(params:any) {
    const endpoint = `${environment.url}${environment.api.main}/account/company/${this.companyId}`;
    return this.http.get<Response<Pagination<Account[]>>>(endpoint,{params:params});
  }


  getAccountById(id: string) {
    const endpoint = `${environment.url}${environment.api.main}/account/${id}`;
    return this.http.get<Response<any>>(endpoint);
  }

  postAccount(body: any) {
    const endpoint = `${environment.url}${environment.api.main}/account`;
    return this.http.post<any>(endpoint, body);
  }

  putAccount(body: any) {
    const endpoint = `${environment.url}${environment.api.main}/account`;
    return this.http.put<any>(endpoint, body);
  }

  deleteAccount(id:string) {
    const endpoint = `${environment.url}${environment.api.main}/account/${id}`;
    return this.http.delete<any>(endpoint);
  }

  getAllAccountByCompanyAccountNumber(params:any){
     const endpoint = `${environment.url}${environment.api.main}/account/company/${this.companyId}/all`;
    return this.http.get<Response<Account[]>>(endpoint,{params:params});
  }

}
