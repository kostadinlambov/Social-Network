import React, { Component, Fragment } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import './styles/App.css';
import { Footer, Header } from './components/common';
import RegisterPage from './components/auth/RegisterPage';
import HomePage from './components/auth/HomePage';
import LoginPage from './components/auth/LoginPage';

class App extends Component {
  constructor(props){
    super(props)

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout(){
    localStorage.clear();
    this.props.history.push('/');
  }


  render() {
    return (
      <Fragment>
        <Header loggedIn={localStorage.getItem('userId') != null} onLogout={this.onLogout} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route component={HomePage} />
        </Switch>
        <Footer />
      </Fragment>
    )
  }
}

export default withRouter(App);
