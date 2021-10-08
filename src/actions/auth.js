import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, SIGNUP_SUCCESS, SIGNUP_START, SIGNUP_FAILED, AUTHENTICATE_USER, LOG_OUT, CLEAR_AUTH_STATE } from './actionTypes';
import { APIUrls } from '../helpers/urls';
import { getFormBody } from '../helpers/utils';


export function startLogin() {
    return {
        type: LOGIN_START
    }
}

export function loginFailed(errorMessage) {
    return {
        type: LOGIN_FAILED,
        error: errorMessage
    }
}

export function loginSuccessful(user) {
    return {
        type: LOGIN_SUCCESS,
        user
    }
}


export function login(email, password) {
    return (dispatch) => {
        dispatch(startLogin());
        const url = APIUrls.login;
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: getFormBody({ email, password })
        })
            .then(response => response.json())
            .then(data => {
                console.log("data auth: ", data);
                if (data.success) {
                    //dispatch action to store user
                    localStorage.setItem('token', data.data.token);     //store the bearer token in local storage
                    dispatch(loginSuccessful(data.data.user));
                    return;
                }
                dispatch(loginFailed(data.message));
            })
    }
}

//Persisting user
export function authenticateUser(user) {
    return {
        type: AUTHENTICATE_USER,
        user
    }
}
//Logging out
export function logoutUser() {
    return {
        type: LOG_OUT
    }
}

//Signup action creators

export function startSignup() {
    return {
        type: SIGNUP_START
    }
}

export function signupFailed(errorMessage) {
    return {
        type: SIGNUP_FAILED,
        error: errorMessage
    }
}

export function signupSuccessful(user) {
    return {
        type: SIGNUP_SUCCESS,
        user
    }
}

export function signup(email, password, confirmPassword, name) {
    return (dispatch) => {
        dispatch(startSignup());
        const url = APIUrls.signup;
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: getFormBody({ email, password, confirm_password: confirmPassword, name })
        })
            .then(response => response.json())
            .then(data => {
                console.log("Sign up response: ", data);
                if (data.success) {
                    localStorage.setItem('token', data.data.token);     //store the bearer token in local storage
                    dispatch(signupSuccessful(data.data.user));
                    return;
                }
                dispatch(signupFailed(data.message));
            })
    }
}

export function clearAuthState() {
    return {
        type: CLEAR_AUTH_STATE
    }
}