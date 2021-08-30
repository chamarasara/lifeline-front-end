import _ from 'lodash';
import {
    NEW_GRN_RM_INVENTORY,
    NEW_GRN_RM_INVENTORY_ERROR,
    FETCH_GRN_RM_INVENTORY,
    FETCH_GRNS_RM_INVENTORY,
    SEARCH_GRN_RMS_INVENTORY,
    GRN_BY_PURCHASE_ORDER_RM

} from '../../actions/types';

export default (state = {  }, action) => {
    switch (action.type) {
        case FETCH_GRNS_RM_INVENTORY:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_GRN_RM_INVENTORY:
            return { ...state, [action.payload.id]: action.payload };
        case GRN_BY_PURCHASE_ORDER_RM:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case NEW_GRN_RM_INVENTORY:
            return { ...state, [action.payload.id]: action.payload };
        case NEW_GRN_RM_INVENTORY_ERROR:
            return { ...state, [action.payload.id]: action.payload, success: false };
        case SEARCH_GRN_RMS_INVENTORY:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        default:
            return state;
    }
}