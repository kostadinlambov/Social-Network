import {AJAX_BEGIN, AJAX_END} from '../actions/actionTypes'

function ajaxStatusReducer (state = 0, action) {
  switch (action.type) {
    case AJAX_BEGIN:
      return state + 1
    case AJAX_END:
      return state - 1
    default:
      return state
  }
}

export default ajaxStatusReducer
