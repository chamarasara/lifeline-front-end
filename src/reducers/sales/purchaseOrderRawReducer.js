import _ from 'lodash';
import {
    CREATE_PURCHASE_ORDER_RAW,
    CREATE_PURCHASE_ORDER_RAW_ERROR,
    EDIT_PURCHASE_ORDER_RAW,
    FETCH_PURCHASE_ORDER_RAW,
    FETCH_PURCHASE_ORDERS_RAW,
    NEW_GRN_PURCHASE_ORDER_RAW,
    NEW_BANK_PAYMENT_PURCHASE_ORDER_RAW,
    DELETE_PURCHASE_ORDER_RAW,
    NEW_CASH_PAYMENT_PURCHASE_ORDER_RAW,
    NEW_ADDITIONAL_BANK_PAYMENT_PURCHASE_ORDER_RAW,
    NEW_ADDITIONAL_CASH_PAYMENT_PURCHASE_ORDER_RAW

} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_PURCHASE_ORDERS_RAW:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_PURCHASE_ORDER_RAW:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_PURCHASE_ORDER_RAW:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_PURCHASE_ORDER_RAW_ERROR:
            return { ...state, [action.payload.id]: action.payload, success: false };
        case EDIT_PURCHASE_ORDER_RAW:
            return { ...state, [action.payload._id]: action.payload };
        case NEW_GRN_PURCHASE_ORDER_RAW:
            return { ...state, [action.payload.id]: action.payload };
        case NEW_BANK_PAYMENT_PURCHASE_ORDER_RAW:
            return { ...state, [action.payload.id]: action.payload };
        case NEW_CASH_PAYMENT_PURCHASE_ORDER_RAW:
            return { ...state, [action.payload.id]: action.payload };
        case NEW_ADDITIONAL_BANK_PAYMENT_PURCHASE_ORDER_RAW:
            return { ...state, [action.payload.id]: action.payload };
        case NEW_ADDITIONAL_CASH_PAYMENT_PURCHASE_ORDER_RAW:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_PURCHASE_ORDER_RAW:
            return _.omit(state.action);
        default:
            return state;
    }
}