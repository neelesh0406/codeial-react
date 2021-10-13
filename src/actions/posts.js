import { APIUrls } from "../helpers/urls";
import { ADD_COMMENT, ADD_POST, UPDATE_POSTS } from "./actionTypes";

//Action creators
export function fetchPosts() {
    return (dispatch) => {
        const url = APIUrls.fetchPosts();
        fetch(url)
            .then(response => response.json())
            .then((data) => {
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

export function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
}

//Creating comment
export function createComment(comment, postId) {
    return {
        type: ADD_COMMENT,
        comment,
        postId
    }
}