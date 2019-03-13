import React, { Component, Fragment, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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
            profilePicUrl: placeholder_user_image,
            backgroundImageUrl: default_background_image,
            authorities: [],
            picturesArr: [],
            friendsArr: [],
            ready: false
        }

        this.getUserToShowId = this.getUserToShowId.bind(this);
        this.loadAllPictures = this.loadAllPictures.bind(this);
        this.loadAllFriends = this.loadAllFriends.bind(this);
    }

    componentDidMount() {
    //   this.loadAllPictures(userService.getUserId())
    }

    getUserToShowId(getUserToShowId) {
        debugger;
        console.log(' getUserToShowId: ', getUserToShowId);

        requester.get(`/users/details/${getUserToShowId}`, (userData) => {
            this.setState({
                ...userData, ready: true
            }, () => {
              (() =>   this.loadAllPictures(getUserToShowId))();
              (() =>   this.loadAllFriends(getUserToShowId))();
            })

            if (userData.error) {
                // toast.error(<ToastComponent.errorToast text={userData.message} />, {
                //     position: toast.POSITION.TOP_RIGHT
                // });
                this.props.history.push("/");
            } 
            debugger;
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
        debugger;
        requester.get('/pictures/all/' + userId, (response) => {
            console.log('pictures all: ', response);
            debugger;
            if (response.success === true) {
                // toast.success(<ToastComponent.successToast text={response.message} />, {
                //     position: toast.POSITION.TOP_RIGHT
                // });
                this.setState({
                    picturesArr: response['payload'],
                    id: userId
                })

                console.log('loadAllPictures this.state:  ' , this.state)
                debugger;
                
            } else {
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
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

    loadAllFriends = (userId) => {
        debugger;
        requester.get(`/relationship/friends/${userId}`, (response) => {
            debugger;
            console.log('friends all: ', response);

            this.setState({
                friendsArr: response
            })
        }).catch(err => {
            console.error('deatils err:', err)
            toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
                // toast.error(<ToastComponent.errorToast text={`${error.name}: ${error.message}`} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
                this.props.history.push('/login');
            }
        })
    }

    checkIfCurrentUserIsLoggedInUser(){
        return this.state.id === userService.getUserId();
    }


    render() {
        // if (!this.state.ready) {
        //     // return <h1 className="text-center pt-5 mt-5">Loading...</h1>
        //     return null;
        // }

        const userToShowId = this.props.match.params;

        console.log(this.props.match.id)
        
        const isRoot = userService.isRoot();
        const isAdmin = userService.isAdmin();
        const isTheCurrentLoggedInUser = this.checkIfCurrentUserIsLoggedInUser(userToShowId);
        let loggedIn = userService.isTheUserLoggedIn();
        
        console.log(isTheCurrentLoggedInUser)
        debugger;

        console.log('loggedIn: ', loggedIn);
        console.log('userToShowId: ', userToShowId);
        debugger;

        return (
            <Fragment>
                <HeaderSection  {...this.state} />
                <main className="site-content">
                    <section className="main-section">
                    <TimeLine {...this.state} />
                        <Suspense fallback={<h1 className="text-center pt-5 mt-5">Fallback Home Loading...</h1>}>
                            <Switch>
                                {loggedIn && <Route exact path="/home/comments/:id" render={props => <MainSharedContent {...props} {...this.state} getUserToShowId={this.getUserToShowId} />} />}
                                {loggedIn && <Route exact path="/home/profile/:id" render={props => <UserProfilePage {...props} getUserToShowId={this.getUserToShowId} {...this.state} />} />}
                                {loggedIn && <Route exact path="/home/friends/:id"  render={props => <UserFriendsAllPage {...props} getUserToShowId={this.getUserToShowId} {...this.state} loadAllFriends={this.loadAllFriends} />}/>}
                                {loggedIn && <Route exact path="/home/findFriends/:id/:category?" component={UserFindFriendsPage} />}
                                {/* {loggedIn &&  <Route exact path="/home/users/edit/:id" render={props => <UserEditPage {...props} getUserToShowId={this.getUserToShowId} {...this.state} />}/>} */}
                                {loggedIn && (isRoot|| isAdmin || isTheCurrentLoggedInUser) && <Route exact path="/home/users/edit/:id" render={props => <UserEditPage {...props} getUserToShowId={this.getUserToShowId} {...this.state} />}/>}
                                {(loggedIn && isRoot) && <Route exact path="/home/users/delete/:id" render={props => <UserDeletePage {...props} getUserToShowId={this.getUserToShowId} {...this.state} />} />}
                                {(loggedIn && (isRoot || isAdmin)) && <Route exact path="/home/users/all/:id" render={props => <UserAllPage {...props} getUserToShowId={this.getUserToShowId} {...this.state} />}/>}
                                {loggedIn && <Route exact path="/home/users/search" component={withUserAuthorization(UserSearchResultsPage)} />}
                                {loggedIn && <Route exact path="/home/gallery/:id"  render={props => <UserGalleryPage {...props} getUserToShowId={this.getUserToShowId} {...this.state} loadAllPictures={this.loadAllPictures} />} />}

                                <Route exact path="/error" component={ErrorPage} />
                                <Route render={(props) => <Redirect to="/" {...props} /> } />
                                {/* <Route component={ErrorPage} /> */}
                            </Switch>
                        </Suspense >
                    </section>

                    {this.state.ready &&
                        <Fragment>
                            <section className="aside-section">
                                <Intro {...this.state} />
                                <PhotoGallery {...this.state} />
                                <FriendsGallery {...this.state}  />
                                </section>
                        </Fragment>
                    }
                </main>
            </Fragment>

        );
    }
}
