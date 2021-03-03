import _ from 'lodash';
import {
    NEW_EMPLOYEE,
    EDIT_EMPLOYEE,
    FETCH_EMPLOYEE,
    FETCH_EMPLOYEES,
    DELETE_EMPLOYEE

} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_EMPLOYEES:
            return { ...state, ..._.mapKeys(action.payload, '_id') };
        case FETCH_EMPLOYEE:
            return { ...state, [action.payload._id]: action.payload };
        case NEW_EMPLOYEE:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_EMPLOYEE:
            return { ...state, [action.payload._id]: action.payload };
        case DELETE_EMPLOYEE:
            return _.omit(state.action);
        default:
            return state;
    }
}