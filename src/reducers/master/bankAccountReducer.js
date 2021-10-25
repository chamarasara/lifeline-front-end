import _ from 'lodash';
import {
    NEW_BANK_ACCOUNT_MASTER,
    EDIT_BANK_ACCOUNT,
    FETCH_SINGLE_BANK_ACCOUNT,
    FETCH_ALL_BANK_ACCOUNTS,
    DELETE_BANK_ACCOUNT

} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_ALL_BANK_ACCOUNTS:
            return { ...state, ..._.mapKeys(action.payload, '_id') };
        case FETCH_SINGLE_BANK_ACCOUNT:
            return { ...state, [action.payload._id]: action.payload };
        case NEW_BANK_ACCOUNT_MASTER:
            return { ...state, [action.payload._id]: action.payload };
        case EDIT_BANK_ACCOUNT:
            return { ...state, [action.payload._id]: action.payload };
        case DELETE_BANK_ACCOUNT:
            return { ...state, [action.payload._id]: action.payload };
        default:
            return state;
    }
}