import { Additional } from "./additional.model";
import { Currency } from "./currency.model";

export interface Asset {
    id:            string;
    description:        string;
    serialNumber:       string;
    manufacturingYear:  number;
    material:           Material;
    dependenceId:       null;
    areaId:             null;
    officeNumber:       null;
    floor:              number;
    unitPrice:          number;
    total:              number | string;
    igv:                number | null;
    depreciationRate:   number;
    currencyId:         string;
    departmentId:       null;
    locationChangeDate: null;
    createdBy:          string;
    createdDate:        string;
    lastModifiedBy:     null | string;
    lastModifiedDate:   null | string;
    category:           Category;
    measurementUnitId:  string;
    companyId:          string;
    supplierId:         string;
    supplierName:       string;
    model:              Model;
    warrantyStartDate:  null | string;
    warrantyEndDate:    null | string;
    campusId:           null;
    officeId:           null;
    isInsured:          null;
    insuranceStartDate: null | string;
    insuranceEndDate:   null | string;
    assetSituation:     number;
    assignmentState:    boolean;
    depreciationState:  boolean;
    brand:              Brand;
    isActive:           boolean;
    isDeleted:          boolean;
    assignedTo:         null;
    assetGroup:         AssetGroup;
    assetState:         null;
    selectionIgv:       boolean;
    costCenterId:       string;
    costCenterName:     string;
    invoiceNumber:      string;
    invoiceDate:        null;
    exchangeRate:       number;
    amountDepreciation: number | string;
    files:              File[];
    activationDate:     Date | null;
    currency?:          Currency;
    additionals?:        Additional[]
    depreciationPercentage?:  number;
    employeeId?:        string;
    employeeName?:      string;
    url:                string;
    code?:              string;
    assetId?:           string;
    businessUnitId?:    string;

    isAssigned:             boolean;
    areaName:               null | string;
    campusName:             null | string;
    positionId:             null | string;
    positionName:           null | string;
    officeName:             null | string;
    state:                  string;
    costCenterCode:         string;
    assignmentDate:         null;
    valueRemainingAsset:    number;
    assetValue:             number;

}

export interface AssetGroup {
    id:     string;
    name:             string;
    isDeleted:        boolean;
    isActive:         boolean;
    createdBy:        null | string;
    createdDate:      string;
    lastModifiedBy:   null | string;
    lastModifiedDate: null | string;
    companyId:        string;
    account:          Account;
    depreciationRate: number;
    activationAccount:      Account;
}

export interface Account {
    id:        string;
    accountNumber:    string;
    description:      string;
    companyId:        string;
    createdBy:        string;
    createdDate:      string;
    lastModifiedBy:   null;
    lastModifiedDate: null;
    isActive:         boolean;
    isDeleted:        boolean;
}

export interface Brand {
    id:          string;
    owner:            null | string;
    industry:         string;
    name:             string;
    description:      null | string;
    countryOrigin:    null | string;
    website:          null | string;
    isDeleted:        boolean;
    isActive:         boolean;
    createdBy:        null | string;
    createdDate:      string;
    lastModifiedBy:   null | string;
    lastModifiedDate: null | string;
    companyId:        string;
}

export interface Category {
    id:       string;
    name:             string;
    description:      string;
    type:             string;
    code:             string;
    state:            null;
    isDeleted:        boolean;
    isActive:         boolean;
    createdBy:        null;
    createdDate:      string;
    lastModifiedBy:   null;
    lastModifiedDate: string;
    companyId:        string;
}

export interface File {
    id: string;
    assetId:      string;
    name:         string;
    isActive:     boolean;
}

export interface Material {
    id:       string;
    name:             string;
    type:             string;
    isDeleted:        boolean;
    isActive:         boolean;
    createdBy:        null;
    createdDate:      string;
    lastModifiedBy:   null;
    lastModifiedDate: null;
}

export interface Model {
    id:          string;
    name:             string;
    state:            null;
    isDeleted:        boolean;
    isActive:         boolean;
    createdBy:        null;
    createdDate:      string;
    lastModifiedBy:   null;
    lastModifiedDate: null;
    brandId:          string;
}