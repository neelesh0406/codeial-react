import React, { Component } from 'react'
import { connect } from 'react-redux';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';
import { addPost } from '../actions/posts';
import './CreatePost.css';

class CreatePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }
    handlePostText = (e) => {
        this.setState({
            text: e.target.value
        })
    }
    handleAddPost = async () => {
        //FETCH ASYN
        const { text } = this.state;
        const url = APIUrls.createPost;
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${getAuthTokenFromLocalStorage()}`
            },
            body: getFormBody({ content: text })
        }

        const response = await fetch(url, options);
        const data = await response.json();

        if (data.success) {
            //dispatch post data and concat to posts array for displaying
            this.props.dispatch(addPost(data.data.post))
        }
        //sets the text area to '' after posting
        this.setState({
            text: ''
        })
    }

    render() {
        return (
            <div className="create-post">
                <textarea onChange={this.handlePostText} value={this.state.text} id="create-post-text" cols="30" rows="3" placeholder="Enter text...."></textarea>
                <button onClick={this.handleAddPost} id="create-post-btn">Add post</button>
            </div>
        )
    }
}

export default connect()(CreatePost);