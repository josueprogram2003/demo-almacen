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

export interface PersonBasic {
    id: string;
    name: string;
    firstSurname: string;
    secondSurname: string;
    birthDate: string; // Formato: YYYY-MM-DD
    // Agrega otros campos si los necesitas
}

// Definición de la interfaz para el objeto principal
export interface EmployeeBasic {
    fullName: string;
    positionName: string;
    areaName: string;
    businessUnitName: string;
    officeName: string;
    campusName: string;
    birthDate: any; // Formato: YYYY-MM-DD
    actualAge: number;
    photoUrl: string;
    personPhoto: string;
    isLoading: boolean;
  phoneNumberWork: string;
  workEmail: string;
}

