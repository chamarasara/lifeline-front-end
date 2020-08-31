import _ from 'lodash';
import {
    CREATE_CUSTOMER,
    EDIT_CUSTOMER,
    FETCH_CUSTOMER,
    FETCH_CUSTOMERS,
    DELETE_CUSTOMER

} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_CUSTOMERS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_CUSTOMER:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_CUSTOMER:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_CUSTOMER:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_CUSTOMER:
            return _.omit(state.action);
        default:
            return state;
    }
}