import { LOGIN_SUCCESS, LOGIN_ERROR, REDIRECTED, REGISTER_SUCCESS, REGISTER_ERROR, LOGOUT_SUCCESS, OTP_VERIFIED, OTP_ERROR, REGISTRATION_COMPLETE } from './actionTypes';
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

function otpVerified() {
    return {
        type: OTP_VERIFIED
    }
}

function otpError(message) {
    return {
        type: OTP_ERROR,
        message
    }
}

function registrationComplete() {
    return {
        type: REGISTRATION_COMPLETE
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
        
        // Store registration data for later use after OTP verification
        localStorage.setItem('registrationData', JSON.stringify(userData));
        localStorage.setItem('registrationEmail', userData.email);
        
        return requester.post('/users/register', { ...userData }, (response) => {
            if (response.success === true) {
                dispatch(registerSuccess(response.message))
                // Redirect to OTP verification page
                window.location.href = '/otp-verify?email=' + encodeURIComponent(userData.email);
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

function verifyOtpAction(email, otp) {
    return (dispatch) => {
        dispatch(ajaxBegin());
        return requester.post('/otp/verify', { email, otp }, (response) => {
            if (response.success === true) {
                dispatch(otpVerified());
            } else {
                dispatch(otpError(response.message || 'Failed to verify OTP'));
            }
            dispatch(ajaxEnd());
        }).catch(err => {
            dispatch(otpError(err.message));
            dispatch(ajaxEnd());
        })
    }
}

function completeRegistrationAction(userData) {
    return (dispatch) => {
        dispatch(ajaxBegin());
        return requester.post('/users/complete-registration', { ...userData }, (response) => {
            if (response.success === true) {
                dispatch(registerSuccess('Registration successful! Redirecting to login...'));
                dispatch(registrationComplete());
            } else {
                dispatch(registerError(response.message || 'Failed to complete registration'));
            }
            dispatch(ajaxEnd());
        }).catch(err => {
            dispatch(registerError(err.message));
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

export { loginAction, redirectAction, registerAction, logoutAction, verifyOtpAction, completeRegistrationAction };