export interface Assigned {
    id: string;
    assetId: string;
    asset: Asset;
    employeeId: string;
    description: string;
    employeeName: string;
    assignmentDate: Date;
    returnDate: null | Date;
    reason: string;
    condition: string;
    notes: string;
    assignedBy: null;
    companyId: string;
    costCenterId: string;
    businessUnitId: null;
    costCenterName: string;
    isActive: boolean;
    files: File[];
    isAssigned: boolean;
    state:number;
}

export interface Asset {
    id: string;
    description: string;
    serialNumber: string;
    assetGroup: AssetGroup;
}

export interface AssetGroup {
    id: string;
    name: string;
    companyId: string;
    account: Account;
    depreciationPercentage: number;
}

export interface Account {
    id: string;
    accountNumber: string;
    description: string;
    companyId: string;
}

export interface File {
    id: string;
    assignmentId: string;
    name: string;
    objectKey: string;
    isActive: boolean;
}
