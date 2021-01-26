import _ from 'lodash';
import {
    NEW_FINISH_GOOD_INVENTORY,
    EDIT_FINISH_GOOD_INVENTORY,
    FETCH_FINISH_GOOD_INVENTORY,
    FETCH_FINISH_GOODS_INVENTORY,
    DISABLE_FINISH_GOOD_INVENTORY,
    SEARCH_FINISH_GOODS_INVENTORY

} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_FINISH_GOODS_INVENTORY:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_FINISH_GOOD_INVENTORY:
            return { ...state, [action.payload.id]: action.payload };
        case NEW_FINISH_GOOD_INVENTORY:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_FINISH_GOOD_INVENTORY:
            return { ...state, [action.payload._id]: action.payload };
        case DISABLE_FINISH_GOOD_INVENTORY:
            return { ...state, [action.payload._id]: action.payload };
        case SEARCH_FINISH_GOODS_INVENTORY:
            return { ...state, ..._.mapKeys(action.payload, 'id') };   
        default:
            return state;
    }
}