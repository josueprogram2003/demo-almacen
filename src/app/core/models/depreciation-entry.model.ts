export interface depreciationEntry {
    id: string;
    totalDepreciateAmount: number;
    exchangeRate:number;
    isUploaded:Boolean;
    date: string;
    description: string;
    year: number;
    month: number;
    companyId: string;
    isActive: boolean;
    isDeleted: boolean;
    createdBy: string;
    createdDate: string;
    lastModifiedBy: null;
    lastModifiedDate: null;
    state?: number;
}