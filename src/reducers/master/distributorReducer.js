import _ from 'lodash';
import {
    NEW_DISTRIBUTOR,
    EDIT_DISTRIBUTOR,
    FETCH_DISTRIBUTOR,
    FETCH_DISTRIBUTORS,
    DELETE_DISTRIBUTOR

} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_DISTRIBUTORS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_DISTRIBUTOR:
            return { ...state, [action.payload.id]: action.payload };
        case NEW_DISTRIBUTOR:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_DISTRIBUTOR:
            return { ...state, [action.payload._id]: action.payload };
        case DELETE_DISTRIBUTOR:
            return _.omit(state.action);
        default:
            return state;
    }
}