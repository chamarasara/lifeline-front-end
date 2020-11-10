import _ from 'lodash';
import {
    SEARCH_INVOICES_RESULT

} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case SEARCH_INVOICES_RESULT:
            return { ...state, ..._.mapKeys(action.payload, '_id') };               
        default:
            return state;
    }
}
