import _ from 'lodash';
import {
    NEW_GRN_PM_INVENTORY,
    FETCH_GRN_PM_INVENTORY,
    FETCH_GRNS_PM_INVENTORY,
    SEARCH_GRN_PMS_INVENTORY,
    GRN_BY_PURCHASE_ORDER_PM

} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_GRNS_PM_INVENTORY:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_GRN_PM_INVENTORY:
            return { ...state, [action.payload.id]: action.payload };
        case GRN_BY_PURCHASE_ORDER_PM:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case NEW_GRN_PM_INVENTORY:
            return { ...state, [action.payload.id]: action.payload };
        case SEARCH_GRN_PMS_INVENTORY:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        default:
            return state;
    }
}