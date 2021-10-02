import { UPDATE_POSTS } from "./actionTypes";

//Action creators
export function fetchPosts() {
    return (dispatch) => {
        const url = "http://codeial.codingninjas.com:8000/api/v2/posts?page=1&limit=5";
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                console.log("DATA: ", data);
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