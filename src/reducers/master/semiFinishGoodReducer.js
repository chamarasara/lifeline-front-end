import _ from 'lodash';
import {
    CREATE_SFG_MATERIAL,
    EDIT_SFG_MATERIAL,
    FETCH_SFG_MATERIAL,
    FETCH_SFG_MATERIALS,
    DELETE_SFG_MATERIAL

} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_SFG_MATERIALS:
            return { ...state, ..._.mapKeys(action.payload, '_id') };
        case FETCH_SFG_MATERIAL:
            return { ...state, [action.payload._id]: action.payload };
        case CREATE_SFG_MATERIAL:
            return { ...state, [action.payload._id]: action.payload };
        case EDIT_SFG_MATERIAL:
            return { ...state, [action.payload._id]: action.payload };
        case DELETE_SFG_MATERIAL:
            return _.omit(state.action);
        default:
            return state;
    }
}