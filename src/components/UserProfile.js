import React, { Component } from 'react'
import './UserProfile.css';

import { fetchUserProfile } from '../actions/profile';
import { connect } from 'react-redux';
import Loader from './Loader';
import { APIUrls } from '../helpers/urls';
import { addFriend, removeFriend } from '../actions/friends';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: null,
            error: null
        }
        //if the add friend action is success or failure
    }
    componentDidMount() {
        const { match } = this.props;
        if (match.params.userId) {
            //If a user id is passed in props => match => params
            //dispatch an action
            this.props.dispatch(fetchUserProfile(match.params.userId));
        }
    }

    handleAddFriendClick = async () => {
        const userId = this.props.match.params.userId;
        const url = APIUrls.addFriendship(userId);

        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${getAuthTokenFromLocalStorage()}`
            }
        }
        const response = await fetch(url, options);
        const data = await response.json();

        if (data.success) {
            this.setState({
                success: data.message
            })

            this.props.dispatch(addFriend(data.data.friendship));
        } else {
            this.setState({
                success: null,
                error: data.message
            })
        }
    }

    handleRemoveFriendClick = async () => {
        const userId = this.props.match.params.userId;
        const url = APIUrls.removeFriendship(userId);

        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${getAuthTokenFromLocalStorage()}`
            }
        }
        const response = await fetch(url, options);
        const data = await response.json();

        if (data.success) {
            this.setState({
                success: data.message
            })

            this.props.dispatch(removeFriend(userId));
        } else {
            this.setState({
                success: null,
                error: data.message
            })
        }
    }

    //Returns true or false depending if this user is a friend
    checkIfUserIsAFriend = () => {
        const { match, friends } = this.props;
        const userId = match.params.userId;

        const index = friends.map((friend) => friend.to_user._id).indexOf(userId);

        if (index !== -1) {
            return true;
        }

        return false;
    }

    render() {
        const { user, inProgress, error } = this.props.profile;

        if (inProgress) {
            return <Loader />
        }
        if (error) {
            return <h1 className="alert error-dialog">{error}</h1>
            //displays error if success:false is returned from the server API
        }

        const ifUserIsAFriend = this.checkIfUserIsAFriend();

        return (
            <>
                <div className="user">
                    <div className="user-container">
                        <div className="user-field user-img">
                            <img src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png" alt="user-avatar" />
                        </div>
                        <div className="user-field">
                            <label>Name</label>
                            <p>{user.name}</p>
                        </div>

                        <div className="user-field">
                            <label>Email</label>
                            < p > {user.email} </p>
                        </div>

                        <div>
                            {!ifUserIsAFriend ?
                                <button className="friend-btn" onClick={this.handleAddFriendClick}>Add friend</button>
                                :
                                <button className="friend-btn" onClick={this.handleRemoveFriendClick}>Remove friend</button>
                            }
                            {this.state.error && <div className="alert error-dialog">{this.state.error}</div>}
                            {this.state.success && <div className="alert success-dialog">{this.state.success}</div>}
                        </div>
                    </div>
                </div >
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profile,
        friends: state.friends
    }
}

export default connect(mapStateToProps)(UserProfile);