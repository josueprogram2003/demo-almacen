import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Response } from "../../../utils";
import { BusinessUnit } from "../../models/businessUnit.model";

@Injectable({ providedIn: 'root' })
export class BusinessUnitService {

  companyId: string | null = sessionStorage.getItem('companyId');
  constructor(private http: HttpClient) { }
  get() {
    const endpoint = `${environment.configuration.url}/configuration/business-unit/company/${this.companyId}/all`;
    return this.http.get<Response<BusinessUnit[]>>(endpoint);
  }

  costCenterByBussinesUnitId(id: string) {
    let param = {
      name: ''
    }
    const endpoint = `${environment.url}${environment.api.main}/cost-center/business-unit/${id}/search`;
    return this.http.get<any>(`${endpoint}`, { params: param });
  }
  getAreas(id:string) {
    let param = {
      businessUnitId: id,
    }
    const endpoint = `${environment.configuration.url}/configuration/areas/company/${this.companyId}`;
    return this.http.get<Response<any[]>>(endpoint,{params: param});
  }

}
