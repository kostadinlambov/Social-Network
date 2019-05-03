import React, { Component, Fragment } from 'react';
import {userService} from '../../infrastructure';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common'
import Friend from './Friend';
import FriendRequest from './FriendRequest';
import './css/UserFriends.css';

import { connect } from 'react-redux';
import {
    changeCurrentTimeLineUserAction, changeAllFriendsAction, addFriendAction,
    cancelRequestAction, confirmRequestAction, removeFriendAction, searchResultsAction
} from '../../store/actions/userActions';
import { changeAllPicturesAction } from '../../store/actions/pictureActions';

class UserSearchResultsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: '',
            ready: false,
        };

        this.addFriend = this.addFriend.bind(this);
        this.confirmRequest = this.confirmRequest.bind(this);
        this.rejectRequest = this.rejectRequest.bind(this);
        this.removeFriend = this.removeFriend.bind(this);
    }

    componentDidMount() {
        const loggedInUserId = userService.getUserId();
        if (loggedInUserId !== this.props.timeLineUserData.id) {
            this.props.changeTimeLineUser(loggedInUserId);
            this.props.changeAllPictures(loggedInUserId);
            this.props.changeAllFriends(loggedInUserId);
        }

        this.setState({ready: true})
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
        if (!this.props.addfriendData.hasError && this.props.addfriendData.message && this.props.addfriendData !== prevProps.addfriendData) {
            return this.props.addfriendData.message;
        }
        else if (!this.props.cancelRequestData.hasError && this.props.cancelRequestData.message && this.props.cancelRequestData !== prevProps.cancelRequestData) {
            return this.props.cancelRequestData.message;
        }
        else if (!this.props.confirmRequestData.hasError && this.props.confirmRequestData.message && this.props.confirmRequestData !== prevProps.confirmRequestData) {
            return this.props.confirmRequestData.message;
        }
        else if (!this.props.removeFriend.hasError && this.props.removeFriend.message && this.props.removeFriend !== prevProps.removeFriend) {
            return this.props.removeFriend.message;
        }

        return null;
    }

    getErrorMessage(prevProps) {
        if (this.props.addfriendData.hasError && prevProps.addfriendData.error !== this.props.addfriendData.error) {
            return this.props.addfriendData.message || 'Server Error';
        }
        else if (this.props.cancelRequestData.hasError && prevProps.cancelRequestData.error !== this.props.cancelRequestData.error) {
            return this.props.cancelRequestData.message || 'Server Error';
        }
        else if (this.props.confirmRequestData.hasError && prevProps.confirmRequestData.error !== this.props.confirmRequestData.error) {
            return this.props.confirmRequestData.message || 'Server Error';
        }
        else if (this.props.removeFriend.hasError && prevProps.removeFriend.error !== this.props.removeFriend.error) {
            return this.props.removeFriend.message || 'Server Error';
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

    removeFriend = (friendToRemoveId, event) => {
        const loggedInUserId = this.props.loggedInUserData.id
        this.props.deleteFriend(loggedInUserId, friendToRemoveId);
    }

    render() {
        if(!this.state.ready){
            return <h1 className="text-center pt-5 mt-5">Loading...</h1>
        }

        const friendsArrLength = this.props.friendsArrSearch.length;
        let friends = '';

        if (friendsArrLength > 0) {
            friends = (
                <Fragment>
                    <h3 className="mt-5">Users From Your Friend List</h3>
                    <div className="hr-styles"></div>
                    {this.props.friendsArrSearch.map((friend) =>
                        <Friend
                            key={friend.id}
                            {...this.props}
                            {...friend}
                            firstButtonLink={`/home/profile/${friend.id}`}
                            secondButtonLink={`/`}
                            firstButtonText={'VIEW PROFILE'}
                            secondButtonText={'REMOVE'}
                            secondButtonOnClick={this.removeFriend}
                        />)}
                </Fragment>
            )
        }

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

        if (!friends && !requests && !friendsCandidates && !remainCandidates && !this.props.searchResults.loading) {
            noResult = (
                <Fragment>
                    <h2>No results for <span className="App-secondary-color">"{this.props.search}"</span></h2>
                    <div className="hr-styles"></div>
                </Fragment>
            )
        }

        return (
            <Fragment>
                <article className="main-article-shared-content">
                    <section className="friend-content-section">
                        <div className="container col-md-12 text-center mb-5">
                            <h1 className="text-center font-weight-bold mt-4" style={{ 'margin': '1rem auto' }}>Search Results</h1>
                            <div className="hr-styles"></div>
                            <section className="friend-section" >
                                {friends}
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

        searchResults: state.searchResults,
        search: state.searchResults.search,
        friendsArrSearch: state.searchResults.friendsArrSearch,
        friendsCandidatesArr: state.searchResults.friendsCandidatesArr,
        userWaitingForAcceptingRequest: state.searchResults.userWaitingForAcceptingRequest,
        usersReceivedRequestFromCurrentUser: state.searchResults.usersReceivedRequestFromCurrentUser,

        addfriendData: state.addfriend,
        cancelRequestData: state.cancelRequest,
        confirmRequestData: state.confirmRequest,
        removeFriend: state.removeFriend
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTimeLineUser: (userId) => { dispatch(changeCurrentTimeLineUserAction(userId)) },
        changeAllFriends: (userId) => { dispatch(changeAllFriendsAction(userId)) },
        changeAllPictures: (userId) => { dispatch(changeAllPicturesAction(userId)) },
        addFriend: (loggedInUserId, friendCandidateId) => { dispatch(addFriendAction(loggedInUserId, friendCandidateId)) },
        cancelRequest: (loggedInUserId, friendToRejectId) => { dispatch(cancelRequestAction(loggedInUserId, friendToRejectId)) },
        acceptRequest: (loggedInUserId, friendToAcceptId) => { dispatch(confirmRequestAction(loggedInUserId, friendToAcceptId)) },
        deleteFriend: (loggedInUserId, friendToRemoveId) => { dispatch(removeFriendAction(loggedInUserId, friendToRemoveId)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSearchResultsPage);