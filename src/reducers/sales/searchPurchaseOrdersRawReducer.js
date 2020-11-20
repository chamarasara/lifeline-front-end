import _ from 'lodash';
import {
    SEARCH_PURCHASE_ORDERS_RESULT_RAW

} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case SEARCH_PURCHASE_ORDERS_RESULT_RAW:
            return { ...state, ..._.mapKeys(action.payload, '_id') };               
        default:
            return state;
    }
}
