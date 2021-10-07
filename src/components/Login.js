import React, { Component } from 'react'
import { connect } from 'react-redux';
import { login } from '../actions/auth';

import './LoginSignup.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
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
        const { error, inProgress } = this.props.auth;
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
