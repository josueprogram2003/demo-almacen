import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Response } from "../../models/paginationResponse.model";
import { Additional } from "../../models/additional.model";

@Injectable({
    providedIn: 'root'
})
export class AdditionalActivoService {

    companyId: string | null = sessionStorage.getItem('companyId');

    constructor(private http: HttpClient) { }


    getAdditional() {
        const endpoint = `${environment.url}${environment.api.main}/additional`;
        return this.http.get<Response<any>>(endpoint);
    }

    postAdditional(body: any) {
        const endpoint = `${environment.url}${environment.api.main}/additional`;
        return this.http.post<any[]>(endpoint, body);
    }
    deleteAdditional(id: string) {
        const endpoint = `${environment.url}${environment.api.main}/additional${id}`;
        return this.http.delete<any[]>(endpoint);
    }
    getAdditionalById(id: string) {
        const endpoint = `${environment.url}${environment.api.main}/additional/assetId/${id}`;
        return this.http.get<Response<Additional[]>>(endpoint).toPromise();
    }

}

