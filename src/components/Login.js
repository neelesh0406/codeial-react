import React, { Component } from 'react'
import './LoginSignup.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.isEmail = React.createRef();
        this.isPassword = React.createRef();
        //Uncontrolled Components
    }
    handleLoginForm = (e) => {
        e.preventDefault();
        console.log('this.isEmail: ', this.isEmail.current.value);
        console.log('this.isPassword: ', this.isPassword.current.value);
    }
    render() {
        return (
            <form className="login-form">
                <h1 className='login-signup-header'>Login to Codeial</h1>
                <div className="field">
                    <label htmlFor="login-email">Email</label>
                    <input type="email" name="email" id="login-email" ref={this.isEmail} />
                </div>
                <div className="field">
                    <label htmlFor="login-password">Password</label>
                    <input type="password" name="password" id="login-password" ref={this.isPassword} />
                </div>
                <div className="field">
                    <button onClick={this.handleLoginForm}>Login</button>
                </div>
            </form>
        )
    }
}

