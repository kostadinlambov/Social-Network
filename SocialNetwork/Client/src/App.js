import React, { Component, Fragment } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import './styles/App.css';
import { Footer, Header } from './components/common';
import RegisterPage from './components/auth/RegisterPage';
import HomePage from './components/auth/HomePage';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
        <Footer />
      </Fragment>
    )
  }
}

export default withRouter(App);
