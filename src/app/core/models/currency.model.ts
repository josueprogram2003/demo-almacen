export interface Currency {
  id?: string;
  name: string;
  description: string;
  nomenclature: string;
  symbol: string;
  state?: boolean;
  creationUser: string;
  creationDate: string;
  modificationUser: string;
  modificationDate: string;
}