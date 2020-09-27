import _ from 'lodash';
import {
    CREATE_USER_ROLE,
    EDIT_USER_ROLE,
    FETCH_USERS_ROLES,
    FETCH_USER_ROLE,
    DELETE_USER_ROLE,

} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_USERS_ROLES:
            return { ...state, ..._.mapKeys(action.payload, '_id') };
        case FETCH_USER_ROLE:
            return { ...state, [action.payload._id]: action.payload };
        case CREATE_USER_ROLE:
            return { ...state, [action.payload._id]: action.payload };
        case EDIT_USER_ROLE:
            return { ...state, [action.payload._id]: action.payload };
        case DELETE_USER_ROLE:
            return _.omit(state.action);
        default:
            return state;
    }
}