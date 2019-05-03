import React, { Component, Fragment } from 'react';
import {userService} from '../../infrastructure';
import UserRow from './UserRow';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import './css/UserAllPage.css';

import { connect } from 'react-redux';
import {
    fetchAllUsersAction, promoteUserAction, demoteUserAction,
    changeCurrentTimeLineUserAction, changeAllFriendsAction
} from '../../store/actions/userActions';
import { changeAllPicturesAction } from '../../store/actions/pictureActions';

class UserAllPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            userArr: [],
        };

        this.promote = this.promote.bind(this);
        this.demote = this.demote.bind(this);
        this.changeTimeLineUser = this.changeTimeLineUser.bind(this);
    }

    componentDidMount() {
        const loggedInUserId = userService.getUserId();

        if (loggedInUserId !== this.props.timeLineUserData.id) {
            this.props.changeTimeLineUser(loggedInUserId);
            this.props.changeAllPictures(loggedInUserId);
            this.props.changeAllFriends(loggedInUserId);
        }
      
        this.props.loadAllUsers(loggedInUserId);
    }

    componentDidUpdate(prevProps, prevState) {
        const loading = this.props.fetchAllUsers.loading ||
            this.props.promoteUserData.loading || this.props.demoteUserData.loading;

        const errorMessage = this.getErrorMessage(prevProps);
        const successMessage = this.getSuccessMessage(prevProps)

        if (errorMessage && !loading) {
            toast.error(<ToastComponent.errorToast text={errorMessage} />, {
                position: toast.POSITION.TOP_RIGHT
            });
        } else if (successMessage && !loading) {
            toast.success(<ToastComponent.successToast text={successMessage} />, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    getSuccessMessage(prevProps) {
        if (!this.props.fetchAllUsers.hasError && this.props.fetchAllUsers.message && this.props.fetchAllUsers !== prevProps.fetchAllUsers) {
            return this.props.fetchAllUsers.message;
        }
        if (!this.props.promoteUserData.hasError && this.props.promoteUserData.message && this.props.promoteUserData !== prevProps.promoteUserData) {
            return this.props.promoteUserData.message;
        }
        if (!this.props.demoteUserData.hasError && this.props.demoteUserData.message && this.props.demoteUserData !== prevProps.demoteUserData) {
            return this.props.demoteUserData.message;
        }

        return null;
    }

    getErrorMessage(prevProps) {
        if (this.props.fetchAllUsers.hasError && prevProps.fetchAllUsers.error !== this.props.fetchAllUsers.error) {
            return this.props.fetchAllUsers.message || 'Server Error';
        }
        if (this.props.promoteUserData.hasError && prevProps.promoteUserData.error !== this.props.promoteUserData.error) {
            return this.props.promoteUserData.message || 'Server Error';
        }
        if (this.props.demoteUserData.hasError && prevProps.demoteUserData.error !== this.props.demoteUserData.error) {
            return this.props.demoteUserData.message || 'Server Error';
        }

        return null;
    }

    promote = (userId) => {
        this.props.promoteUser(userId);
    }

    demote = (userId) => {
        this.props.demoteUser(userId);
    }

    changeTimeLineUser = (userId) => {
        this.props.changeTimeLineUser(userId);
        this.props.history.push(`/home/profile/${userId}`)
    }

    render() {
        return (
            <Fragment>
                <article className="main-article-shared-content">
                    <section className="profile-content-section">
                        <div className="container col-md-10 text-center mb-4">
                            <h1 className="text-center font-weight-bold mt-4" style={{ 'margin': '1rem auto' }}>All Users</h1>
                            <table className="table table-hover mt-3 w-80 mx-auto text-center">
                                <thead>
                                    <tr className="row">
                                        <th className="col-md-1" scope="col">#</th>
                                        <th className="col-md-2" scope="col">Username</th>
                                        <th className="col-md-2" scope="col">Role</th>
                                        <th className="col-md-7" scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.userArr.map((user, i) => <UserRow
                                        key={user.id}
                                        index={i + 1}
                                        promote={this.promote}
                                        demote={this.demote}
                                        changeTimeLineUser={this.changeTimeLineUser}
                                        {...user} />)}
                                </tbody>
                            </table>

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
        userArr: state.fetchAllUsers.userArr,
        fetchAllUsers: state.fetchAllUsers,
        promoteUserData: state.promoteUserData,
        demoteUserData: state.demoteUserData,
        changeTimeLineUserData: state.changeTimeLineUserData,
        changePicture: state.changePicture,
        changeAllFriends: state.changeAllFriends
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadAllUsers: (userId) => { dispatch(fetchAllUsersAction(userId)) },
        promoteUser: (userId) => { dispatch(promoteUserAction(userId)) },
        demoteUser: (userId) => { dispatch(demoteUserAction(userId)) },
        changeTimeLineUser: (userId) => { dispatch(changeCurrentTimeLineUserAction(userId)) },
        changeAllFriends: (userId) => { dispatch(changeAllFriendsAction(userId)) },
        changeAllPictures: (userId) => { dispatch(changeAllPicturesAction(userId)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAllPage);