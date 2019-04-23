import React from 'react';

import { LOGIN_SUCCESS, LOGIN_ERROR, REDIRECTED, REGISTER_SUCCESS, REGISTER_ERROR, LOGOUT_SUCCESS } from './actionTypes';
import { beginAjax, endAjax } from './ajaxStatusActions';
import { requester } from '../../infrastructure';

function registerSuccess(message) {
    return {
        type: REGISTER_SUCCESS,
        message
    }
}

function registerError(error) {
    return {
        type: REGISTER_ERROR,
        error
    }
}


function loginSuccess() {
    return {
        type: LOGIN_SUCCESS,
    }
}

function loginError(error) {
    return {
        type: LOGIN_ERROR,
        error
    }
}

function redirectAction() {
    return {
        type: REDIRECTED
    }
}

function logoutSuccess() {
    return{
        type: LOGOUT_SUCCESS
    }
}


function registerAction(userData) {
    return (dispatch) => {
        dispatch(beginAjax());
        return requester.post('/users/register',{...userData},(response) => {
                if (response.success === true) {
                    dispatch(registerSuccess(response.message))
                } else {
                    dispatch(registerError(response.message))
                }
                dispatch(endAjax());
            }).catch(err => {
                dispatch(registerError(`${err.message}`));
                dispatch(endAjax());
            })
    }
}

function loginAction(username, password) {
    return (dispatch) => {
        dispatch(beginAjax());
        return requester.post('/login', { username, password }, (response) => {
            if (response.error) {
                dispatch(loginError(' Incorrect credentials!'));
            } else {
                authenticateUser(response)
                dispatch(loginSuccess());
            }
            dispatch(endAjax());
        }).catch(err => {
            localStorage.clear();
            dispatch(loginError(`${err.message}`));
            dispatch(endAjax());
        })
    }
}

function logoutAction(){
    return (dispatch) => {
        window.localStorage.clear();
        dispatch(logoutSuccess())
    }
}



function authenticateUser(response) {
    const token = response.split(' ')[1];
    window.localStorage.setItem('token', token);
}



export { loginAction, redirectAction, registerAction };