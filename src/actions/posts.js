import { APIUrls } from "../helpers/urls";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";
import { ADD_COMMENT, ADD_POST, UPDATE_COMMENT_LIKE, UPDATE_POSTS, UPDATE_POST_LIKE } from "./actionTypes";

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

//Likes
export function addLike(id, likeType, userId) {
    return (dispatch) => {
        const url = APIUrls.toggleLike(id, likeType);

        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${getAuthTokenFromLocalStorage()}`
            }
        })
            .then(response => response.json())
            .then((data) => {
                if (data.success) {
                    if (likeType === 'Post') {
                        dispatch(addPostLikeToStore(id, userId));
                    }
                    if (likeType === 'Comment') {
                        dispatch(addCommentLikeToStore(id, userId));
                    }
                    return;
                }
            })
    }
}

export function addPostLikeToStore(postId, userId) {
    return {
        type: UPDATE_POST_LIKE,
        postId,
        userId
    }
}
export function addCommentLikeToStore(commentId, userId) {
    return {
        type: UPDATE_COMMENT_LIKE,
        commentId,
        userId
    }
}