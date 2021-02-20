import { combineReducers } from "redux";
import { reducer as formReducer} from 'redux-form';
import userReducer from "./userReducer";
import userRoleReducer from "./userRoleReducer";
import authReducer from "./authReducer";
import customerReducer from "./customerReducer";
import supplierReducer from "./supplierReducer";
import rawMaterialReducer from "./master/rawMaterialReducer";
import packingMaterialReducer from "./master/packingMaterialReducer";
import semiFinishGoodsReducer from "./master/semiFinishGoodReducer";
import finishGoodReducer from "./master/finishGoodReducer";
import productMasterReducer from "./master/productMasterReducer";
import purchaseOrderRawReducer from './sales/purchaseOrderRawReducer';
import purchaseOrderPackingReducer from './sales/purchaseOrderPackingReducer';
import invoiceReducer from "./sales/invoiceReducer";
import searchInvoicesReducer from "./sales/searchInvoicesReducer";
import searchPurchaseOrdersRawReducer from "./sales/searchPurchaseOrdersRawReducer";
import searchPurchaseOrdersPacking  from "./sales/searchPurchaseOrdersPackingReducer";
import bomReducer from "./master/bomReducer";
import quotationReducer from "./sales/quotationReducer";
import searchQuotationReducer from "./sales/searchQuotationReducer";
import inventoryFinishGoodReducer from "./inventory/inventoryFinishGoodReducer";
import distributorReducer from "./master/distributorReducer";

export default combineReducers({
    auth: authReducer,
    users: userReducer,
    userRoles: userRoleReducer,
    customer: customerReducer,
    supplier: supplierReducer,
    distributor: distributorReducer,
    rawMaterials: rawMaterialReducer,
    packingMaterials: packingMaterialReducer,
    semiFinishGoods: semiFinishGoodsReducer,
    finishGoods: finishGoodReducer,
    productMaster: productMasterReducer,
    searchPurchaseOrdersRaw: searchPurchaseOrdersRawReducer,
    searchPurchaseOrdersPacking: searchPurchaseOrdersPacking,
    invoices: invoiceReducer,
    quotations: quotationReducer,
    searchQuotations: searchQuotationReducer,
    form: formReducer,
    purchaseOrdersRaw: purchaseOrderRawReducer,
    purchaseOrdersPacking: purchaseOrderPackingReducer,
    bom:bomReducer,
    searchInvoices: searchInvoicesReducer,
    finishGoodInventory: inventoryFinishGoodReducer
});