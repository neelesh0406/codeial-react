import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLike } from '../actions/posts';
import './Comment.css';

class Comment extends Component {
    handleCommentLikeClick = () => {
        const { comment, user } = this.props;
        this.props.dispatch(addLike(comment._id, 'Comment', user._id));
    }
    render() {
        const { comment, user } = this.props;

        const isCommentLikedByUser = comment.likes.includes(user._id); //true or false. Only valid when the user likes. After refresh this doesn't work

        return (
            <>
                <div className="post-comment">
                    <div className="post-comment-header">
                        <span ><Link to={`/user/${comment.user._id}`}>{comment.user.name}</Link></span>
                        <span className="text-mute">a minute ago</span>
                        <span >
                            {isCommentLikedByUser ?
                                <img src="https://cdn-icons-png.flaticon.com/512/2107/2107845.png" alt="" onClick={this.handleCommentLikeClick} />
                                :
                                <img src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" alt="" onClick={this.handleCommentLikeClick} />
                            }
                            {comment.likes.length} likes
                        </span>
                    </div>
                    <div>{comment.content}</div>
                </div>
            </>
        )
    }
}

function mapStateToProps({ auth }) {
    return {
        user: auth.user
    }
}
export default connect(mapStateToProps)(Comment);