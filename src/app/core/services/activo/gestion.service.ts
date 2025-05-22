import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

export class GestionService {

  constructor(private http: HttpClient) { }

  get() {
    const endpoint = `${environment.url}${environment.api.main}/asset`;
    return this.http.get<any[]>(endpoint);
  }

  getFilter(params:any) {
    const endpoint = `${environment.url}${environment.api.main}/asset/filter`;
    return this.http.get<any[]>(endpoint, {params: params});
  }
}

