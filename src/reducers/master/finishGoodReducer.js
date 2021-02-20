import _ from 'lodash';
import {
    CREATE_FG_MATERIAL,
    EDIT_FG_MATERIAL,
    FETCH_FG_MATERIAL,
    FETCH_FG_MATERIALS,
    DELETE_FG_MATERIAL

} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_FG_MATERIALS:
            return { ...state, ..._.mapKeys(action.payload, '_id') };
        case FETCH_FG_MATERIAL:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_FG_MATERIAL:
            return { ...state, [action.payload._id]: action.payload };
        case EDIT_FG_MATERIAL:
            return { ...state, [action.payload._id]: action.payload };
        case DELETE_FG_MATERIAL:
            return _.omit(state.action);
        default:
            return state;
    }
}