import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paginate } from '../models/paginate';
import { map } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class IndicadorService {

  constructor(private http: HttpClient) { }
  companyId: any = sessionStorage.getItem('companyId');

  paramsPaginate(page?: number, size?: number) {
    let params = {};
    if (page != undefined && size != undefined) {
      params = {
        page: page,
        size: size,
      };
    }
    return params;
  }
  getbusinessUnit() {
    const endpoint = `${environment.urlConfiguration}/configuration/business-unit/company/${this.companyId}/all`;
    return this.http.get<any>(endpoint).pipe(
      map(response => response.data)
    );
  }

  getIndicadorById(id: number) {
    const endpoint = `${environment.url}${environment.api.main}/configuration/indicator/${id}`;
    return this.http.get<any>(endpoint);
  }
  getIndicadorByIdandBussinesUnit(id: number, idBussinesUnit: string) {
    let params = {
      businessUnitId: idBussinesUnit,
      indicatorId: id,
    };
    const endpoint = `${environment.url}${environment.api.main}/configuration/indicator/company/${this.companyId}/indicatorId`;
    return this.http.get<any>(endpoint, { params: params });
  }
  getIndicadoresSettings(page?: number, size?: number) {
    const endpoint = `${environment.url}${environment.api.main}/configuration/indicator/company/${this.companyId}`;
    return this.http.get<Paginate>(endpoint, {
      params: this.paramsPaginate(page, size),
    });
  }
  getIndicadoresSettingsFilter(
   params:any
  ) {
    // let params:any = {
    //   businessUnitId: businessUnitId,
    //   page: page,
    //   size: size,
    // };
    const endpoint = `${environment.url}${environment.api.main}/configuration/indicator/filter/company/${this.companyId}`;
    return this.http.get<Paginate>(endpoint, {params:params});
  }

  getUsuarioByIndicator(id: number, page?: number, size?: number) {
    const endpoint = `${environment.url}${environment.api.main}/configuration/user-indicator/${id}/user`;
    return this.http.get<Paginate>(endpoint, {
      params: this.paramsPaginate(page, size),
    });
  }

  postIndicador(body: any) {
    const endpoint = `${environment.url}${environment.api.main}/configuration/indicator`;
    return this.http.post(endpoint, body);
  }

  putIndicador(body: any) {
    const endpoint = `${environment.url}${environment.api.main}/configuration/indicator`;
    return this.http.put(endpoint, body);
  }

  deleteIndicador(id: number) {
    const endpoint = `${environment.url}${environment.api.main}/configuration/indicator/${id}`;
    return this.http.delete(endpoint);
  }

  getIndicadorByUsuario(businessUnitId: string, page?: number, size?: number) {
    let params = {
      businessUnitId: businessUnitId,
    };
    const endpoint = `${environment.url}${environment.api.main}/configuration/indicator/company/${this.companyId}/report`;
    return this.http.get<any[]>(endpoint, {
      params: { ...this.paramsPaginate(page, size), ...params },
    });
  }

  getIndicadorByUnidadnegocio(businessUnitId: string, userId: string) {
    let params = {
      userId: userId,
    };
    const endpoint = `${environment.url}${environment.api.main}/configuration/indicator/company/${this.companyId}/businessUnit/${businessUnitId}`;
    return this.http.get<any[]>(endpoint,{params:params});
  }

  //USUARIO
  getUsuarioAutocomplete(name: string) {
    const endpoint = `${environment.url}${environment.api.main}/configuration/user-indicator/user?name=${name}`;
    return this.http.get<any[]>(endpoint);
  }

  postIndicadorUsuario(body: any) {
    const endpoint = `${environment.url}${environment.api.main}/configuration/user-indicator`;
    return this.http.post(endpoint, body);
  }

  deleteUserIndicator(id: number) {
    const endpoint = `${environment.url}${environment.api.main}/configuration/user-indicator/${id}`;
    return this.http.delete(endpoint);
  }

  getEmployeeByNameV2(name:string){
    let params=new HttpParams().set('value',name);
    return this.http.get<any[]>(
      `${environment.urlgth}/gth/employee/company/${sessionStorage.getItem('companyId')}/search`, {params:params}
    )
  }

}
