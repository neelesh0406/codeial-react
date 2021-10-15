import { FETCH_USER_SEARCH_START, FETCH_USER_SEARCH_SUCCESS } from "../actions/actionTypes";

const initialSearchState = {
    searchResult: [],
}

export default function search(state = initialSearchState, action) {
    switch (action.type) {
        case FETCH_USER_SEARCH_START:
            return {
                searchResult: [],
            };
        case FETCH_USER_SEARCH_SUCCESS:
            return {
                searchResult: action.users,
            };
        default:
            return state;
    }
}