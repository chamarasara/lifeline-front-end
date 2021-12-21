import _ from 'lodash';
import {
    CREATE_INVOICE,
    EDIT_INVOICE,
    FETCH_INVOICES,
    FETCH_INVOICE,
    DELETE_INVOICE,
    NEW_BANK_PAYMENT_INVOICE,
    NEW_CASH_PAYMENT_INVOICE

} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_INVOICES:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_INVOICE:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_INVOICE:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_INVOICE:
            return { ...state, [action.payload._id]: action.payload };
        case NEW_BANK_PAYMENT_INVOICE:
            return { ...state, [action.payload.id]: action.payload };
        case NEW_CASH_PAYMENT_INVOICE:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_INVOICE:
            return _.omit(state.action);
        default:
            return state;
    }
}