import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './Comment.css';

export default class Comment extends Component {
    render() {
        const { comment } = this.props;
        return (
            <>
                <div className="post-comment">
                    <div className="post-comment-header">
                        <span ><Link to={`/user/${comment.user._id}`}>{comment.user.name}</Link></span>
                        <span className="text-mute">a miute ago</span>
                        <span >{comment.likes.length} likes</span>
                    </div>
                    <div>{comment.content}</div>
                </div>
            </>
        )
    }
}
