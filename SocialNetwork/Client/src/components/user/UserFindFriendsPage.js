import React, { Component, Fragment } from 'react';
import {userService} from '../../infrastructure';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common'
import Friend from './Friend';
import FriendRequest from './FriendRequest';
import './css/UserFriends.css';

import { connect } from 'react-redux';
import {
    changeCurrentTimeLineUserAction, changeAllFriendsAction, findFriendsAction,
    addFriendAction, cancelRequestAction, confirmRequestAction
} from '../../store/actions/userActions';
import { changeAllPicturesAction } from '../../store/actions/pictureActions';

class UserFindFriendsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            friendsCandidatesArr: [],
            userWaitingForAcceptingRequest: [],
            usersReceivedRequestFromCurrentUser: [],
            ready: false,
        };

        this.addFriend = this.addFriend.bind(this);
        this.confirmRequest = this.confirmRequest.bind(this);
        this.rejectRequest = this.rejectRequest.bind(this);
    }

    componentDidMount() {
        const loggedInUserId = userService.getUserId();
        if (loggedInUserId !== this.props.timeLineUserData.id) {
            this.props.changeTimeLineUser(loggedInUserId);
            this.props.changeAllPictures(loggedInUserId);
            this.props.changeAllFriends(loggedInUserId);
        }

        this.props.findFriends(loggedInUserId);
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
        if (!this.props.findFriendsData.hasError && this.props.findFriendsData.message && this.props.findFriendsData !== prevProps.findFriendsData) {
            return this.props.findFriendsData.message;
        }
        else if (!this.props.addfriendData.hasError && this.props.addfriendData.message && this.props.addfriendData !== prevProps.addfriendData) {
            return this.props.addfriendData.message;
        }
        else if (!this.props.cancelRequestData.hasError && this.props.cancelRequestData.message && this.props.cancelRequestData !== prevProps.cancelRequestData) {
            return this.props.cancelRequestData.message;
        }
        else if (!this.props.confirmRequestData.hasError && this.props.confirmRequestData.message && this.props.confirmRequestData !== prevProps.confirmRequestData) {
            return this.props.confirmRequestData.message;
        }

        return null;
    }

    getErrorMessage(prevProps) {
        if (this.props.findFriendsData.hasError && prevProps.findFriendsData.error !== this.props.findFriendsData.error) {
            return this.props.findFriendsData.message || 'Server Error';
        }
        else if (this.props.addfriendData.hasError && prevProps.addfriendData.error !== this.props.addfriendData.error) {
            return this.props.addfriendData.message || 'Server Error';
        }
        else if (this.props.cancelRequestData.hasError && prevProps.cancelRequestData.error !== this.props.cancelRequestData.error) {
            return this.props.cancelRequestData.message || 'Server Error';
        }
        else if (this.props.confirmRequestData.hasError && prevProps.confirmRequestData.error !== this.props.confirmRequestData.error) {
            return this.props.confirmRequestData.message || 'Server Error';
        }

        return null;
    }

    addFriend = (friendCandidateId) => {
        const loggedInUserId = this.props.loggedInUserData.id;
        this.props.addFriend(loggedInUserId, friendCandidateId);
    }

    confirmRequest = (friendToAcceptId) => {
        const loggedInUserId = this.props.loggedInUserData.id;
        this.props.acceptRequest(loggedInUserId, friendToAcceptId);
    }

    rejectRequest = (friendToRejectId) => {
        const loggedInUserId = this.props.loggedInUserData.id;
        this.props.cancelRequest(loggedInUserId, friendToRejectId);
    }

    render() {
        const requestLength = this.props.userWaitingForAcceptingRequest.length;
        let requests = '';

        if (requestLength > 0) {
            requests = (
                <Fragment>
                    <h3 className="mt-5">Respond to Your Friend Requests</h3>
                    <div className="hr-styles"></div>
                    {this.props.userWaitingForAcceptingRequest.map((friend) =>
                        <FriendRequest
                            key={friend.id}
                            {...this.props}
                            {...friend}
                            firstButtonText={'CONFIRM'}
                            secondButtonText={'REJECT'}
                            thirdButtonText={'VIEW PROFILE'}
                            firstButtonOnClick={this.confirmRequest}
                            secondButtonOnClick={this.rejectRequest}
                            thirdButtonLink={`/home/profile/${friend.id}`}
                        />)}
                </Fragment>
            )
        }

        let waitingForResponseUsers = this.props.usersReceivedRequestFromCurrentUser.length;
        let friendsCandidates = '';

        if (waitingForResponseUsers > 0) {
            friendsCandidates = (
                <Fragment>
                    <h3 className="mt-5">Pending Requests</h3>
                    <div className="hr-styles"></div>
                    {
                        this.props.usersReceivedRequestFromCurrentUser.map((friend) =>
                            <Friend
                                key={friend.id}
                                {...this.props}
                                {...friend}
                                firstButtonLink={`/home/profile/${friend.id}`}
                                secondButtonLink={`/`}
                                firstButtonText={'VIEW PROFILE'}
                                secondButtonText={'CANCEL REQUEST'}
                                secondButtonOnClick={this.rejectRequest}
                            />)
                    }
                </Fragment>
            )
        }

        let friendsCandidatesArr = this.props.friendsCandidatesArr.length;
        let remainCandidates = '';

        if (friendsCandidatesArr > 0) {
            remainCandidates = (
                <Fragment>
                    <h3 className="mt-5">People You May Know</h3>
                    <div className="hr-styles"></div>
                    {
                        this.props.friendsCandidatesArr.map((friend) =>
                            <Friend
                                key={friend.id}
                                {...this.props}
                                {...friend}
                                firstButtonLink={`/home/profile/${friend.id}`}
                                secondButtonLink={`/`}
                                firstButtonText={'VIEW PROFILE'}
                                secondButtonText={'ADD FRIEND'}
                                secondButtonOnClick={this.addFriend}
                            />)
                    }
                </Fragment>
            )
        }

        let noResult = '';

        if (!requests && !friendsCandidates && !remainCandidates) {
            noResult = (
                <Fragment>
                    <h2>All registered users are already your friends!</h2>
                    <div className="hr-styles"></div>
                </Fragment>
            )
        }

        return (
            <Fragment>
                <article className="main-article-shared-content">
                    <section className="friend-content-section">
                        <div className="container col-md-12 text-center mb-5">
                            <h1 className="text-center font-weight-bold mt-4" style={{ 'margin': '1rem auto' }}>
                                Find Friends
                            </h1>
                            <div className="hr-styles"></div>
                            <section className="friend-section" >
                                {requests}
                                {friendsCandidates}
                                {remainCandidates}
                                {noResult}
                            </section>
                        </div>

                    </section>
                </article>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        timeLineUserData: state.timeLineUserData,
        loggedInUserData: state.loggedInUserData,

        findFriendsData: state.findFriends,
        friendsCandidatesArr: state.findFriends.friendsCandidatesArr,
        userWaitingForAcceptingRequest: state.findFriends.userWaitingForAcceptingRequest,
        usersReceivedRequestFromCurrentUser: state.findFriends.usersReceivedRequestFromCurrentUser,

        addfriendData: state.addfriend,
        cancelRequestData: state.cancelRequest,
        confirmRequestData: state.confirmRequest,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTimeLineUser: (userId) => { dispatch(changeCurrentTimeLineUserAction(userId)) },
        changeAllFriends: (userId) => { dispatch(changeAllFriendsAction(userId)) },
        changeAllPictures: (userId) => { dispatch(changeAllPicturesAction(userId)) },
        findFriends: (userId) => { dispatch(findFriendsAction(userId)) },
        addFriend: (loggedInUserId, friendCandidateId) => { dispatch(addFriendAction(loggedInUserId, friendCandidateId)) },
        cancelRequest: (loggedInUserId, friendToRejectId) => { dispatch(cancelRequestAction(loggedInUserId, friendToRejectId)) },
        acceptRequest: (loggedInUserId, friendToAcceptId) => { dispatch(confirmRequestAction(loggedInUserId, friendToAcceptId)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFindFriendsPage);