import React, { Component } from 'react'
import { connect } from 'react-redux';
import { clearAuthState, editUser } from '../actions/auth';
import './Settings.css';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            editMode: false
        }
    }

    handleChange = (fieldName, val) => {
        this.setState({
            [fieldName]: val
        })
    }

    handleSave = () => {
        const { name, password, confirmPassword } = this.state;
        const { user } = this.props.auth;

        if (name && password && confirmPassword && password === confirmPassword) {
            this.props.dispatch(editUser(name, password, confirmPassword, user._id))
            this.handleChange('editMode', false);
            return;
        }
    }

    componentWillUnmount() {
        this.props.dispatch(clearAuthState());
    }

    render() {
        const { editMode } = this.state;
        const { user, error } = this.props.auth;
        return (
            <div className="settings">
                <h1>User settings</h1>
                <div className="settings-container">
                    <div className="field user-img">
                        <img src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png" alt="user-avatar" />
                        <p>Update Image</p>
                    </div>

                    {error && <div className="alert error-dialog">{error}</div>}
                    {error === false && <div className="alert success-dialog">User updated successfuly</div>}
                    <div className="field">
                        <label htmlFor="">Email</label>
                        <p>{user.email}</p>
                    </div>
                    <div className="field">
                        <label htmlFor="">Name</label>
                        {editMode ?
                            <input type="text" name="name" id="" onChange={(e) => this.handleChange('name', e.target.value)} value={this.state.name} />
                            :
                            <p>{user.name}</p>
                        }
                    </div>
                    {editMode && <div className="field">
                        <label >Password</label>
                        <input type="password" name="password" onChange={(e) => this.handleChange('password', e.target.value)} value={this.state.password} />
                    </div>}
                    {editMode && <div className="field">
                        <label >Confirm password</label>
                        <input type="password" name="confirm-password" onChange={(e) => this.handleChange('confirmPassword', e.target.value)} value={this.state.confirmPassword} />
                    </div>}
                    <div>
                        {editMode ?
                            <><button className="settings-btn" onClick={this.handleSave}>Save</button>
                                <p id="go-back" onClick={() => this.handleChange('editMode', false)}>Go back</p></>
                            :
                            <button onClick={() => this.handleChange('editMode', true)} className="settings-btn">Edit Profile</button>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Settings);