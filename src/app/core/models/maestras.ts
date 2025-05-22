export interface Company {
    companyId?: number;
    code?: string;
    name?: string;
    tradeName?: string;
    address?: string;
    codeCountry?: number;
    codeDepartment?: number;
    codeProvince?: number;
    codeDistrict?: number;
    phone?: string;
    taxlIdentification?: string;
    email?: string;
}

export interface digitSeat {
    value: number;
    name: string;
}

export const DigitSeat: digitSeat[] = [
    { value: 1, name: 'VENTAS' },
    { value: 2, name: 'COMPRAS CREDITO FISCAL' },
    { value: 3, name: 'COMPRAS SIN CREDITO FISCAL' },
    { value: 4, name: 'COMPRAS NO GRAVADAS' },
    { value: 5, name: 'HONORARIOS' },
    { value: 6, name: 'LIBRE' },
    { value: 7, name: 'TRANSFERENCIAS' },
    { value: 8, name: 'LIBRE' },
    { value: 9, name: 'DIARIO' }
]