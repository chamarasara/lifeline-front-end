import _ from 'lodash';
import {
    CREATE_PURCHASE_ORDER,
    EDIT_PURCHASE_ORDER,
    FETCH_PURCHASE_ORDER,
    FETCH_PURCHASE_ORDERS,
    DELETE_PURCHASE_ORDER

} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_PURCHASE_ORDERS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_PURCHASE_ORDER:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_PURCHASE_ORDER:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_PURCHASE_ORDER:
            return { ...state, [action.payload._id]: action.payload };
        case DELETE_PURCHASE_ORDER:
            return _.omit(state.action);
        default:
            return state;
    }
}