import React, { Component, Fragment } from 'react';
import { requester, userService } from '../../infrastructure'
import { toast } from 'react-toastify';
import { ToastComponent } from '../common'
import Friend from './Friend';
import FriendRequest from './FriendRequest';
import './css/UserFriends.css'

export default class UserFindFriendsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            friendsCandidatesArr: [],
            userWaitingForAcceptingRequest: [],
            usersReceivedRequestFromCurrentUser: [],
            category: '',
        };

        this.addFriend = this.addFriend.bind(this);
        this.confirmRequest = this.confirmRequest.bind(this);
        this.rejectRequest = this.rejectRequest.bind(this);
    }

    componentDidMount() {
        const userId = this.props.match.params.id;
        const category = this.props.match.params.category;

        this.setState({ category, userId })
        debugger;
        this.props.getUserToShowId(userId);
        this.props.findFriends(userId, category);
    }

    addFriend = (friendCandidateId, event) => {
        event.preventDefault();
        const requestBody = { loggedInUserId: userService.getUserId(), friendCandidateId: friendCandidateId }

        requester.post('/relationship/addFriend', requestBody, (response) => {
            console.log('AddFriend response: ', response)
            if (response.success) {
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                this.props.findFriends(this.state.userId, this.state.category);


                // this.props.history.push("/home/findFriends/" + userService.getUserId())

            } else {
                console.log('error message: ', response.message);
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }).catch(err => {
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

        requester.post('/relationship/acceptFriend', requestBody, (response) => {
            if (response.success) {
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                this.props.findFriends(this.state.userId, this.state.category);
            } else {
                console.log('error message: ', response.message);
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }).catch(err => {
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
        requester.post('/relationship/cancelRequest', requestBody, (response) => {
            console.log('RejectFriend response: ', response)
            if (response.success) {
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                this.props.findFriends(this.state.userId, this.state.category);
            } else {
                console.log('error message: ', response.message);
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }).catch(err => {
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
        if (this.props.match.params.id !== this.props.id) {
            this.props.getUserToShowId(this.props.match.params.id);
        }

        const categoryFromUrl = this.props.match.params.category
        console.log('categoryFromUrl :', categoryFromUrl)
        console.log('this.props.category :', this.props.category)

        if(this.props.category !== categoryFromUrl){
            this.props.findFriends(this.state.userId, categoryFromUrl)
        }

        console.log('props: ', this.props)

        const requestLength = this.props.userWaitingForAcceptingRequest.length;
        let requests = '';

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

        if (!requests && !friendsCandidates && !remainCandidates) {
            noResult = (
                <Fragment>
                    <h2>All registered users are already your friends!</h2>
                    <hr className="my-2 mb-5 mt-3 col-md-12 mx-auto" />
                </Fragment>
            )
        }

        const { category } = this.props;
        let isRequestsSearch = category === 'requests';

        console.log('category: ',  category);
        console.log('isRequestsSearch: ',  isRequestsSearch);
        debugger;
        if (!requests && isRequestsSearch) {
            requests = (
                <Fragment>
                    <h2>There are no friend requests!</h2>
                    <hr className="my-2 mb-5 mt-3 col-md-12 mx-auto" />
                </Fragment>)
        }

        return (
            <div className="container col-md-12 text-center">
                <h1 className="text-center font-weight-bold display-5" style={{ 'margin': '1rem auto' }}>
                    {category === 'findFriends' ? 'Find Friends' : 'Friend Requests'}
                </h1>
                <hr className="my-2 mb-5 mt-3 col-md-12 mx-auto" />
                <section className="friend-section" >
                    {requests}
                    {!isRequestsSearch && friendsCandidates}
                    {!isRequestsSearch && remainCandidates}
                    {!isRequestsSearch && noResult}
                </section>
            </div>
        )
    }
}