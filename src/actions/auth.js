import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED } from './actionTypes';
import { APIUrls } from '../helpers/urls';
import { getFormBody } from '../helpers/utils';

export function startLogin() {
    return {
        type: LOGIN_START
    }
}

export function login(email, password) {
    return (dispatch) => {
        const url = APIUrls.login();
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: getFormBody({ email, password })
        })
    }
}