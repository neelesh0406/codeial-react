import React, { Component } from 'react'
import { PostsList, FriendsList, Chat } from './';

export default class Home extends Component {
    render() {
        const { posts, isLoggedin } = this.props;
        return (
            <>
                <PostsList posts={posts} isLoggedin={isLoggedin} />
                {isLoggedin && <FriendsList />}
                {isLoggedin && <Chat />}
            </>
        )
    }
}
