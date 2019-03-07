import React, { Component, Fragment } from 'react';
import UserRow from './UserRow';
import { requester, userService } from '../../infrastructure'
import { toast } from 'react-toastify';
import { ToastComponent } from '../common'
import Friend from './Friend';
import './css/UserFriends.css'


export default class UserFindFriendsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            friendsCandidatesArr: [],
            userWaitingForAcceptingRequest: [],
            usersReceivedRequestFromCurrentUser: [],
        };

        this.addFriend = this.addFriend.bind(this);
    }

    componentDidMount() {
        const userId = this.props.match.params.id;
        debugger;
        requester.get(`/relationship/findFriends/${userId}`, (response) => {
            debugger;
            console.log('friends all: ', response);


            this.setState({
                friendsCandidatesArr: response.filter(user => user.status !== 0),
                userWaitingForAcceptingRequest: response.filter(user => user.status === 0 && user.starterOfAction === true),
                usersReceivedRequestFromCurrentUser: response.filter(user => user.status === 0 && user.starterOfAction === false)
            })

            console.log('response: ', response)
            console.log('friendsCandidatesArr: ', this.state.friendsCandidatesArr)
            console.log('userWaitingForAcceptingRequest: ', this.state.userWaitingForAcceptingRequest)
            console.log('usersReceivedRequestFromCurrentUser: ', this.state.usersReceivedRequestFromCurrentUser)

            debugger;
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

    addFriend = (friendCandidateId, event) => {
        console.log('event: ', event)
        console.log('friendCandidateId: ', friendCandidateId)
        debugger;
        event.preventDefault();
        debugger;
        // const id = this.state.id;
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

                this.props.history.push("/home/findFriends/" + userService.getUserId())

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

    render() {
        debugger;
        return (
            <div className="container col-md-12 text-center">
                <h1 className="text-center font-weight-bold display-5" style={{ 'margin': '1rem auto' }}>Find Friends</h1>
                <hr className="my-2 mb-5 mt-3 col-md-12 mx-auto" />
                <section className="friend-section" >
                    <h2>Respond to Your 10 Friend Requests</h2>
                    {this.state.userWaitingForAcceptingRequest.length > 0 &&
                        (
                            this.state.userWaitingForAcceptingRequest.map((friend) =>
                                <Friend
                                    key={friend.id}
                                    {...friend}
                                    {...this.props}
                                    firstButtonLink={`/home/profile/${friend.id}`}
                                    secondButtonLink={`/`}
                                    firstButtonText={'CONFIRM'}
                                    secondButtonText={'DELETE REQUEST'}
                                    secondButtonOnClick={this.addFriend}
                                />))
                    }

                    <hr className="my-2 mb-5 mt-3 col-md-12 mx-auto" />
                    <h2>People You May Know</h2>
                    {this.state.usersReceivedRequestFromCurrentUser.length > 0 &&
                        (
                            this.state.usersReceivedRequestFromCurrentUser.map((friend) =>
                                <Friend
                                    key={friend.id}
                                    {...friend}
                                    {...this.props}
                                    firstButtonLink={`/home/profile/${friend.id}`}
                                    secondButtonLink={`/`}
                                    firstButtonText={'VIEW PROFILE'}
                                    secondButtonText={'ADD FRIEND'}
                                    secondButtonOnClick={this.addFriend}
                                />))
                    }


                    {this.state.friendsCandidatesArr.length > 0 ?
                        this.state.friendsCandidatesArr.map((friend) =>
                            <Friend
                                key={friend.id}
                                {...friend}
                                {...this.props}
                                firstButtonLink={`/home/profile/${friend.id}`}
                                secondButtonLink={`/`}
                                firstButtonText={'VIEW PROFILE'}
                                secondButtonText={'ADD FRIEND'}
                                secondButtonOnClick={this.addFriend}
                            />)

                        : <h2>All registered users are already your friends!</h2>
                    }
                </section>
            </div>
        )
    }
}