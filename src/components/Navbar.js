import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/auth';
import { fetchUser, userSearchStart } from '../actions/search';

import './Navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
        }
    }

    logOut = () => {
        localStorage.removeItem('token');
        this.props.dispatch(logoutUser());
    }

    handleChangeSearch = (e) => {
        this.setState({
            content: e.target.value
        })
        const { content: searchText } = this.state;
        this.props.dispatch(fetchUser(searchText));
    }

    handleSearchClick = () => {
        const { content: searchText } = this.state;
        this.props.dispatch(fetchUser(searchText));
    }

    handleListClick = () => {
        //empties the search box
        this.setState({
            content: '',
        })
        //collapses the list when a user is clicked
        this.props.dispatch(userSearchStart());
    }

    render() {
        const { auth, search } = this.props;

        return (
            <div className="nav-container">
                <nav className="nav">
                    <div className="left-nav">
                        <Link to='/'><img src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png" alt="logo" /></Link>
                    </div>
                    <div className="search-container">
                        <input type="text" placeholder="Search.." name="search" onChange={this.handleChangeSearch} value={this.state.content} />
                        <button type="button" onClick={this.handleSearchClick}><i className="fa fa-search"></i></button>

                        {/* Search results will be displayed only if there are any */}
                        {search.length > 0 && <div className="search-results">
                            <ul>
                                {search.map((user) => {
                                    return <li key={user._id}>
                                        <Link to={`/user/${user._id}`} onClick={this.handleListClick}>
                                            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="avatar" />
                                            <span>{user.name}</span>
                                        </Link>
                                    </li>
                                })}
                            </ul>
                        </div>}
                    </div>
                    <div className="right-nav">
                        {auth.isLoggedin && <div className="nav-user" >
                            <Link to='/settings'>
                                <img src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png" alt="user-avatar" id="user-avatar" />
                            </Link>
                            <span>{auth.user.name}</span>
                        </div>}
                        <ul className="nav-links">
                            {!auth.isLoggedin &&
                                <li><Link to='/login'>Log in</Link></li>}
                            {auth.isLoggedin &&
                                <li onClick={this.logOut}>Log out</li>}
                            {!auth.isLoggedin &&
                                <li><Link to='/signup'>Register</Link></li>}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        search: state.search.searchResult
    }
}

export default connect(mapStateToProps)(Navbar);