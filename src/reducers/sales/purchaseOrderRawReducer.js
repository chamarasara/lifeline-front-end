import _ from 'lodash';
import {
    CREATE_PURCHASE_ORDER_RAW,
    EDIT_PURCHASE_ORDER_RAW,
    FETCH_PURCHASE_ORDER_RAW,
    FETCH_PURCHASE_ORDERS_RAW,
    DELETE_PURCHASE_ORDER_RAW

} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_PURCHASE_ORDERS_RAW:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_PURCHASE_ORDER_RAW:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_PURCHASE_ORDER_RAW:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_PURCHASE_ORDER_RAW:
            return { ...state, [action.payload._id]: action.payload };
        case DELETE_PURCHASE_ORDER_RAW:
            return _.omit(state.action);
        default:
            return state;
    }
}