import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reducers from './reducers'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {LOGOUT_SUCCESS} from './actions/actionTypes'

// import { fetchPicturesAction } from './store/actions/pictureActions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_SUCCESS){
        state = undefined;
    }

    return appReducer(state, action)
}

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)));
store.subscribe(() => console.log('store.getState(): ', store.getState()));

// store.dispatch(loginAction);
// store.dispatch(fetchPicturesAction('cbe9dafe-849d-407b-b703-b3f35f1ab382'));
// store.dispatch(fetchPicturesAction(''));

export default store;