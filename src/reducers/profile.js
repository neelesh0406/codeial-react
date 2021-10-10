import { FETCH_USER_PROFILE, USER_PROFILE_SUCCESS, USER_PROFILE_FAILURE } from "../actions/actionTypes";

const intialProfileState = {
    user: {},
    error: null,
    success: null,
    inProgress: false
}

export default function profile(state = intialProfileState, action) {
    switch (action.type) {
        case FETCH_USER_PROFILE:
            return {
                ...state,
                inProgress: true
            };
        case USER_PROFILE_SUCCESS:
            return {
                ...state,
                success: true,
                user: action.user,
                inProgress: false
            };
        case USER_PROFILE_FAILURE:
            return {
                ...state,
                success: false,
                inProgress: false,
                error: action.error
            };
        default:
            return state;
    }
}