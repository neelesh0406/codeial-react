import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createComment } from '../actions/posts';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';
import { Comment } from './';
import './Post.css';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentContent: ''
        }
    }
    handleCommentChange = (e) => {
        this.setState({
            commentContent: e.target.value
        });
    }

    handleCreateComment = async () => {
        const { commentContent } = this.state;
        const url = APIUrls.createComment;
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${getAuthTokenFromLocalStorage()}`
            },
            body: getFormBody({ content: commentContent, post_id: this.props.post._id })
        }

        const response = await fetch(url, options);
        const data = await response.json();

        if (data.success) {
            //dispatch data.data.comment, post._id wale post mai store
            this.props.dispatch(createComment(data.data.comment, this.props.post._id));
        }

        this.setState({
            commentContent: ''
        })
    }

    render() {
        const { post } = this.props;
        return (
            <div className="post-wrapper">
                {/* Post wrapper divided into sections */}
                {/* header contains user avatar, name, the time when post was created */}
                <div className="post-header">
                    <Link to={`/user/${post.user._id}`} >
                        <img className="post-header-avatar" src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png" alt="avatar" />
                        {/* when clicked redirect to API_ROOT/users/{post.user._id} */}
                    </Link>
                    <div>
                        <p>{post.user.name}</p>
                        <p className="text-mute">a minute ago</p>
                    </div>
                </div>
                {/* This conatains the content of the post */}
                <div className="post-content">
                    {post.content}
                </div>
                {/* Actions: Like and comment */}
                <div className="post-actions">
                    <img src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" alt="" />
                    <span>54</span>
                    <img src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png" alt="" />
                    <span>3</span>
                </div>
                {/* Input box to comment on the post */}
                <div className="post-comment-box">
                    <input type="text" onChange={this.handleCommentChange} value={this.state.commentContent} placeholder="Comment..." />
                    <button onClick={this.handleCreateComment}>Comment</button>
                </div>
                {/* Area where comments will be displayed */}
                {/* Only show if length of comments array is greater than 0 */}
                {post.comments.length > 0 && <div className="post-comments-display">
                    {post.comments.map((comment) => {
                        return <Comment comment={comment} key={comment._id} />
                    })}
                </div>}
            </div>
        )
    }
}

export default connect()(Post);