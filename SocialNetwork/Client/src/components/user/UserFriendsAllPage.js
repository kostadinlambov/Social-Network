import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import Friend from './Friend';
import './css/UserFriends.css';

import { connect } from 'react-redux';
import { changeCurrentTimeLineUserAction, changeAllFriendsAction, removeFriendAction } from '../../store/actions/userActions';
import { changeAllPicturesAction } from '../../store/actions/pictureActions';

class UserFriendsAllPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            friendsArr: this.props.friendsArr,
            id: this.props.id,
        };
    }

    componentDidMount() {
        const currentTimeLineUserId = this.props.match.params.id;
        if (currentTimeLineUserId !== this.props.timeLineUserData.id) {
            this.props.changeTimeLineUser(currentTimeLineUserId);
            this.props.changeAllPictures(currentTimeLineUserId);
            this.props.changeAllFriends(currentTimeLineUserId);
        }
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
        if (!this.props.removeFriend.hasError && this.props.removeFriend.message && this.props.removeFriend !== prevProps.removeFriend) {
            return this.props.removeFriend.message;
        }
        return null;
    }

    getErrorMessage(prevProps) {
        if (this.props.removeFriend.hasError && prevProps.removeFriend.error !== this.props.removeFriend.error) {
            return this.props.removeFriend.message || 'Server Error';
        }
        return null;
    }

    removeFriend = (friendToRemoveId, event) => {
        const loggedInUserId = this.props.loggedInUserData.id
        this.props.deleteFriend(loggedInUserId, friendToRemoveId);
    }

    render() {
        const isTheCurrentLoggedInUser = (this.props.loggedInUserData.id === this.props.timeLineUserData.id);

        return (
            <Fragment >
                <article className="main-article-shared-content">
                    <section className="friend-content-section">
                        <div className="container col-md-12 text-center mb-5">
                            <h1 className="text-center font-weight-bold mt-4" style={{ 'margin': '1rem auto' }}>Friends </h1>
                            <div className="hr-styles"></div>
                            <section className="friend-section" >
                                {this.props.friendsArr.length > 0 ?
                                    this.props.friendsArr.map((friend) =>
                                        isTheCurrentLoggedInUser ?
                                            <Friend
                                                key={friend.id}
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
                                                {...friend}
                                                firstButtonLink={`/home/profile/${friend.id}`}
                                                secondButtonLink={`/home/comments/${this.props.loggedInUserData.id}`}
                                                firstButtonText={'VIEW PROFILE'}
                                                secondButtonText={'HOME'}
                                            />)
                                    :
                                    (<Fragment>
                                        <h2>You don't have any friends. Find some!</h2>
                                        {
                                            isTheCurrentLoggedInUser ?
                                                (<button className="button view-activity">
                                                    <NavLink to={`/home/findFriends/${this.props.loggedInUserData.id}`}>FIND FRIENDS</NavLink>
                                                </button>)
                                                : null
                                        }
                                        <div className="hr-styles"></div>
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

const mapStateToProps = (state) => {
    return {
        timeLineUserData: state.timeLineUserData,
        loggedInUserData: state.loggedInUserData,

        fetchAllLogs: state.fetchAllLogs,
        logsArr: state.fetchAllLogs.logsArr,

        friendsArr: state.fetchAllFriends.friendsArr,
        fetchAllFriends: state.fetchAllFriends,

        removeFriend: state.removeFriend
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTimeLineUser: (userId) => { dispatch(changeCurrentTimeLineUserAction(userId)) },
        changeAllFriends: (userId) => { dispatch(changeAllFriendsAction(userId)) },
        changeAllPictures: (userId) => { dispatch(changeAllPicturesAction(userId)) },
        deleteFriend: (loggedInUserId, friendToRemoveId) => { dispatch(removeFriendAction(loggedInUserId, friendToRemoveId)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFriendsAllPage);