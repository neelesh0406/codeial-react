import React, { Component } from 'react'
import './PostsList.css'

export default class PostsList extends Component {
    render() {
        const { posts } = this.props;
        return (
            <div className="posts-list" >
                {posts.map((post) => {
                    return <div className="post-wrapper" key={post._id}>
                        {/* Post wrapper divided into sections */}
                        {/* header contains user avatar, name, the time when post was created */}
                        <div className="post-header">
                            <img className="post-header-avatar" src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png" alt="" />
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
                            <img src="https://img-premium.flaticon.com/png/512/2040/premium/2040474.png?token=exp=1633190950~hmac=d278f9b2c47ad05af005f80c54f4fde0" alt="" />
                            <span>3</span>
                        </div>
                        {/* Input box to comment on the post */}
                        <div className="post-comment-box">
                            <input type="text" name="" id="" />
                            <button>Comment</button>
                        </div>
                        {/* Area where comments will be displayed */}
                        <div className="post-comments-display">
                            <div className="post-comment">
                                <div>
                                    <span>Bill</span>
                                    <span className="text-mute">a minute ago</span>
                                    <span>11</span>
                                </div>
                                <div>Comment content</div>
                            </div>
                            <div className="post-comment">
                                <div>
                                    <span>Bill</span>
                                    <span className="text-mute">a minute ago</span>
                                    <span>11</span>
                                </div>
                                <div>Comment content</div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        )
    }
}
