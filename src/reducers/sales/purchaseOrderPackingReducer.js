import _ from 'lodash';
import {
    CREATE_PURCHASE_ORDER_PACKING,
    EDIT_PURCHASE_ORDER_PACKING,
    FETCH_PURCHASE_ORDER_PACKING,
    FETCH_PURCHASE_ORDERS_PACKING,
    DELETE_PURCHASE_ORDER_PACKING,
    NEW_GRN_PURCHASE_ORDER_RAW ,
    NEW_BANK_PAYMENT_PURCHASE_ORDER_PACKING,
    NEW_CASH_PAYMENT_PURCHASE_ORDER_PACKING

} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_PURCHASE_ORDERS_PACKING:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_PURCHASE_ORDER_PACKING:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_PURCHASE_ORDER_PACKING:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_PURCHASE_ORDER_PACKING:
            return { ...state, [action.payload._id]: action.payload };
        case NEW_GRN_PURCHASE_ORDER_RAW:
            return { ...state, [action.payload.id]: action.payload };
        case NEW_BANK_PAYMENT_PURCHASE_ORDER_PACKING:
            return { ...state, [action.payload.id]: action.payload };
        case NEW_CASH_PAYMENT_PURCHASE_ORDER_PACKING:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_PURCHASE_ORDER_PACKING:
            return _.omit(state.action);
        default:
            return state;
    }
}