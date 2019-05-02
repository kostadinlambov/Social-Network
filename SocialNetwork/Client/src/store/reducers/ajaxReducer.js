import { AJAX_BEGIN, AJAX_END, AJAX_ERROR, AJAX_SUCCESS } from '../actions/actionTypes'

function ajaxStatusReducer(state = 0, action) {
  switch (action.type) {
    case AJAX_BEGIN:
      return state + 1
    case AJAX_END:
      return state - 1
    default:
      return state
  }
}

function ajaxErrorReducer(state = { hasError: false, error: '', message: '', status: null, path: '' ,}, action) {
  switch (action.type) {
    case AJAX_ERROR:
      return Object.assign({}, state, {
        hasError: true,
        error: action.error,
        message: action.message,
        status: action.status,
        path: action.path,
      })
    case AJAX_SUCCESS:
      return Object.assign({}, state, {
        hasError: false,
        error: '',
        message: '',
        status: null,
        path: '',
      })
    default:
      return state
  }
}

export {
  ajaxStatusReducer,
  ajaxErrorReducer
}


