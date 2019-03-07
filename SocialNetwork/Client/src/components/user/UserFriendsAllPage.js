import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import UserRow from './UserRow';
import { requester, userService } from '../../infrastructure'
import { toast } from 'react-toastify';
import { ToastComponent } from '../common'
import Friend from './Friend';
import './css/UserFriends.css'


export default class UserFriendsAllPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            friendsArr: [],
            id: ''
        };
    }

    componentDidMount() {
        const userId = this.props.match.params.id;
        this.setState({ id: userId })
        
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

    removeFriend = (friendToRemoveId, event) => {
        console.log('event: ', event)
        console.log('friendToRemoveId: ', friendToRemoveId)

        event.preventDefault();

        // const id = this.state.id;
        const requestBody = { loggedInUserId: userService.getUserId(), friendToRemoveId: friendToRemoveId }

        console.log('requestBody: ', requestBody)

        requester.post('/relationship/removeFriend', requestBody, (response) => {
            console.log('RemoveFriend response: ', response)
            debugger;
            if (response.success) {
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                this.props.history.push("/home/friends/" + userService.getUserId())

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

        return (
            <div className="container col-md-12 text-center">
                <h1 className="text-center font-weight-bold display-5" style={{ 'margin': '1rem auto' }}>Friends </h1>
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
                                secondButtonText={'REMOVE'}
                                secondButtonOnClick={this.removeFriend}
                            />)
                        :
                        <Fragment>
                            <h2>You don't have any friends. Find some!</h2>
                            <button className="button view-activity">
                                <NavLink to={`/home/findFriends/${this.state.id}`}>FIND FRIENDS</NavLink>
                            </button>
                        </Fragment>
                    }
                </section>
            </div>
        )
    }
}