import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import './styles/index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from './store/reducers'
import {loginReducer} from './store/reducers/authReducer'
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import * as serviceWorker from './serviceWorker';

// import fetchData from './store/actions/fetchData';

const store = createStore(combineReducers(reducers), applyMiddleware(thunk, logger));
store.subscribe(() => console.log('store.getState(): ', store.getState()))

// const p = store.dispatch(fetchData());
// p.then(() => {
//     toastr.success('Contacts loaded');
// });


ReactDOM.render((
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
