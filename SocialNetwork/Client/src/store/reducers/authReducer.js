import { REGISTER_SUCCESS, LOGIN_SUCCESS, REDIRECTED, REGISTER_ERROR, LOGIN_ERROR, LOGOUT_SUCCESS, OTP_VERIFIED, OTP_ERROR, REGISTRATION_COMPLETE } from '../actions/actionTypes';

function registerReducer(state = { success: false , message: '', complete: false}, action) {
    switch (action.type) {
    case REGISTER_SUCCESS:
        return Object.assign({}, state, { success: true, message: action.message });
    case REGISTRATION_COMPLETE:
        return Object.assign({}, state, { success: true, complete: true, message: 'Registration complete' });
    case REDIRECTED:
        return Object.assign({}, state, { success: false });
    default:
        return state;
    }
}

function otpReducer(state = { verified: false }, action) {
    switch (action.type) {
    case OTP_VERIFIED:
        return Object.assign({}, state, { verified: true });
    case REDIRECTED:
        return Object.assign({}, state, { verified: false });
    default:
        return state;
    }
}

function otpErrorReducer(state = { hasError: false, message: '' }, action) {
    switch (action.type) {
    case OTP_ERROR:
        return Object.assign({}, state, { hasError: true, message: action.message });
    case OTP_VERIFIED:
        return Object.assign({}, state, { hasError: false, message: '' });
    default:
        return state;
    }
}

function loginReducer(state = { success: false }, action) {
    switch (action.type) {
    case LOGIN_SUCCESS:
        return Object.assign({}, state, { success: true });
    case REDIRECTED:
        return Object.assign({}, state, { success: false });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {success: false})
    default:
        return state;
    }
}

function registerErrorReducer (state = {hasError: false, message: ''}, action) {
    switch (action.type) {
      case REGISTER_ERROR:
        return Object.assign({}, state, {hasError: true, message: action.messsage})
      case REGISTER_SUCCESS:
        return Object.assign({}, state, {hasError: false, message: ''})
      default:
        return state
    }
  }
  
  function loginErrorReducer (state = {hasError: false, message: ''}, action) {
    switch (action.type) {
      case LOGIN_ERROR:
        return Object.assign({}, state, {hasError: true, message: action.messsage})
      case LOGIN_SUCCESS:
        return Object.assign({}, state, {hasError: false, message: ''})
      default:
        return state
    }
  }
  
  export {
    registerReducer,
    loginReducer,
    registerErrorReducer,
    loginErrorReducer,
    otpReducer,
    otpErrorReducer
  }