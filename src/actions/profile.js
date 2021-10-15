import { FETCH_USER_PROFILE, USER_PROFILE_FAILURE, USER_PROFILE_SUCCESS } from "./actionTypes";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";
import { APIUrls } from '../helpers/urls';

export function userProfileSuccess(user) {
    return {
        type: USER_PROFILE_SUCCESS,
        user
    }
}
export function userProfileFail(error) {
    return {
        type: USER_PROFILE_FAILURE,
        error
    }
}
export function startUserProfileFetch() {
    return {
        type: FETCH_USER_PROFILE
    }
}

export function fetchUserProfile(userId) {
    return (dispatch) => {
        dispatch(startUserProfileFetch());

        const url = APIUrls.userProfile(userId);
        fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${getAuthTokenFromLocalStorage()}`
            }
        })
            .then(response => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch(userProfileSuccess(data.data.user));
                    return;
                }
                dispatch(userProfileFail(data.message));
                return;
            })
    }
}