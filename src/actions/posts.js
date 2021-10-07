import { APIUrls } from "../helpers/urls";
import { UPDATE_POSTS } from "./actionTypes";

//Action creators
export function fetchPosts() {
    return (dispatch) => {
        const url = APIUrls.fetchPosts();
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                console.log("data from fetchPosts: ", data);
                dispatch(updatePosts(data.data.posts))
            }
            )
    }
}

function updatePosts(posts) {
    return {
        type: UPDATE_POSTS,
        posts
    }
}