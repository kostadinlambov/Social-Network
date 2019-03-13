import React, { Component, Fragment } from 'react';
import { requester, userService } from '../../infrastructure'
import { toast } from 'react-toastify';
import { ToastComponent } from '../common'
import Friend from './Friend';
import FriendRequest from './FriendRequest';
import './css/UserFriends.css'

export default class UserSearchResultsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            friendsArrSearch: this.props.friendsArrSearch,
            friendsCandidatesArr: this.props.friendsCandidatesArr,
            userWaitingForAcceptingRequest: this.props.userWaitingForAcceptingRequest,
            usersReceivedRequestFromCurrentUser: this.props.usersReceivedRequestFromCurrentUser,
            search: '',
            userId: userService.getUserId(),
        };

        this.addFriend = this.addFriend.bind(this);
        this.confirmRequest = this.confirmRequest.bind(this);
        this.rejectRequest = this.rejectRequest.bind(this);
        this.removeFriend = this.removeFriend.bind(this);
    }

    componentDidMount() {
        const userId = userService.getUserId();
        const search = this.props.location.state.search;
        this.setState({ search })

        this.props.getUserToShowId(userId);
        this.props.searchResults(userId, search);
    }

    addFriend = (friendCandidateId, event) => {
        event.preventDefault();
        const requestBody = { loggedInUserId: userService.getUserId(), friendCandidateId: friendCandidateId }

        console.log('requestBody: ', requestBody)
        debugger;
        requester.post('/relationship/addFriend', requestBody, (response) => {
            console.log('AddFriend response: ', response)
            debugger;
            if (response.success) {
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                this.props.searchResults(this.state.userId, this.state.search);
            } else {
                debugger;
                console.log('error message: ', response.message);
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }).catch(err => {
            debugger;
            console.error('Add Friend err:', err)
            toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
                this.props.history.push('/login');
            }
        })
    }

    confirmRequest = (friendToAcceptId, event) => {
        event.preventDefault();

        const requestBody = { loggedInUserId: userService.getUserId(), friendToAcceptId: friendToAcceptId }

        console.log('requestBody: ', requestBody)

        requester.post('/relationship/acceptFriend', requestBody, (response) => {
            console.log('AcceptFriend response: ', response)
            debugger;
            if (response.success) {
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
                this.props.searchResults(this.state.userId, this.state.search)
            } else {
                debugger;
                console.log('error message: ', response.message);
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }).catch(err => {
            debugger;
            console.error('Remove Friend err:', err)
            toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
                this.props.history.push('/login');
            }
        })
    }

    rejectRequest = (friendToRejectId, event) => {
        event.preventDefault();

        const requestBody = { loggedInUserId: userService.getUserId(), friendToRejectId: friendToRejectId }

        console.log('requestBody: ', requestBody)

        requester.post('/relationship/cancelRequest', requestBody, (response) => {
            console.log('RejectFriend response: ', response)
            debugger;
            if (response.success) {
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                this.props.searchResults(this.state.userId, this.state.search);
            } else {
                debugger;
                console.log('error message: ', response.message);
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }).catch(err => {
            debugger;
            console.error('Remove Friend err:', err)
            toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
                this.props.history.push('/login');
            }
        })
    }

    removeFriend = (friendToRemoveId, event) => {
        event.preventDefault();

        const requestBody = { loggedInUserId: userService.getUserId(), friendToRemoveId: friendToRemoveId }

        console.log('requestBody: ', requestBody)

        requester.post('/relationship/removeFriend', requestBody, (response) => {
            if (response.success) {
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                this.props.searchResults(this.state.userId, this.state.search)
            } else {
                debugger;
                console.log('error message: ', response.message);
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }).catch(err => {
            debugger;
            console.error('Remove Friend err:', err)
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
        const userId = userService.getUserId();
        const search = this.props.location.state.search;

        if (this.state.search !== search) {
            this.setState({ search: search },
                () => this.props.searchResults(userId, search)
            );
        }

        console.log('friendsArrSearch: ', this.props.friendsArrSearch)
        console.log('userWaitingForAcceptingRequest: ', this.props.userWaitingForAcceptingRequest)
        console.log('frienusersReceivedRequestFromCurrentUserdsArrSearch: ', this.props.usersReceivedRequestFromCurrentUser)
        console.log('friendsCandidatesArr: ', this.props.friendsCandidatesArr)
        // debugger;

        const friendsArrLength = this.props.friendsArrSearch.length;
        let friends = '';
      
        if (friendsArrLength > 0) {
            friends = (
                <Fragment>
                    <h3>Users From Your Friend List</h3>
                    <hr className="my-2 mb-5 mt-2 col-md-8 mx-auto" />
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
                    <hr className="my-2 mb-5 mt-3 col-md-12 mx-auto" />
                </Fragment>
            )
        }

        const requestLength = this.props.userWaitingForAcceptingRequest.length;
        let requests = '';
        debugger;
        if (requestLength > 0) {
            requests = (
                <Fragment>
                    <h3>Respond to Your Friend Requests</h3>
                    <hr className="my-2 mb-5 mt-2 col-md-8 mx-auto" />
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
                    <hr className="my-2 mb-5 mt-3 col-md-12 mx-auto" />
                </Fragment>
            )
        }

        let waitingForResponseUsers = this.props.usersReceivedRequestFromCurrentUser.length;
        let friendsCandidates = '';

        if (waitingForResponseUsers > 0) {
            friendsCandidates = (
                <Fragment>
                    <h3>Pending Requests</h3>
                    <hr className="my-2 mb-5 mt-2 col-md-8 mx-auto" />
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
                    <hr className="my-2 mb-5 mt-3 col-md-12 mx-auto" />
                </Fragment>
            )
        }

        let friendsCandidatesArr = this.props.friendsCandidatesArr.length;
        let remainCandidates = '';

        if (friendsCandidatesArr > 0) {
            remainCandidates = (
                <Fragment>
                    <h3>People You May Know</h3>
                    <hr className="my-2 mb-5 mt-3 col-md-8 mx-auto" />
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
                    <hr className="my-2 mb-5 mt-3 col-md-12 mx-auto" />
                </Fragment>
            )
        }

        let noResult = '';

        if (!friends && !requests && !friendsCandidates && !remainCandidates) {
            noResult = (
                <Fragment>
                    <h2>No results for "{this.state.search}"</h2>
                    <hr className="my-2 mb-5 mt-3 col-md-12 mx-auto" />
                </Fragment>
            )
        }

        return (
            <div className="container col-md-12 text-center">
                <h1 className="text-center font-weight-bold display-5" style={{ 'margin': '1rem auto' }}>Search Results</h1>
                <hr className="my-2 mb-5 mt-3 col-md-12 mx-auto" />
                <section className="friend-section" >
                    {friends}
                    {requests}
                    {friendsCandidates}
                    {remainCandidates}
                    {noResult}
                </section>
            </div>
        )
    }
}