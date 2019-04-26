import { LOGIN_SUCCESS, LOGIN_ERROR, REDIRECTED, REGISTER_SUCCESS, REGISTER_ERROR, LOGOUT_SUCCESS } from './actionTypes';
import { ajaxBegin, ajaxEnd } from './ajaxActions';
import { requester } from '../../infrastructure';

function registerSuccess(message) {
    return {
        type: REGISTER_SUCCESS,
        message
    }
}

function registerError(messsage) {
    return {
        type: REGISTER_ERROR,
        messsage
    }
}

function loginSuccess() {
    return {
        type: LOGIN_SUCCESS,
    }
}

function loginError(messsage) {
    return {
        type: LOGIN_ERROR,
        messsage
    }
}

function redirectAction() {
    return {
        type: REDIRECTED
    }
}

function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS
    }
}


function registerAction(userData) {
    return (dispatch) => {
        dispatch(ajaxBegin());
        return requester.post('/users/register', { ...userData }, (response) => {
            if (response.success === true) {
                dispatch(registerSuccess(response.message))
            } else {
                dispatch(registerError(response.message))
            }
            dispatch(ajaxEnd());
        }).catch(err => {
            dispatch(registerError(`${err.message}`));
            dispatch(ajaxEnd());
        })
    }
}

function loginAction(username, password) {
    return (dispatch) => {
        dispatch(ajaxBegin());
        return requester.post('/login', { username, password }, (response) => {
            if (response.error) {
                dispatch(loginError(' Incorrect credentials!'));
            } else {
                saveToken(response)
                dispatch(loginSuccess());
            }
            dispatch(ajaxEnd());
        }).catch(err => {
            localStorage.clear();
            dispatch(loginError(`${err.message}`));
            dispatch(ajaxEnd());
        })
    }
}

function logoutAction() {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logoutSuccess())
    }
}

function saveToken(response) {
    const token = response.split(' ')[1];
    localStorage.setItem('token', token);
}

export { loginAction, redirectAction, registerAction, logoutAction };