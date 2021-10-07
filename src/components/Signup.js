import React, { Component } from 'react'
import { connect } from 'react-redux';
import './LoginSignup.css';
import { clearAuthState, signup } from '../actions/auth';
import { Redirect } from 'react-router';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            name: ''
        }
    }

    componentWillUnmount() {
        this.props.dispatch(clearAuthState());
        //When the component is unmounted, this action will clear the 'error' in state
    }

    handleSignupForm = (e) => {
        e.preventDefault();
        console.log("State signup: ", this.state);
        const { email, password, confirmPassword, name } = this.state;

        if (name && email && password && confirmPassword) {
            this.props.dispatch(signup(email, password, confirmPassword, name));
        }
    }


    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
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
    handleConfirmPasswordChange = (e) => {
        this.setState({
            confirmPassword: e.target.value
        })
    }

    render() {
        const { error, inProgress, isLoggedin } = this.props.auth;

        if (isLoggedin) {
            return <Redirect to="/" />
        }
        return (
            <form className="login-form">
                <h1 className='login-signup-header'>Signup to Codeial</h1>
                {error && <div>{error}</div>}
                <div className="field">
                    <label htmlFor="signup-name">Name</label>
                    <input type="text" name="name" id="signup-name" onChange={this.handleNameChange} />
                </div>
                <div className="field">
                    <label htmlFor="signup-email">Email</label>
                    <input type="email" name="email" id="signup-email" onChange={this.handleEmailChange} value={this.state.email} />
                </div>
                <div className="field">
                    <label htmlFor="signup-password">Password</label>
                    <input type="password" name="password" id="signup-password" onChange={this.handlePasswordChange} value={this.state.password} />
                </div>
                <div className="field">
                    <label htmlFor="confirm-password">Confirm password</label>
                    <input type="password" name="confirm-password" id="confirm-password" onChange={this.handleConfirmPasswordChange} />
                </div>
                <div className="field">
                    {inProgress ?
                        <button onClick={this.handleSignupForm}>Signing Up...</button>
                        :
                        <button onClick={this.handleSignupForm}>Sign Up</button>
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

export default connect(mapStateToProps)(Signup)