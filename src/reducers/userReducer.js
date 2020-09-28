import _ from 'lodash';
import {
    CREATE_USER,
    EDIT_USER,
    FETCH_USERS,
    FETCH_USER,
    DELETE_USER,

} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return { ...state, ..._.mapKeys(action.payload, '_id') };
        case FETCH_USER:
            return { ...state, [action.payload._id]: action.payload };
        case CREATE_USER:
            return { ...state, [action.payload._id]: action.payload };
        case EDIT_USER:
            return { ...state, [action.payload._id]: action.payload };
        case DELETE_USER:
            return _.omit(state.action);
        default:
            return state;
    }
}