import React, { Component, Fragment, lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './styles/App.css';
import { Footer, Header, Notifications } from './components/common';
import { withRootAuthorization, withAdminAuthorization, withUserAuthorization } from './hocs/withAuthorization';
import { ToastContainer, toast, Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import Navbar from './components/home/NavBar';
import { ToastComponent } from './components/common'

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

    // requester.post('/users/logout', {}, (response) => {

    //   if (response.success === true) {
    //     console.log('success message: ', response.message);
    //     debugger;
    //     toast.success(<ToastComponent.successToast text={response.message} />, {
    //       position: toast.POSITION.TOP_RIGHT
    //     });
    //   } else {
    //     console.log('error logout message: ', response.message);
    //     debugger;
    //     toast.error(<ToastComponent.errorToast text={response.message} />, {
    //       position: toast.POSITION.TOP_RIGHT
    //     });
    //     localStorage.clear();
    //     this.props.history.push('/login');
    //   }

    // })

  }

  render() {
    const loggedIn = localStorage.getItem('token');
    console.log(localStorage.getItem('token'))
    console.log(localStorage.getItem('token') != null)

    return (
      <Fragment>
        <Navbar loggedIn={localStorage.getItem('token') != null} onLogout={this.onLogout} {...this.props} />
        <ToastContainer transition={Zoom} closeButton={false} />
        <Suspense fallback={<h1 className="text-center pt-5 mt-5">Fallback App.js Loading...</h1>}>
          <Switch>
            <Route exact path="/" component={StartPage} />
            {!loggedIn && <Route exact path="/register" component={RegisterPage} />}
            {!loggedIn && <Route exact path="/login" component={LoginPage} />}
            {loggedIn && <Route path="/home/:id" component={withUserAuthorization(HomePage)} />}
            {/* {loggedIn && <Route exact path="/home/profile/:id" component={UserProfilePage} />} */}
            {/* <Route exact path="/profile" component={withAdminAuthorization(ProfilePage)} /> */}
            {/* {loggedIn && <Route exact path="/home/friends/:id" component={UserFriendsPage} />} */}
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
