import React, { Component } from 'react'
import './PostsList.css'
import PropTypes from 'prop-types';
import { CreatePost } from '.';
import { Post } from './';

export default class PostsList extends Component {
    render() {
        const { posts, isLoggedin } = this.props;
        return (
            <div className="posts-list" >
                <h1>Posts</h1>
                {/* Component for creating post */}
                {isLoggedin && <CreatePost />}
                {posts.map((post) => {
                    return <Post post={post} key={post._id} />
                })
                }
            </div >
        )
    }
}

PostsList.propTypes = {
    posts: PropTypes.array.isRequired
}