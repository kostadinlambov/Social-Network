import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { requester, userService } from '../../infrastructure'
import { toast } from 'react-toastify';
import { ToastComponent } from '../common'
import Friend from './Friend';
import './css/UserFriends.css'

export default class UserFriendsAllPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            friendsArr: this.props.friendsArr,
            id: this.props.id,
        };
    }

    componentDidMount() {
        const userId = this.props.match.params.id;
        this.setState({ id: userId });
    }

    removeFriend = (friendToRemoveId, event) => {
        event.preventDefault();
        const requestBody = { loggedInUserId: this.props.id, friendToRemoveId: friendToRemoveId }

        requester.post('/relationship/removeFriend', requestBody, (response) => {
            if (response.success) {
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                this.props.loadAllFriends(this.props.id);
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
        if (this.props.match.params.id !== this.props.id) {
            this.props.getUserToShowId(this.props.match.params.id);
        }

        const isTheCurrentLoggedInUser = (this.props.id === userService.getUserId());

        return (
            <Fragment >
                <article className="main-article-shared-content">
                    <section className="friend-content-section">
                        <div className="container col-md-12 text-center mb-5">
                            <h1 className="text-center font-weight-bold mt-4" style={{ 'margin': '1rem auto' }}>Friends </h1>
                            <hr className="my-2 mb-5 mt-3 col-md-10 mx-auto" />
                            <section className="friend-section" >
                                {this.props.friendsArr.length > 0 ?
                                    this.props.friendsArr.map((friend) =>
                                        isTheCurrentLoggedInUser ?
                                            <Friend
                                                key={friend.id}
                                                {...this.props}
                                                {...friend}
                                                firstButtonLink={`/home/profile/${friend.id}`}
                                                secondButtonLink={`/`}
                                                firstButtonText={'VIEW PROFILE'}
                                                secondButtonText={'REMOVE'}
                                                secondButtonOnClick={this.removeFriend}
                                            />
                                            :
                                            <Friend
                                                key={friend.id}
                                                {...this.props}
                                                {...friend}
                                                firstButtonLink={`/home/profile/${friend.id}`}
                                                secondButtonLink={`/`}
                                                firstButtonText={'VIEW PROFILE'}
                                                secondButtonText={'HOME'}
                                            />)
                                    :
                                    (<Fragment>
                                        <h2>You don't have any friends. Find some!</h2>
                                        {
                                            isTheCurrentLoggedInUser ?
                                                (<button className="button view-activity">
                                                    <NavLink to={`/home/findFriends/${this.props.id}/findFriends`}>FIND FRIENDS</NavLink>
                                                </button>)
                                                : null
                                        }
                                        <hr className="my-2 mb-5 mt-3 col-md-12 mx-auto" />
                                    </Fragment>
                                    )
                                }
                            </section>
                        </div>
                    </section>
                </article>
            </Fragment>
        )
    }
}