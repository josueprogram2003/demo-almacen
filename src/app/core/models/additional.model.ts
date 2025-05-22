export interface Additional {
    id:        string;
    asset:               Asset;
    description:         string;
    date:                string;
    amount:              number | string;
    isActive:            boolean;
    isDeleted:           boolean;
    createdBy:           string;
    createdDate:         string;
    lastModifiedBy:      null;
    lastModifiedDate:    null;
    files:               File[];
    isPriceToDepreciate: boolean;
}

export interface Asset {
    assetId:      string;
    description:  string;
    serialNumber: string;
    assetGroup:   AssetGroup;
}

export interface AssetGroup {
    assetGroupId:     string;
    name:             string;
    companyId:        string;
    account:          Account;
    depreciationRate: number;
}

export interface Account {
    accountId:     string;
    accountNumber: string;
    description:   string;
    companyId:     string;
}

export interface File {
    additionalFilesId: string;
    additional:        Additional;
    name:              string;
}

export interface Additional {
    additionalId: string;
    description:  string;
    date:         string;
    amount:       number | string;
}