import _ from 'lodash';
import {
    CREATE_BOM,
    EDIT_BOM,
    FETCH_BOMS,
    FETCH_BOM,
    DELETE_BOM

} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_BOMS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_BOM:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_BOM:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_BOM:
            return { ...state, [action.payload._id]: action.payload };
        case DELETE_BOM:
            return _.omit(state.action);
        default:
            return state;
    }
}