export interface Group {
    id:                     string;
    name:                   string;
    isActive:               boolean;
    createdBy:              null;
    createdDate:            null;
    lastModifiedBy:         null;
    lastModifiedDate:       null;
    companyId:              string;
    account:                Account;
    depreciationPercentage: number;
    activationAccount:      Account;
}

export interface Account {
    id:            string;
    accountNumber: string;
    description:   string;
    companyId:     string;
    isActive:      boolean;
}