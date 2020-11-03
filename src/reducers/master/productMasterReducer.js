import _ from 'lodash';
import {
    CREATE_PRODUCT_MASTER,
    EDIT_PRODUCT_MASTER,
    FETCH_PRODUCT_MASTER,
    FETCH_PRODUCTS_MASTER,
    DELETE_PRODUCT_MASTER

} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_MASTER:
            return { ...state, ..._.mapKeys(action.payload, '_id') };
        case FETCH_PRODUCT_MASTER:
            return { ...state, [action.payload._id]: action.payload };
        case CREATE_PRODUCT_MASTER:
            return { ...state, [action.payload._id]: action.payload };
        case EDIT_PRODUCT_MASTER:
            return { ...state, [action.payload._id]: action.payload };
        case DELETE_PRODUCT_MASTER:
            return _.omit(state.action);
        default:
            return state;
    }
}