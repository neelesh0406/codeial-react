import { APIUrls } from "../helpers/urls";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";
import { FETCH_USER_SEARCH_START, FETCH_USER_SEARCH_SUCCESS } from "./actionTypes";

export function fetchUser(searchText) {
    return (dispatch) => {
        userSearchStart();

        const url = APIUrls.searchUser(searchText);
        fetch(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${getAuthTokenFromLocalStorage()}`
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch(userSearch(data.data.users));
                }
            })
    }
}

export function userSearchStart() {
    return {
        type: FETCH_USER_SEARCH_START,
    }
}
export function userSearch(users) {
    return {
        type: FETCH_USER_SEARCH_SUCCESS,
        users
    }
}