export interface FilterBudget {
  businessUnitId?: string;
  costCenterId?: string;
  periodId?: string;
  size: number;
  pageNumber: number;
}
export interface Filter {
  size: number;
  pageNumber: number;
  name?: string;
}
