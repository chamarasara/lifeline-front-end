import _ from 'lodash';
import {
    SEARCH_PURCHASE_ORDERS_RESULT,
    SEARCH_PURCHASE_ORDERS_TEXT

} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case SEARCH_PURCHASE_ORDERS_RESULT:
            return { ...state, ..._.mapKeys(action.payload, '_id') };
        // case SEARCH_PURCHASE_ORDERS_TEXT:
        //     return { ...state, searchText: action.payload };                
        default:
            return state;
    }
}
