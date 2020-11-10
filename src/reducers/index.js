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
import purchaseOrderReducer from './sales/purchaseOrderReducer';
import invoiceReducer from "./sales/invoiceReducer";
import searchPurchaseOrdersReducer from "./sales/searchPurchaseOrdersReducer";

export default combineReducers({
    auth: authReducer,
    users: userReducer,
    userRoles: userRoleReducer,
    customer: customerReducer,
    supplier: supplierReducer,
    rawMaterials: rawMaterialReducer,
    packingMaterials: packingMaterialReducer,
    semiFinishGoods: semiFinishGoodsReducer,
    finishGoods: finishGoodReducer,
    productMaster: productMasterReducer,
    searchPurchaseOrders: searchPurchaseOrdersReducer,
    invoices: invoiceReducer,
    form: formReducer,
    purchaseOrders: purchaseOrderReducer
});