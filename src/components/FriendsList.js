import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFriends } from '../actions/friends';
import './FriendsList.css';

class FriendsList extends Component {
    componentDidMount() {
        this.props.dispatch(fetchFriends());
    }
    render() {
        console.log("Frinds ki list, sab props, state", this.props);
        return (
            <div className="friends-list-container">
                <h1>Friends</h1>

                {this.props.friends.length > 0 &&
                    <div className="friends-list">
                        {this.props.friends.map((friend) => {
                            return <Link to={`/user/${friend.to_user._id}`} className="friend-wrapper" key={friend.to_user._id}>
                                <img src="https://cdn-icons-png.flaticon.com/512/1674/1674291.png" alt="avatar" />
                                <span>{friend.to_user.name}</span>
                            </Link>
                        })
                        }
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        friends: state.friends
    }
}
export default connect(mapStateToProps)(FriendsList);