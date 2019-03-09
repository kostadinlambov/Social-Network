import React, { Component, Fragment, lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { withRootAuthorization, withAdminAuthorization, withUserAuthorization } from '../../hocs/withAuthorization';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common'
import { requester } from '../../infrastructure/'

import TimeLine from './TimeLine';
import HeaderSection from './HeaderSection';
import MainSharedContent from './MainSharedContent';
import Intro from './Intro';
import PhotoGallery from './PhotosGallery';
import FriendsGallery from './FriendsGallery';
import userService from '../../infrastructure/userService';

const UserSearchResultsPage = lazy(() => import('../../components//user/UserSearchResultsPage'))
const UserProfilePage = lazy(() => import('../../components/user/UserProfilePage'))
const UserFriendsPage = lazy(() => import('../../components/user/UserFriendsAllPage'))
const UserFindFriendsPage = lazy(() => import('../../components/user/UserFindFriendsPage'))
const UserAllPage = lazy(() => import('../../components/user/UserAllPage'))
const UserEditPage = lazy(() => import('../../components/user/UserEditPage'))
const UserDeletePage = lazy(() => import('../../components/user/UserDeletePage'))
const UserGalleryPage = lazy(() => import('../../components/user/UserGalleryPage'))

const ErrorPage = lazy(() => import('../../components/common/ErrorPage'))

export default class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            profilePicUrl: '',
            backgroundImageUrl: '',
            authorities: [],
            ready: false
        }
    }

    componentDidMount() {
        const currentUserId = userService.getUserId();
        requester.get(`/users/details/${currentUserId}`, (userData) => {
            this.setState({
                ...userData, ready: true
            })
        }).catch(err => {
            console.error('deatils err:', err)
            toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
                this.props.history.push('/login');
            }
        })
    }

    render() {
        if (!this.state.ready) {
            // return <h1 className="text-center pt-5 mt-5">Loading...</h1>
            return null;
        }
        console.log(this.props.match.url)
        const loggedIn = localStorage.getItem('token');

        return (
            <Fragment>
                <HeaderSection  {...this.state} />
                <main className="site-content">
                    {/* <div className="container"> */}
                    <section className="main-section">
                        <TimeLine userId={this.state.id} />
                        <Suspense fallback={<h1 className="text-center pt-5 mt-5">Fallback Home Loading...</h1>}>
                            <Switch>
                                {loggedIn && <Route exact path="/home/:id" render={props => <MainSharedContent userId={this.state.id} {...props} />} />}
                                {/* <Route exact path={this.props.match.url + "/:id"} component={UserProfilePage} /> */}
                                {/* <Route exact path={this.props.match.url + "/profile/:id"} render={() => console.log(this.props.match.url + "/profile/:id")} />} */}
                                {loggedIn && <Route exact path="/home/profile/:id" component={UserProfilePage} />}
                                {/* <Route exact path="/profile" component={withAdminAuthorization(ProfilePage)} /> */}
                                {loggedIn && <Route exact path="/home/friends/:id" component={UserFriendsPage} />}
                                {loggedIn && <Route exact path="/home/findFriends/:id" component={UserFindFriendsPage} />}
                                {loggedIn && <Route exact path="/home/users/edit/:id" component={withUserAuthorization(UserEditPage)} />}
                                {loggedIn && <Route exact path="/home/users/delete/:id" component={withAdminAuthorization(UserDeletePage)} />}
                                {loggedIn && <Route exact path="/home/users/all" component={withAdminAuthorization(UserAllPage)} />}
                                {loggedIn && <Route exact path="/home/users/search" component={withUserAuthorization(UserSearchResultsPage)} />}
                                {loggedIn && <Route exact path="/home/gallery/:id" component={withUserAuthorization(UserGalleryPage)} />}

                                <Route exact path="/error" component={ErrorPage} />
                                <Route component={ErrorPage} />
                            </Switch>
                        </Suspense >
                    </section>

                    <section className="aside-section">
                        <Intro userId={this.state.id} />
                        <PhotoGallery userId={this.state.id} />
                        <FriendsGallery userId={this.state.id} />
                    </section>

                </main>
            </Fragment>

        );
    }
}
