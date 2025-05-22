import { BusinessUnit } from "./businessUnit.model";

export interface CostCenter {
  id?: string;
  name?: string;
  description?: string;
  code?: string;
  state?: boolean;
  areaId?: string;
  campusId?: string;
  businessUnitId?: string;
  companyId?: string;
  deleted?: boolean;
  active?: boolean;
  createdBy?: string;
  createdDate?: string;
  level?: null | any; // Ajusta según la estructura real del nivel
  nameArea?: null | string; // Ajusta según la estructura real del nombre del área
  namePosition?: null | string; // Ajusta según la estructura real del nombre del cargo
  lastModifiedBy?: string;
  lastModifiedDate?: string;
}
export interface CountAccountandExonerated {
  id?: string ;
  creationDate?: string;
  creationUser?: string;
  description?: string;
  modificationDate?: string;
  modificationUser?: string;
  account?: string;
}
export interface CountAccountandCostCenterExonerated {
  id?: string;
  count?: string;
  creationDate?: string;
  creationUser?: string;
  description?: string;
  businessUnit?: BusinessUnit;
  businessUnitId?: string;
  costCenter?: CostCenter;
  costCenterId?: string;
  modificationDate?: string;
  modificationUser?: string;
  costCenterName?: string;
  businessUnitName?: string;
  costCenterCode?: string;
}

export interface CostCenterSync{
  name: string;
  description: string;
  code: string;
  companyId: string;
}
export interface SyncData {
  clave: string;
  date: null | Date;
  description: string;
  hora: null | string;
  id: null | string;
}
