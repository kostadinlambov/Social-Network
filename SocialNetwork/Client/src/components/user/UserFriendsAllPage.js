import React, { Component } from 'react';
import UserRow from './UserRow';
import { requester } from '../../infrastructure'
import { toast } from 'react-toastify';
import { ToastComponent } from '../common'
import Friend from './Friend';
import './css/UserFriends.css'


export default class UserFriendsAllPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            friendsArr: []
        };
    }

    componentDidMount() {
        const userId = this.props.match.params.id;
        debugger;
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

    render() {

        debugger;
        return (
            <div className="container col-md-12 text-center">
                <h1 className="text-center font-weight-bold display-5" style={{ 'margin': '1rem auto' }}>Friends</h1>
                <hr className="my-2 mb-5 mt-3 col-md-12 mx-auto" />
                <section className="friend-section" >
                    {this.state.friendsArr.map((friend) =>
                        <Friend
                            key={friend.id}
                            {...friend}
                            {...this.props}
                            firstButtonLink={`/home/profile/${friend.id}`}
                            secondButtonLink={`/`}
                            firstButtonText={'VIEW PROFILE'}
                            secondButtonText={'REMOVE'}
                        />)}
                </section>
            </div>
        )
    }
}