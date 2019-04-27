import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import { requester, userService } from '../../infrastructure/';
import placeholder_user_image from '../../assets/images/placeholder.png';
import default_background_image from '../../assets/images/default-background-image.jpg';

import MessageBox from './MessageBox';
import UserSearchResultsPage from '../../components/user/UserSearchResultsPage';
import UserProfilePage from '../../components/user/UserProfilePage';
import UserFriendsAllPage from '../../components/user/UserFriendsAllPage';
import UserFindFriendsPage from '../../components/user/UserFindFriendsPage';
import UserAllPage from '../../components/user/UserAllPage';
import UserEditPage from '../../components/user/UserEditPage';
import UserDeletePage from '../../components/user/UserDeletePage';
import UserGalleryPage from '../../components/user/UserGalleryPage';
import UserLogsPage from '../../components/user/UserLogsPage';
import ErrorPage from '../../components/common/ErrorPage';
import TimeLine from './TimeLine';
import HeaderSection from './HeaderSection';
import MainSharedContent from './MainSharedContent';
import Intro from './Intro';
import PhotoGallery from './PhotosGallery';
import FriendsGallery from './FriendsGallery';

import { connect } from 'react-redux';
import { fetchPicturesAction } from '../../store/actions/pictureActions';
import { fetchLoggedInUserAction, updateLoggedInUserDataAction, fetchTimeLineUserAction, updateTimeLineUserDataAction, fetchAllFriendsAction } from '../../store/actions/userActions';

class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: userService.getUserId(),
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
            friendsChatArr: [],
            ready: false
        }

        this.getUserToShowId = this.getUserToShowId.bind(this);
        this.loadAllPictures = this.loadAllPictures.bind(this);
        this.loadAllFriends = this.loadAllFriends.bind(this);
        this.searchResults = this.searchResults.bind(this);
        this.findFriends = this.findFriends.bind(this);
    }

    componentDidMount() {
        console.log("Home componentDidMount")
        const userId = userService.getUserId();
        this.props.loadLoggedInUserData(userId);
        this.getUserToShowId(userId);
        this.loadAllPictures(userId);
        this.loadAllFriends(userId);
        this.setState({ ready: true });
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('prevProps: ', prevProps);
        // console.log('this.props: ', this.props);
        // debugger;
        if (
            (this.props.fetchPictures.hasError && prevProps.fetchPictures.error !== this.props.fetchPictures.error) ||
            (this.props.timeLineUserData.hasError && prevProps.timeLineUserData.error !== this.props.timeLineUserData.error) ||
            (this.props.loggedInUserData.hasError && prevProps.loggedInUserData.error !== this.props.loggedInUserData.error) ||
            (this.props.fetchAllFriends.hasError && prevProps.fetchAllFriends.error !== this.props.fetchAllFriends.error)
        ) {

            const errorMessage =
                this.props.fetchPictures.message ||
                this.props.timeLineUserData.message ||
                this.props.loggedInUserData.message ||
                this.props.fetchAllFriends.message || 'Server Error'

            toast.error(<ToastComponent.errorToast text={errorMessage} />, {
                position: toast.POSITION.TOP_RIGHT
            });

        } else if (
            (!this.props.fetchPictures.hasError && this.props.fetchPictures.message && this.props.fetchPictures !== prevProps.fetchPictures) ||
            (!this.props.timeLineUserData.hasError && this.props.timeLineUserData.message && this.props.timeLineUserData !== prevProps.timeLineUserData) ||
            (!this.props.loggedInUserData.hasError && this.props.loggedInUserData.message && this.props.loggedInUserData !== prevProps.loggedInUserData) ||
            (!this.props.fetchAllFriends.hasError && this.props.fetchAllFriends.message && this.props.fetchAllFriends !== prevProps.fetchAllFriends)) {

            const successMessage =
                this.props.fetchPictures.message ||
                this.props.timeLineUserData.message ||
                this.props.loggedInUserData.message ||
                this.props.fetchAllFriends.message;

            toast.success(<ToastComponent.successToast text={successMessage} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            // this.props.history.push('/login');
        }
    }

    getUserToShowId(userId) {
        this.props.loadTimelineUserData(userId);

        // requester.get(`/users/details/${getUserToShowId}`, (userData) => {
        //     console.log('userData: ', userData);
        //     this.setState({
        //         ...userData, ready: true
        //     }, () => {
        //         (() => this.loadAllPictures(getUserToShowId))();
        //         (() => this.loadAllFriends(getUserToShowId))();
        //         (() => this.loadAllChatFriends())();
        //     })

        //     if (userData.error) {
        //         this.props.history.push("/");
        //     }
        // }).catch(err => {
        //     toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
        //         position: toast.POSITION.TOP_RIGHT
        //     });

        //     if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
        //         localStorage.clear();
        //         this.props.history.push('/login');
        //     }
        // })
    }

    loadAllPictures = (userId) => {
        this.props.loadAllPictures(userId);
    }

    loadAllFriends = (userId) => {
        this.props.loadAllFriends(userId);
        // requester.get(`/relationship/friends/${userId}`, (response) => {
        //     this.setState({
        //         friendsArr: response
        //     },
        //         (() => this.loadAllChatFriends())())
        // }).catch(err => {
        //     toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
        //         position: toast.POSITION.TOP_RIGHT
        //     });

        //     if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
        //         localStorage.clear();
        //         this.props.history.push('/login');
        //     }
        // })
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
        const loading = this.props.fetchPictures.loading || this.props.timeLineUserData.loading || this.props.loggedInUserData.loading || this.props.fetchAllFriends.loading;
        if (!this.state.ready || loading) {
            return <h1 className="text-center pt-5 mt-5">Loading...</h1>
        }

        const userToShowId = this.props.match.params;
        const isRoot = userService.isRoot();
        const isAdmin = userService.isAdmin();
        const isTheCurrentLoggedInUser = this.checkIfCurrentUserIsLoggedInUser(userToShowId);
        let loggedIn = userService.isTheUserLoggedIn();

        return (
            <Fragment>
                <HeaderSection  {...this.props.timeLineUserData} />
                <main className="site-content">
                    <section className="main-section">
                        <TimeLine {...this.props.timeLineUserData} />
                        <Switch>
                            {loggedIn && <Route exact path="/home/comments/:id" render={props => <MainSharedContent  {...props}  {...this.state} getUserToShowId={this.getUserToShowId} />} />}

                            {/* {loggedIn && <Route exact path="/home/profile/:id" render={props => <UserProfilePage {...props} getUserToShowId={this.getUserToShowId} {...this.state} />} />}
                                {loggedIn && <Route exact path="/home/friends/:id" render={props => <UserFriendsAllPage {...props} getUserToShowId={this.getUserToShowId} {...this.state} loadAllFriends={this.loadAllFriends} />} />}
                                {loggedIn && <Route exact path="/home/findFriends/:id/:category" render={(props) => <UserFindFriendsPage {...props} {...this.state} getUserToShowId={this.getUserToShowId} findFriends={this.findFriends} />} />}
                                {loggedIn && (isRoot || isAdmin || isTheCurrentLoggedInUser) && <Route exact path="/home/users/edit/:id" render={props => <UserEditPage {...props} getUserToShowId={this.getUserToShowId} {...this.state} />} />}
                                {(loggedIn && isRoot) && <Route exact path="/home/users/delete/:id" render={props => <UserDeletePage {...props} getUserToShowId={this.getUserToShowId} {...this.state} />} />}
                                {(loggedIn && (isRoot || isAdmin)) && <Route exact path="/home/users/all/:id" render={props => <UserAllPage {...props} getUserToShowId={this.getUserToShowId} {...this.state} />} />}
                                {(loggedIn && (isRoot || isAdmin)) && <Route exact path="/home/logs/:id" render={props => <UserLogsPage {...props} getUserToShowId={this.getUserToShowId} searchResults={this.searchResults} {...this.state} />} />}
                                {loggedIn && <Route exact path="/home/gallery/:id" render={props => <UserGalleryPage {...props} getUserToShowId={this.getUserToShowId} {...this.state} loadAllPictures={this.loadAllPictures} />} />}
                                {loggedIn && <Route exact path="/home/users/search/" render={(props) => <UserSearchResultsPage {...props} {...this.state} getUserToShowId={this.getUserToShowId} searchResults={this.searchResults} />} />} */}
                            {/* <Route exact path="/error" component={ErrorPage} />
                                <Route render={(props) => <Redirect to="/" {...props} />} /> */}
                        </Switch>
                    </section>
                    <Fragment>
                        <section className="aside-section">
                            <Intro {...this.props.timeLineUserData} />
                            <PhotoGallery picturesArr={this.props.picturesArr} />
                            <FriendsGallery friendsArr={this.props.friendsArr} />
                            <MessageBox />
                        </section>
                    </Fragment>
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        picturesArr: state.fetchPictures.picturesArr,
        fetchPictures: state.fetchPictures,

        timeLineUserData: state.timeLineUserData,
        loggedInUserData: state.loggedInUserData,

        friendsArr: state.fetchAllFriends.friendsArr,
        fetchAllFriends: state.fetchAllFriends,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadAllPictures: (userId) => { dispatch(fetchPicturesAction(userId)) },
        loadLoggedInUserData: (userId) => { dispatch(fetchLoggedInUserAction(userId)) },
        loadTimelineUserData: (userId) => { dispatch(fetchTimeLineUserAction(userId)) },
        loadAllFriends: (userId) => { dispatch(fetchAllFriendsAction(userId)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);