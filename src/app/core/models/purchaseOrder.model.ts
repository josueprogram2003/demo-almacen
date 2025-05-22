import { Currency } from "./currency.model";
import { Supplier } from "./supplier.model";

export interface PurchaseOrderAsset {
    id:                     string;
    item:                   number;
    articleId:              string;
    name:                   string;
    code:                   string;
    mark:                   null;
    measureUnit:            MeasureUnit;
    description:            string;
    affectationType:        string;
    amount:                 number;
    unitPrice:              number;
    bi:                     number;
    igv:                    number;
    isc:                    null;
    total:                  number;
    purchaseOrder:          PurchaseOrder;
    currency?:              Currency;
    supplier?:              Supplier;
    amountId?:              number | string;
    index?:                 number;
    purchaseOrderId?:       string;
    purchaseOrderDetailId?: string;
    remainingQuantity:      number;
}

export interface MeasureUnit {
    id:     string;
    name:   string;
    symbol: string;
}

export interface PurchaseOrder {
    id:                string;
    serie:             string;
    number:            string;
    purchaseOrderDate: Date;
    deliveryDate:      Date;
    description:       string;
    bi:                number;
    igv:               number;
    total:             number;
    state:             string;
    supplierId:        string;
    supplierName:      string;
    order:             Order;
    currencyId:        string;
    currencyName:      string;
    address:           string;
    deliveryTime:      string;
    wayToPay:          string;
    accountNumber:     string;
    file1:             string;
    file2:             string;
    file3:             null;
    businessUnitId:    string;
    costCenterId:      string;
    costCenterName:    string;
    namePurchaseOrder?:  string;
    
    responseComplete?: PurchaseOrderAsset[];
}

export interface Order {
    id:                    string;
    serie:                 string;
    number:                string;
    orderDate:             Date;
    deliveryDate:          Date;
    description:           string;
    total:                 number;
    periodId:              string;
    currencyId:            string;
    producedBy:            string;
    state:                 string;
    deliveryPerson:        string;
    deliveryDepartamentId: string;
    deliveryProvinceId:    string;
    deliveryDistrictId:    string;
    deliveryReference:     string;
    deliveryAddress:       string;
}
