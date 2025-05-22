export interface ActivoDepresiation  {
    id:      null;
    exist:   boolean;
    year:    number;
    month:   number;
    details: Detail[];
}

export interface Detail {
    id:                     string;
    description:            string;
    serialNumber:           string;
    assetGroup:             AssetGroup;
    costCenterId:           string;
    costCenterName:         string;
    costCenterCode:         string;
    unitPrice:              number;
    depreciationPercentage: number;
    activationDate:         Date;
    amountDepreciation:     number;
    valueRemainingAsset:    number;
    assetValue:             number;
    total:                  number;
}

export interface AssetGroup {
    id:               string;
    name:             string;
    companyId:        string;
    account:          Account;
    depreciationPercentage:number;
}

export interface Account {
    id:            string;
    accountNumber: string;
    description:   string;
    companyId:     string;
}
