
import { AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR } from '../actions/types';
const initialState = {
    token: null,
    authenticated: false
}
export default (state = initialState, action) => {
    
    switch (action.type) {
        case AUTHENTICATED:
            sessionStorage.setItem('user', action.payload.token);
            return { ...state, token: action.payload.token, authenticated: true };
        case UNAUTHENTICATED:
            return { ...state, authenticated: false };
        case AUTHENTICATION_ERROR:
            sessionStorage.removeItem('user');          
            return { ...state, error: action.payload, authenticated: false };
        default:
            return state;
    }
}
