export interface AssetEmployee {
    id:             string;
    assetId:        string;
    asset:          Asset;
    employeeId:     string;
    description:    string;
    employeeName:   string;
    assignmentDate: Date;
    returnDate:     null;
    reason:         string;
    condition:      string;
    notes:          string;
    assignedBy:     null;
    companyId:      string;
    costCenterId:   string;
    businessUnitId: null;
    costCenterName: string;
    isActive:       boolean;
    state:          number;
    files:          File[];
    children?:      any;
    label?:         string;
    expanded?:      boolean;
    data?:          any;
    isApproved:     boolean;
}

export interface Asset {
    id:                 string;
    description:        string;
    serialNumber:       string;
    code:               string;
    businessUnitId:     string,
    assetGroup:         AssetGroup;
}

export interface AssetGroup {
    id:                     string;
    name:                   string;
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
}

export interface File {
    id:           string;
    assignmentId: string;
    name:         string;
    objectKey:    string;
    isActive:     boolean;
    icon?:        string;
}

export interface AssigmentPlaceholder {
    fullname:    string;
    dni:         string;
    area:        string;
    sede:        string;
    asset:       string;
    model:       string;
    brand:       string;
    serie:       string;
    code:        string;
    color:       string;
    state:       string;
    observation: string;
    date:        string;
}
