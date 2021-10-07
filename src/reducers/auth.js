import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, AUTHENTICATE_USER, LOG_OUT, SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAILED } from '../actions/actionTypes';

const initialAuthState = {
    user: {},
    error: null,
    isLoggedin: false,
    inProgress: false
}

export default function auth(state = initialAuthState, action) {
    switch (action.type) {
        case LOGIN_START:
            return {
                ...state,
                inProgress: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.user,
                isLoggedin: true,
                inProgress: false,
                error: null
            };
        case LOGIN_FAILED:
            return {
                ...state,
                inProgress: false,
                error: action.error
            };
        case AUTHENTICATE_USER:
            return {
                ...state,
                user: action.user,
                isLoggedin: true
            }
        case LOG_OUT:
            return {
                ...state,
                user: {},
                isLoggedin: false
            }
        case SIGNUP_START:
            return {
                ...state,
                inProgress: true
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                inProgress: false
            }
        case SIGNUP_FAILED:
            return {
                ...state,
                inProgress: false,
                error: action.error
            }
        default:
            return state;
    }
}

