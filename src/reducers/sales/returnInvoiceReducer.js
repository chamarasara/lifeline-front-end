import _ from 'lodash';
import {
    CREATE_RETURN_INVOICE,
    EDIT_RETURN_INVOICE,
    FETCH_RETURN_INVOICES,
    FETCH_RETURN_INVOICE,
    DELETE_RETURN_INVOICE,
    NO_RETURN_INVOICE

} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_RETURN_INVOICES:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_RETURN_INVOICE:
            return { ...state, [action.payload.invoiceId]: action.payload };
        case NO_RETURN_INVOICE:
            return { ...state, [action.payload]: action.payload };
        case CREATE_RETURN_INVOICE:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_RETURN_INVOICE:
            return { ...state, [action.payload._id]: action.payload };
        case DELETE_RETURN_INVOICE:
            return _.omit(state.action);
        default:
            return state;
    }
}