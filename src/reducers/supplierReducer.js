import _ from 'lodash';
import {
    CREATE_SUPPLIER,
    EDIT_SUPPLIER,
    FETCH_SUPPLIER,
    FETCH_SUPPLIERS,
    DELETE_SUPPLIER

} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_SUPPLIERS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_SUPPLIER:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_SUPPLIER:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_SUPPLIER:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_SUPPLIER:
            return _.omit(state.action);
        default:
            return state;
    }
}