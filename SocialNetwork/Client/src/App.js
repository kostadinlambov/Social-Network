import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './styles/App.css';
import { Footer, Header, Notifications, ErrorPage } from './components/common';
import {StartPage,LoginPage, RegisterPage } from './components/auth';
import {UserProfilePage, UserEditPage, UserDeletePage, UserAllPage} from './components/user';
import { withRootAuthorization, withAdminAuthorization, withUserAuthorization } from './hocs/withAuthorization';
import { ToastContainer, toast, Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import HomePage from './components/home/HomePage';
import HeaderSection from './components/home/HeaderSection';
import Navbar from './components/home/NavBar';


class App extends Component {
  constructor(props) {
    super(props)

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    localStorage.clear();
    this.props.history.push('/');
  }

  render() {
    const loggedIn = localStorage.getItem('token');
    console.log(localStorage.getItem('token'))
    console.log(localStorage.getItem('token') != null)
    debugger;
    return (
      <Fragment>
        
        {/* <Header loggedIn={localStorage.getItem('token') != null} onLogout={this.onLogout} /> */}
        <Navbar loggedIn={localStorage.getItem('token') != null} onLogout={this.onLogout} />
        <Notifications />
        <ToastContainer transition={Zoom} closeButton={false}/>
      
        <Switch>
          <Route exact path="/" component={StartPage} />
          {!loggedIn && <Route exact path="/register" component={RegisterPage} />}
          {/* {<Route exact path="/register" component={RegisterPage} />} */}
          {!loggedIn && <Route exact path="/login" component={LoginPage} />}
          {loggedIn && <Route exact path="/profile/:id" component={UserProfilePage} />}
          {/* <Route exact path="/profile" component={withAdminAuthorization(ProfilePage)} /> */}
          {loggedIn && <Route exact path="/users/edit/:id" component={UserEditPage} />}
          {loggedIn && <Route path="/users/delete/:id" component={withAdminAuthorization(UserDeletePage)} />}
          {loggedIn && <Route path="/users/all" component={withAdminAuthorization(UserAllPage)} />}
          {loggedIn && <Route path="/home/:id" component={withUserAuthorization(HomePage)} />}
          <Route exact path="/error" component={ErrorPage} />
          <Route component={ErrorPage} />
        </Switch>
        <Footer />
      </Fragment>
    )
  }
}

export default withRouter(App);
