import _ from 'lodash';
import {
    CREATE_PACKING_MATERIAL,
    EDIT_PACKING_MATERIAL,
    FETCH_PACKING_MATERIAL,
    FETCH_PACKING_MATERIALS,
    DELETE_PACKING_MATERIAL

} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_PACKING_MATERIALS:
            return { ...state, ..._.mapKeys(action.payload, '_id') };
        case FETCH_PACKING_MATERIAL:
            return { ...state, [action.payload._id]: action.payload };
        case CREATE_PACKING_MATERIAL:
            return { ...state, [action.payload._id]: action.payload };
        case EDIT_PACKING_MATERIAL:
            return { ...state, [action.payload._id]: action.payload };
        case DELETE_PACKING_MATERIAL:
            return _.omit(state.action);
        default:
            return state;
    }
}