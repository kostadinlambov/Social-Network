import React, { Component, Fragment, lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Footer } from './components/common';
import Navbar from './components/home/NavBar';
import { ToastComponent } from './components/common'
import { userService } from './infrastructure';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import './styles/App.css';

const StartPage = lazy(() => import('./components/auth/StartPage'))
const RegisterPage = lazy(() => import('./components/auth/RegisterPage'))
const LoginPage = lazy(() => import('./components/auth/LoginPage'))

const HomePage = lazy(() => import('./components/home/HomePage'))
const ErrorPage = lazy(() => import('./components/common/ErrorPage'))

class App extends Component {
  constructor(props) {
    super(props)

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    localStorage.clear();

    toast.success(<ToastComponent.successToast text='You have been successfully logged out!' />, {
      position: toast.POSITION.TOP_RIGHT
    });

    this.props.history.push('/login');
  }

  render() {
    const loggedIn = userService.isTheUserLoggedIn();

    return (
      <Fragment>
        <Navbar loggedIn={localStorage.getItem('token') != null} onLogout={this.onLogout} {...this.props} />
        <ToastContainer transition={Zoom} closeButton={false} />
        <Suspense fallback={<h1 className="text-center pt-5 mt-5">Loading...</h1>}>
          <Switch>
            <Route exact path="/" component={StartPage} />
            {!loggedIn && <Route exact path="/register" component={RegisterPage} />}
            {!loggedIn && <Route exact path="/login" component={LoginPage} />}
            {loggedIn && <Route path="/home" render={(props) => <HomePage {...props} />} component={HomePage} />}
            {/* {loggedIn && <Route exact path="/home/users/search/" render={(props) => <UserSearchResultsPage {...props} {...this.state} getUserToShowId={this.getUserToShowId} searchResults={this.searchResults} />} />} */}
            <Route exact path="/error" component={ErrorPage} />
            <Route component={ErrorPage} />
          </Switch>
        </Suspense>
        <Footer />
      </Fragment>
    )
  }
}

export default withRouter(App);
