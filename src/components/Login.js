import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { clearAuthState, login } from '../actions/auth';

import './LoginSignup.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    componentWillUnmount() {
        this.props.dispatch(clearAuthState());
        //When the component is unmounted, this action will clear the 'error' in state
    }

    handleLoginForm = (e) => {
        e.preventDefault();
        console.log(this.state);
        const { email, password } = this.state;

        if (email && password) {
            this.props.dispatch(login(email, password));   //dispatches the email and password to the auth action creator
        }
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        const { error, inProgress, isLoggedin } = this.props.auth;

        const { from } = this.props.location.state || { from: { pathname: '/' } };  //To solve redirecting problem for /settings

        if (isLoggedin) {
            return <Redirect to={from} />
        }
        return (
            <form className="login-form">
                <h1 className='login-signup-header'>Login to Codeial</h1>
                {error && <div>Invalid username/password</div>}
                <div className="field">
                    <label htmlFor="login-email">Email</label>
                    <input type="email" name="email" id="login-email" onChange={this.handleEmailChange} value={this.state.email} />
                </div>
                <div className="field">
                    <label htmlFor="login-password">Password</label>
                    <input type="password" name="password" id="login-password" onChange={this.handlePasswordChange} value={this.state.password} />
                </div>
                <div className="field">
                    {inProgress ?
                        <button onClick={this.handleLoginForm}>Logging in...</button>
                        :
                        <button onClick={this.handleLoginForm}>Login</button>
                    }
                </div>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Login)
