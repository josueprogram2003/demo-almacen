import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CostcenterService {
  constructor(private httpClient: HttpClient) {
  }

  public getByUser$(): Observable<any> {
    const endPoint = environment.url+environment.api.main + '/cost-center/user';
    return this.httpClient.get<any>(`${endPoint}`);
  }
}

