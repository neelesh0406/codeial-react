import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import './Navbar.css';

export default class Navbar extends Component {
    render() {
        return (
            <div className="nav-container">
                <nav className="nav">
                    <div className="left-nav">
                        <Link to='/'><img src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png" alt="logo" /></Link>
                    </div>
                    <div className="search-container">
                        <input type="text" placeholder="Search.." name="search" onChange={this.handleChangeSearch} />
                        <button type="button"><i className="fa fa-search"></i></button>

                        {/* <div className="search-results">
                            <ul>
                                <li>
                                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="avatar" />
                                    <span>Lala lajpat</span>
                                </li>
                                <li>
                                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="avatar" />
                                    <span>Lala lajpat</span>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                    <div className="right-nav">
                        <div className="nav-user">
                            <img src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png" alt="user-avatar" id="user-avatar" />
                            <span>Johny Doe</span>
                        </div>
                        <ul className="nav-links">
                            <li><Link to='/login'>Log in</Link></li>
                            <li><Link to='/logout'>Log out</Link></li>
                            <li><Link to='/signup'>Register</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
