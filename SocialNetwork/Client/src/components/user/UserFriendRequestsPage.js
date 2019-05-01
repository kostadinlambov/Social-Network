import React, { Component, Fragment } from 'react';
import { requester, userService } from '../../infrastructure'
import { toast } from 'react-toastify';
import { ToastComponent } from '../common'
import Friend from './Friend';
import FriendRequest from './FriendRequest';
import './css/UserFriends.css';

import { connect } from 'react-redux';
import { changeCurrentTimeLineUserAction, changeAllFriendsAction, findFriendsAction } from '../../store/actions/userActions';
import { changeAllPicturesAction } from '../../store/actions/pictureActions';

class UserFriendRequestsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            friendsCandidatesArr: [],
            userWaitingForAcceptingRequest: [],
            usersReceivedRequestFromCurrentUser: [],
            category: '',
            ready: false,
        };

        this.addFriend = this.addFriend.bind(this);
        this.confirmRequest = this.confirmRequest.bind(this);
        this.rejectRequest = this.rejectRequest.bind(this);
        // this.findFriends = this.findFriends.bind(this);
    }

    componentDidMount() {
        const userId = this.props.match.params.id;
        const category = this.props.match.params.category;

        this.setState({ category, userId })
        // this.props.getUserToShowId(userId);
        // this.props.findFriends(userId, category);

        const loggedInUserId = this.props.loggedInUserData.id;
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
        // else if (!this.props.findLogsByUserName.hasError && this.props.findLogsByUserName.message && this.props.findLogsByUserName !== prevProps.findLogsByUserName) {
        //     return this.props.findLogsByUserName.message;
        // } else if (!this.props.clearLogsByUserName.hasError && this.props.clearLogsByUserName.message && this.props.clearLogsByUserName !== prevProps.clearLogsByUserName) {
        //     this.setState({
        //         selected: '',
        //         search: '',
        //     })
        //     return this.props.clearLogsByUserName.message;
        // } else if (!this.props.clearAllLogs.hasError && this.props.clearAllLogs.message && this.props.clearAllLogs !== prevProps.clearAllLogs) {
        //     this.setState({
        //         selected: '',
        //         search: '',
        //     })

        //     return this.props.clearAllLogs.message;
        // }

        return null;
    }

    getErrorMessage(prevProps) {
        if (this.props.findFriendsData.hasError && prevProps.findFriendsData.error !== this.props.findFriendsData.error) {
            return this.props.findFriendsData.message || 'Server Error';
        }
        // else if (this.props.findLogsByUserName.hasError && prevProps.findLogsByUserName.error !== this.props.findLogsByUserName.error) {
        //     this.setState({
        //         selected: '',
        //     })
        //     return this.props.findLogsByUserName.message || 'Server Error';
        // } else if (this.props.clearLogsByUserName.hasError && prevProps.clearLogsByUserName.error !== this.props.clearLogsByUserName.error) {
        //     return this.props.clearLogsByUserName.message || 'Server Error';
        // } else if (this.props.clearAllLogs.hasError && prevProps.clearAllLogs.error !== this.props.clearAllLogs.error) {
        //     return this.props.clearAllLogs.message || 'Server Error';
        // }

        return null;
    }

    // findFriends = () => {
      
    // }

    addFriend = (friendCandidateId, event) => {
        event.preventDefault();
        const requestBody = { loggedInUserId: userService.getUserId(), friendCandidateId: friendCandidateId }

        requester.post('/relationship/addFriend', requestBody, (response) => {
            if (response.success) {
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                this.props.findFriends(this.state.userId, this.state.category);
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

    rejectRequest = (friendToRejectId, event) => {
        event.preventDefault();
        const requestBody = { loggedInUserId: userService.getUserId(), friendToRejectId: friendToRejectId }
        requester.post('/relationship/cancelRequest', requestBody, (response) => {
            if (response.success) {
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                this.props.findFriends(this.state.userId, this.state.category);
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

    render() {
        const loading = this.props.findFriendsData.loading;
  
        if (!this.state.ready || loading) {
            return null;
            // debugger;
            // return <h1 className="text-center pt-5 mt-5">Loading...</h1>
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

        if (!requests) {
            requests = (
                <Fragment>
                    <h2>There are no friend requests!</h2>
                    <div className="hr-styles"></div>
                </Fragment>)
        }

        return (
            <Fragment>
                <article className="main-article-shared-content">
                    <section className="friend-content-section">
                        <div className="container col-md-12 text-center mb-5">
                            <h1 className="text-center font-weight-bold mt-4" style={{ 'margin': '1rem auto' }}>
                                Friend Requests
                            </h1>
                            <div className="hr-styles"></div>
                            <section className="friend-section" >
                                {requests}
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTimeLineUser: (userId) => { dispatch(changeCurrentTimeLineUserAction(userId)) },
        changeAllFriends: (userId) => { dispatch(changeAllFriendsAction(userId)) },
        changeAllPictures: (userId) => { dispatch(changeAllPicturesAction(userId)) },
        findFriends: (userId) => { dispatch(findFriendsAction(userId)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFriendRequestsPage);