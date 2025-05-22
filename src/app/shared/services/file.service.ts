import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class FileService {

    endPoint:string = `https://api-logistica-dev.adra.org.pe/api/logistics/file`;
    // endPoint:string = `https://api-logistica.adra.org.pe/api/logistics/file`;
    constructor(private  httpClient: HttpClient){}

    getFile$(fileNme: string): Observable<any> {
        return this.httpClient.get(`${this.endPoint}/${fileNme}`, { responseType: 'blob' });
    }
    
}