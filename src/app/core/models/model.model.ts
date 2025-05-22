import { Brand } from "./brand.model";

export interface Model {
    id: string;
    name: string;
    state: null;
    isDeleted: null;
    isActive: boolean;
    createdBy: null;
    createdDate: null;
    lastModifiedBy: null;
    lastModifiedDate: null;
    brand: Brand;
}