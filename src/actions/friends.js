import { APIUrls } from "../helpers/urls";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";
import { FETCH_FRIENDS_SUCCESS } from "./actionTypes";

export function fetchFriends() {
    return (dispatch) => {
        const url = APIUrls.userFriends;
        fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${getAuthTokenFromLocalStorage()}`
            }
        })
            .then(response => response.json())
            .then((data) => {
                console.log("***data from fetch friends: ", data);
                if (data.success) {
                    dispatch(fetchFriendsSuccess(data.data.friends));
                    return;
                }
            }
            )
    }
}

export function fetchFriendsSuccess(friends) {
    return {
        type: FETCH_FRIENDS_SUCCESS,
        friends
    }
}