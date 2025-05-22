export interface User {
    employee?: string;
    employeeId?: string;
    person?: Person;
    personUserId?: string;
    username?: string;
    acciones?: Accion[];
    perfiles?: Perfil[];
}
export interface Person {
    personId?: string;
    name?: string;
    firstSurname?: string;
    secondSurname?: string;
    gender?: string;
}
export interface Accion{
    codigo?:string;
}

export interface Perfil{
    code?:string;
    name?:string;
}

