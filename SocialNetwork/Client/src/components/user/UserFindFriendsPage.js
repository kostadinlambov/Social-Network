import React, { Component } from 'react';
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
            friendsArr: []
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
                <h1 className="text-center font-weight-bold display-5" style={{ 'margin': '1rem auto' }}>People You May Know</h1>
                <hr className="my-2 mb-5 mt-3 col-md-12 mx-auto" />
                <section className="friend-section" >
                    {this.state.friendsArr.length > 0 ?

                        this.state.friendsArr.map((friend) =>
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