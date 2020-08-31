import { combineReducers } from "redux";
import { reducer as formReducer} from 'redux-form';
import userReducer from "./userReducer";
import userRoleReducer from "./userRoleReducer";
import authReducer from "./authReducer";
import customerReducer from "./customerReducer";
import supplierReducer from "./supplierReducer";

export default combineReducers({
    auth: authReducer,
    users: userReducer,
    userRoles: userRoleReducer,
    customer: customerReducer,
    supplier: supplierReducer,
    form: formReducer
});