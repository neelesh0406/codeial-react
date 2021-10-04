import React, { Component } from 'react'
import { PostsList } from './';

export default class Home extends Component {
    render() {
        const { posts } = this.props;
        return (
            <PostsList posts={posts} />
        )
    }
}
