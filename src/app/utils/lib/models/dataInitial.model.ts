import { Company } from "./company.model";

export interface DataInitial {
    id?:string;
    username?: string;
    person?: Person;
    employeeId?: string;
    company?: Company[];
}

export interface Person {
    id: string;
    name: string;
    firstSurname: string;
    secondSurname: string;
}
