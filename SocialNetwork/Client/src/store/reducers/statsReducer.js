import { FETCH_STATS_SUCCESS, REGISTER_SUCCESS } from '../actions/actionTypes';

export default function statsReducer(state = { users: 0, furniture: 0 }, action) {
    switch (action.type) {
        case FETCH_STATS_SUCCESS:
            return {
                users: action.data.users,
                furniture: action.data.furniture
            }
        case REGISTER_SUCCESS:
            return {
                users: state.users + 1,
                furniture: state.furniture
            }
        default:
            return state;
    };
}