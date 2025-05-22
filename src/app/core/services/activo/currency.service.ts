import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private httpClient: HttpClient) {

  }

  getAll(){
    const endPoint =  `${environment.url}${environment.api.main}/currency/company/${sessionStorage.getItem('companyId')}`;
    return this.httpClient.get<any>(`${endPoint}`);
  }

  getAllPromesis(){
    const endPoint =  `${environment.url}${environment.api.main}/currency/company/${sessionStorage.getItem('companyId')}`;
    return this.httpClient.get<any>(`${endPoint}`).toPromise();
  }

}

