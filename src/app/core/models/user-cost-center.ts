import { CostCenter } from "./costCenter.model";

export interface UserCostCenter {
    id?: string;
    name?: string;
    user?: string;
    userId?: number;
    creationUser?: string;
    creationDate?: string;
    modificationUser?: string;
    modificationDate?: string;
    userName?: string;
    idPerson?: string;
    details?: UserCostCenterDetail[];
}

export interface UserCostCenterDetail {
    id?: string;
    userCostCenter?: UserCostCenter;
    costCenter?: CostCenter;
}

export interface UserAutocomplete {
    id?: string;
    name?: string;
    username?: string;
    noUser?: string;
    idPerson?: string;
}
export interface User{
  name?: string;
  user?: string;
  userId?: string;
  userFullName?: string;
  idPerson?: string;
  companyId?: string;
  search?: string;
  details?:any[];
}
export interface UserCostCenterDetailForm{
    costCenterName?:string;
    costCenterCode?:string;
    costCenter?:number;
}
