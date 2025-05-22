export interface AccountingDetail {
    id: string;
    asset: Asset;
    amount: number;
    depreciationPercentage: number | null;
    account: Account;
    transactionType: string;
    costCenterId: null | string;
}

export interface Account {
    id: string;
    accountNumber: string;
    description: string;
    companyId: string;
}


export interface Asset {
    id: string;
    description: string;
    serialNumber: string;
    assetGroup: AssetGroup;
    code: string;
    businessUnitId: string;
}

export interface AssetGroup {
    id: string;
    name: string;
    companyId: string;
    account: Account;
    depreciationPercentage: number;
}
