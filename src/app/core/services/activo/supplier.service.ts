import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Supplier } from "../../models/supplier.model";

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private httpClient: HttpClient) { }

  getById(id:string){
    const endPoint =  `${environment.url_log}/logistics/supplier/${id}`;
    return this.httpClient.get<Supplier>(`${endPoint}`).toPromise();
  }

}