import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Company } from "../models/maestras";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MaestraService {

  constructor(private http: HttpClient) { }

  getMonthsNames() {
    return ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  }

  getMonths(){
    return [{month:1,name:'Enero'},{month:2,name:'Febrero'},{month:3,name:'Marzo'},{month:4,name:'Abril'},{month:5,name:'Mayo'},{month:6,name:'Junio'},{month:7,name:'Julio'},{month:8,name:'Agosto'},{month:9,name:'Septiembre'},{month:10,name:'Octubre'},{month:11,name:'Noviembre'},{month:12,name:'Diciembre'} ];
  }

  getYears(yearstatic?:number) {
    if(yearstatic == undefined){
      yearstatic = 2018;
    }
    const year = [];
    for (let i = yearstatic; i <= new Date().getFullYear()+1; i++) {
      year.push({ year: i, value: i })
    }
    return year;
  }

  getEmpresaUsuario() {
    const endpoint = `${environment.url}${environment.api.main}/company/user`;
    return this.http.get<Company[]>(endpoint);
  }

}

