import React, { Component } from 'react'
import './UserProfile.css';

import { fetchUserProfile } from '../actions/profile';
import { connect } from 'react-redux';
import Loader from './Loader';

class UserProfile extends Component {
    componentDidMount() {
        const { match } = this.props;
        if (match.params.userId) {
            //If a user id is passed in props => match => params
            //dispatch an action
            this.props.dispatch(fetchUserProfile(match.params.userId));
        }
        console.log("***lalalal", this.props.profile.user);
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
                            {/* {false ?
                                <button className="friend-btn" onClick={this.handleFriend} value={user._id}>Unfriend</button>
                                :
                                <button className="friend-btn" onClick={this.handleFriendship}>Add friend</button>
                            } */}
                            <button className="friend-btn" onClick={this.handleFriendship} value={user._id}>Add friend</button>
                        </div>
                    </div>
                </div >
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps)(UserProfile);