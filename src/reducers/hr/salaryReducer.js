import _ from 'lodash';
import {
    NEW_SALARY,
    EDIT_SALARY,
    FETCH_SALARY,
    FETCH_SALARIES,
    DELETE_SALARY

} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_SALARIES:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_SALARY:
            return { ...state, [action.payload.id]: action.payload };
        case NEW_SALARY:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_SALARY:
            return { ...state, [action.payload._id]: action.payload };
        case DELETE_SALARY:
            return _.omit(state.action);
        default:
            return state;
    }
}