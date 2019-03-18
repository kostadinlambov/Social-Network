import React, { Component, Fragment, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common'
import { requester, userService } from '../../infrastructure/'

import TimeLine from './TimeLine';
import HeaderSection from './HeaderSection';
import MainSharedContent from './MainSharedContent';
import Intro from './Intro';
import PhotoGallery from './PhotosGallery';
import FriendsGallery from './FriendsGallery';

import placeholder_user_image from '../../assets/images/placeholder-profile-male.jpg'
import default_background_image from '../../assets/images/default-background-image.jpg'

const UserSearchResultsPage = lazy(() => import('../../components//user/UserSearchResultsPage'))
const UserProfilePage = lazy(() => import('../../components/user/UserProfilePage'))
const UserFriendsAllPage = lazy(() => import('../../components/user/UserFriendsAllPage'))
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
            search: '',
            category: '',
            profilePicUrl: placeholder_user_image,
            backgroundImageUrl: default_background_image,
            authorities: [],
            picturesArr: [],
            friendsArr: [],
            friendsArrSearch: [],
            friendsCandidatesArr: [],
            userWaitingForAcceptingRequest: [],
            usersReceivedRequestFromCurrentUser: [],
        }

        this.getUserToShowId = this.getUserToShowId.bind(this);
        this.loadAllPictures = this.loadAllPictures.bind(this);
        this.loadAllFriends = this.loadAllFriends.bind(this);
        this.searchResults = this.searchResults.bind(this);
        this.findFriends = this.findFriends.bind(this);
    }

    getUserToShowId(getUserToShowId) {
        requester.get(`/users/details/${getUserToShowId}`, (userData) => {
            this.setState({
                ...userData, ready: true
            }, () => {
                (() => this.loadAllPictures(getUserToShowId))();
                (() => this.loadAllFriends(getUserToShowId))();
            })

            if (userData.error) {
                this.props.history.push("/");
            }
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

    loadAllPictures = (userId) => {
        requester.get('/pictures/all/' + userId, (response) => {
            if (response.success === true) {
                this.setState({
                    picturesArr: response['payload'],
                    id: userId
                })
            } else {
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }).catch(err => {
            toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
                this.props.history.push('/login');
            }
        })
    }

    loadAllFriends = (userId) => {
        requester.get(`/relationship/friends/${userId}`, (response) => {
            this.setState({
                friendsArr: response
            })
        }).catch(err => {
            toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
                this.props.history.push('/login');
            }
        })
    }

    findFriends = (userId, category) => {
        requester.get(`/relationship/findFriends/${userId}`, (response) => {
            this.setState({
                friendsCandidatesArr: response.filter(user => user.status !== 0 && user.status !== 1),
                userWaitingForAcceptingRequest: response.filter(user => user.status === 0 && user.starterOfAction === true),
                usersReceivedRequestFromCurrentUser: response.filter(user => user.status === 0 && user.starterOfAction === false),
                category: category,
            }, () => this.loadAllFriends(userId))
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

    searchResults = (userId, search) => {
        this.setState({
            search
        })

        const requestBody = { loggedInUserId: userId, search: search }

        requester.post('/relationship/search', requestBody, (response) => {
            this.setState({
                friendsArrSearch: response.filter(user => user.status === 1),
                friendsCandidatesArr: response.filter(user => user.status !== 0 && user.status !== 1),
                userWaitingForAcceptingRequest: response.filter(user => user.status === 0 && user.starterOfAction === true),
                usersReceivedRequestFromCurrentUser: response.filter(user => user.status === 0 && user.starterOfAction === false),
                ready: true
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

    checkIfCurrentUserIsLoggedInUser() {
        return this.state.id === userService.getUserId();
    }


    render() {
        const userToShowId = this.props.match.params;
        const isRoot = userService.isRoot();
        const isAdmin = userService.isAdmin();
        const isTheCurrentLoggedInUser = this.checkIfCurrentUserIsLoggedInUser(userToShowId);
        let loggedIn = userService.isTheUserLoggedIn();

        return (
            <Fragment>
                <HeaderSection  {...this.state} />
                <main className="site-content">
                    <section className="main-section">
                        <TimeLine {...this.state} />
                        <Suspense fallback={<h1 className="text-center pt-5 mt-5">Loading...</h1>}>
                            <Switch>
                                {loggedIn && <Route exact path="/home/comments/:id" render={props => <MainSharedContent  {...props}  {...this.state} getUserToShowId={this.getUserToShowId} />} />}
                                {loggedIn && <Route exact path="/home/profile/:id" render={props => <UserProfilePage {...props} getUserToShowId={this.getUserToShowId} {...this.state} />} />}
                                {loggedIn && <Route exact path="/home/friends/:id" render={props => <UserFriendsAllPage {...props} getUserToShowId={this.getUserToShowId} {...this.state} loadAllFriends={this.loadAllFriends} />} />}
                                {loggedIn && <Route exact path="/home/findFriends/:id/:category" render={(props) => <UserFindFriendsPage {...props} {...this.state} getUserToShowId={this.getUserToShowId} findFriends={this.findFriends} />} />}
                                {loggedIn && (isRoot || isAdmin || isTheCurrentLoggedInUser) && <Route exact path="/home/users/edit/:id" render={props => <UserEditPage {...props} getUserToShowId={this.getUserToShowId} {...this.state} />} />}
                                {(loggedIn && isRoot) && <Route exact path="/home/users/delete/:id" render={props => <UserDeletePage {...props} getUserToShowId={this.getUserToShowId} {...this.state} />} />}
                                {(loggedIn && (isRoot || isAdmin)) && <Route exact path="/home/users/all/:id" render={props => <UserAllPage {...props} getUserToShowId={this.getUserToShowId} {...this.state} />} />}
                                {loggedIn && <Route exact path="/home/gallery/:id" render={props => <UserGalleryPage {...props} getUserToShowId={this.getUserToShowId} {...this.state} loadAllPictures={this.loadAllPictures} />} />}
                                {loggedIn && <Route exact path="/home/users/search/" render={(props) => <UserSearchResultsPage {...props} {...this.state} getUserToShowId={this.getUserToShowId} searchResults={this.searchResults} />} />}

                                <Route exact path="/error" component={ErrorPage} />
                                <Route render={(props) => <Redirect to="/" {...props} />} />
                                {/* <Route component={ErrorPage} /> */}
                            </Switch>
                        </Suspense >
                    </section>

                    {this.state.ready &&
                        <Fragment>
                            <section className="aside-section">
                                <Intro {...this.state} />
                                <PhotoGallery {...this.state} />
                                <FriendsGallery {...this.state} />
                            </section>
                        </Fragment>
                    }
                </main>
            </Fragment>

        );
    }
}
