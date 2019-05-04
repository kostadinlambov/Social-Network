import React, { Component, Fragment, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import { userService } from '../../infrastructure/';
import { css } from '@emotion/core';
import { CircleLoader } from 'react-spinners';

import TimeLine from './TimeLine';
import HeaderSection from './HeaderSection';
import MainSharedContent from './MainSharedContent';
import Intro from './Intro';
import PhotoGallery from './PhotosGallery';
import FriendsGallery from './FriendsGallery';

import { connect } from 'react-redux';
import { fetchPicturesAction } from '../../store/actions/pictureActions';
import { fetchAllUnreadMessagesAction } from '../../store/actions/messageActions';
import { fetchLoggedInUserAction, fetchTimeLineUserAction, fetchAllFriendsAction, findFriendsAction } from '../../store/actions/userActions';

const UserSearchResultsPage = lazy(() => import('../user/UserSearchResultsPage'));
const UserProfilePage = lazy(() => import('../user/UserProfilePage'));
const UserFriendsAllPage = lazy(() => import('../user/UserFriendsAllPage'));
const UserFindFriendsPage = lazy(() => import('../user/UserFindFriendsPage'));
const UserFriendRequestsPage = lazy(() => import('../user/UserFriendRequestsPage'));
const UserAllPage = lazy(() => import('../user/UserAllPage'));
const UserEditPage = lazy(() => import('../../components/user/UserEditPage'));
const UserDeletePage = lazy(() => import('../../components/user/UserDeletePage'));
const UserGalleryPage = lazy(() => import('../user/UserGalleryPage'));
const UserLogsPage = lazy(() => import('../user/UserLogsPage'));
const MessageBox = lazy(() => import('./MessageBox'));
const ErrorPage = lazy(() => import('../common/ErrorPage'));

const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
`;

class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ready: false
        }

        this.loadAllPictures = this.loadAllPictures.bind(this);
        this.loadAllFriends = this.loadAllFriends.bind(this);
    }

    componentDidMount() {
        const userId = userService.getUserId();
        const timeLineUserId = userService.getUserId();

        this.props.loadLoggedInUserData(userId);
        this.loadAllPictures(timeLineUserId);
        this.loadAllFriends(timeLineUserId);
        this.props.findFriends(userId);
        this.props.loadAllUnreadMessages();

        this.setState({ ready: true });
    }

    componentDidUpdate(prevProps, prevState) {
        const errorMessage = this.getErrorMessage(prevProps);
        const successMessage = this.getSuccessMessage(prevProps)

        if (errorMessage) {
            toast.error(<ToastComponent.errorToast text={errorMessage} />, {
                position: toast.POSITION.TOP_RIGHT
            });
        } else if (successMessage) {
            toast.success(<ToastComponent.successToast text={successMessage} />, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    getSuccessMessage(prevProps) {
        if (!this.props.fetchPictures.hasError && this.props.fetchPictures.message && this.props.fetchPictures !== prevProps.fetchPictures) {
            return this.props.fetchPictures.message;
        }
        else if (!this.props.loggedInUserData.hasError && this.props.loggedInUserData.message && this.props.loggedInUserData !== prevProps.loggedInUserData) {
            return this.props.loggedInUserData.message;
        }
        else if (!this.props.fetchAllFriends.hasError && this.props.fetchAllFriends.message && this.props.fetchAllFriends !== prevProps.fetchAllFriends) {
            return this.props.fetchAllFriends.message;
        }
        return null;
    }

    getErrorMessage(prevProps) {
        if (this.props.fetchPictures.hasError && prevProps.fetchPictures.error !== this.props.fetchPictures.error) {
            return this.props.fetchPictures.message || 'Server Error';
        }
        else if (this.props.loggedInUserData.hasError && prevProps.loggedInUserData.error !== this.props.loggedInUserData.error) {
            return this.props.loggedInUserData.message || 'Server Error';
        }
        else if (this.props.fetchAllFriends.hasError && prevProps.fetchAllFriends.error !== this.props.fetchAllFriends.error) {
            return this.props.fetchAllFriends.message || 'Server Error';
        }

        return null;
    }

    loadAllPictures = (userId) => {
        this.props.loadAllPictures(userId);
    }

    loadAllFriends = (userId) => {
        this.props.loadAllFriends(userId);
    }

    render() {
        const isRoot = userService.isRoot();
        const isAdmin = userService.isAdmin();
        const isTheCurrentLoggedInUser = this.props.loggedInUserData.id === this.props.timeLineUserData.id;
        let loggedIn = userService.isTheUserLoggedIn();
        debugger;
        return (
            <Fragment>

                <HeaderSection  {...this.props.timeLineUserData} />
                <main className="site-content">
                    <section className="main-section">
                        <TimeLine {...this.props.timeLineUserData} />
                        <Suspense fallback={
                            <div className='sweet-loading'>
                                <CircleLoader
                                    css={override}
                                    sizeUnit={"px"}
                                    size={150}
                                    color={'#61dafb'}
                                    loading={true}
                                />
                            </div>}>
                            <Switch>
                                {loggedIn && <Route exact path="/home/comments/:id" component={MainSharedContent} />}
                                {loggedIn && <Route exact path="/home/profile/:id" component={UserProfilePage} />}
                                {loggedIn && (isRoot || isAdmin || isTheCurrentLoggedInUser) && <Route exact path="/home/users/edit/:id" component={UserEditPage} />}
                                {(loggedIn && (isRoot || isAdmin)) && <Route exact path="/home/users/all/:id" component={UserAllPage} />}
                                {(loggedIn && isRoot) && <Route exact path="/home/users/delete/:id" component={UserDeletePage} />}
                                {loggedIn && <Route exact path="/home/gallery/:id" component={UserGalleryPage} />} />}
                                {(loggedIn && (isRoot || isAdmin)) && <Route exact path="/home/logs/:id" component={UserLogsPage} />}
                                {loggedIn && <Route exact path="/home/friends/:id" component={UserFriendsAllPage} />}
                                {loggedIn && <Route exact path="/home/findFriends/:id" component={UserFindFriendsPage} />}
                                {loggedIn && <Route exact path="/home/friendRequests/:id" component={UserFriendRequestsPage} />}
                                {loggedIn && <Route exact path="/home/users/search/" component={UserSearchResultsPage} />}

                                <Route exact path="/error" component={ErrorPage} />
                                <Route component={ErrorPage} />
                            </Switch>
                        </Suspense>
                    </section>
                    <Fragment>
                        <section className="aside-section">
                            <Intro {...this.props.timeLineUserData} />
                            <PhotoGallery picturesArr={this.props.picturesArr} timeLineUserId={this.props.timeLineUserData.id} />
                            <FriendsGallery friendsArr={this.props.friendsArr} timeLineUserId={this.props.timeLineUserData.id} />
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
        findFriends: (userId) => { dispatch(findFriendsAction(userId)) },
        loadAllUnreadMessages: () => { dispatch(fetchAllUnreadMessagesAction()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);