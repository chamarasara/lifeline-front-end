import _ from 'lodash';
import {
    CREATE_RAW_MATERIAL,
    EDIT_RAW_MATERIAL,
    FETCH_RAW_MATERIAL,
    FETCH_RAW_MATERIALS,
    DELETE_RAW_MATERIAL

} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_RAW_MATERIALS:
            return { ...state, ..._.mapKeys(action.payload, '_id') };
        case FETCH_RAW_MATERIAL:
            return { ...state, [action.payload._id]: action.payload };
        case CREATE_RAW_MATERIAL:
            return { ...state, [action.payload._id]: action.payload };
        case EDIT_RAW_MATERIAL:
            return { ...state, [action.payload._id]: action.payload };
        case DELETE_RAW_MATERIAL:
            return _.omit(state.action);
        default:
            return state;
    }
}