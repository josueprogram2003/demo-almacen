import { Additional } from "./additional.model";
import { Currency } from "./currency.model";

export interface ActivoDetails {
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
    total:              number;
    igv:                null;
    depreciationRate:   number;
    currencyId:         string;
    departmentId:       null;
    locationChangeDate: null;
    createdBy:          string;
    createdDate:        string;
    lastModifiedBy:     string;
    lastModifiedDate:   string;
    category:           Category;
    measurementUnitId:  string;
    companyId:          string;
    supplierId:         string;
    supplierName:       string;
    model:              Model;
    warrantyStartDate:  null;
    warrantyEndDate:    null;
    campusId:           null;
    officeId:           null;
    isInsured:          null;
    insuranceStartDate: null;
    insuranceEndDate:   null;
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
    amountDepreciation: number;
    files:              File[];
    curency?:           Currency;
    addtionals?:        Additional[];
}

export interface AssetGroup {
    assetGroupId:     string;
    name:             string;
    isDeleted:        boolean;
    isActive:         boolean;
    createdBy:        null;
    createdDate:      string;
    lastModifiedBy:   string;
    lastModifiedDate: string;
    companyId:        string;
    account:          Account;
    depreciationRate: number;
}

export interface Account {
    accountId:        string;
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
    brandId:          string;
    owner:            string;
    industry:         string;
    name:             string;
    description:      string;
    countryOrigin:    string;
    website:          string;
    isDeleted:        boolean;
    isActive:         boolean;
    createdBy:        string;
    createdDate:      string;
    lastModifiedBy:   string;
    lastModifiedDate: string;
    companyId:        string;
}

export interface Category {
    categoryId:       string;
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
    assetFilesId: string;
    assetId:      string;
    name:         string;
    isActive:     boolean;
}

export interface Material {
    materialId:       string;
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
    modelId:          string;
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

