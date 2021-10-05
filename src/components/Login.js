import React, { Component } from 'react'
import './LoginSignup.css';

export default class Login extends Component {
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
        return (
            <form className="login-form">
                <h1 className='login-signup-header'>Login to Codeial</h1>
                <div className="field">
                    <label htmlFor="login-email">Email</label>
                    <input type="email" name="email" id="login-email" onChange={this.handleEmailChange} value={this.state.email} />
                </div>
                <div className="field">
                    <label htmlFor="login-password">Password</label>
                    <input type="password" name="password" id="login-password" onChange={this.handlePasswordChange} value={this.state.password} />
                </div>
                <div className="field">
                    <button onClick={this.handleLoginForm}>Login</button>
                </div>
            </form>
        )
    }
}

