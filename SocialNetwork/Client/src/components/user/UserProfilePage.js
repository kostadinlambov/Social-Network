import React, { Component, Fragment } from 'react';
import { userService } from '../../infrastructure';
import { Button, ButtonWithClickEvent } from '../common';
import './css/UserProfilePage.css';

import { connect } from 'react-redux';
import { changeCurrentTimeLineUserAction, changeAllFriendsAction } from '../../store/actions/userActions';
import { changeAllPicturesAction } from '../../store/actions/pictureActions';

class UserProfilePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentTimeLineUserId: '',
            ready: false
        }
    }

    componentDidMount() {
        const currentTimeLineUserId = this.props.match.params.id
        this.setState({ currentTimeLineUserId });

        if (currentTimeLineUserId !== this.props.timeLineUser.id) {
            this.initialDataLoad(currentTimeLineUserId);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentTimeLineUserId !== this.props.match.params.id) {
            this.initialDataLoad(this.props.match.params.id);
        }
    }

    initialDataLoad = (currentTimeLineUserId) => {
        this.setState({ currentTimeLineUserId },
            () => {
                this.props.changeTimeLineUser(currentTimeLineUserId);
                this.props.changeAllPictures(currentTimeLineUserId);
                this.props.changeAllFriends(currentTimeLineUserId);
            }
        )
    }

    onSubmitHandlerDelete = (e) => {
        this.props.history.push({
            pathname: "/home/users/delete/" + this.props.timeLineUser.id,
        });
    }

    onSubmitHandlerEdit = (e) => {
        this.props.history.push({
            pathname: "/home/users/edit/" + this.props.timeLineUser.id,
            state:
                { ...this.props.timeLineUser }
        });
    }

    render = () => {
        let timeLineUserRole;
        if (this.props.timeLineUser.authorities) {
            timeLineUserRole = this.props.timeLineUser.authorities[0]['authority'];
        }

        const isAdmin = userService.isAdmin();
        const isRoot = userService.isRoot();
        const isCurrentUserRoot = timeLineUserRole === 'ROOT';

        return (
            <Fragment >
                <article className="main-article-shared-content">
                    <section className="profile-content-section">
                        <div className="container mx-auto text-center mb-4 " >
                            <h1 className="text-center font-weight-bold mt-4" style={{ 'margin': '1rem auto' }}>Account Details </h1>

                            <div className="col-md-6 mx-auto text-center">
                                <table className="table table-hover mt-3 mx-auto text-center">
                                    <thead>
                                        <tr className="row align-center">
                                            {/* <th className="col-md-6" scope="col">Category:</th>
                                <th className="col-md-6" scope="col">Price</th>  */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="row">
                                            <td className="col-md-6">
                                                <h5 className=" font-weight-bold">Username</h5>
                                            </td>
                                            <td className="col-md-6 username-color" >
                                                <h5>{this.props.timeLineUser.username}</h5>
                                            </td>
                                        </tr>
                                        <tr className="row">
                                            <td className="col-md-6" >
                                                <h5 className=" font-weight-bold">Email</h5>
                                            </td>
                                            <td className="col-md-6">
                                                <h5>{userService.formatUsername(this.props.timeLineUser.email)}</h5>
                                            </td>
                                        </tr>
                                        <tr className="row">
                                            <td className="col-md-6" >
                                                <h5 className=" font-weight-bold">First Name</h5>
                                            </td>
                                            <td className="col-md-6" >
                                                <h5>{userService.formatUsername(this.props.timeLineUser.firstName)}</h5>
                                            </td>
                                        </tr>
                                        <tr className="row">
                                            <td className="col-md-6" >
                                                <h5 className=" font-weight-bold">Last Name</h5>
                                            </td>
                                            <td className="col-md-6" >
                                                <h5>{userService.formatUsername(this.props.timeLineUser.lastName)}</h5>
                                            </td>
                                        </tr>
                                        <tr className="row">
                                            <td className="col-md-6" >
                                                <h5 className=" font-weight-bold">Address</h5>
                                            </td>
                                            <td className="col-md-6">
                                                <h5>{userService.formatUsername(this.props.timeLineUser.address)}</h5>
                                            </td>
                                        </tr>
                                        <tr className="row">
                                            <td className="col-md-6" >
                                                <h5 className=" font-weight-bold">City</h5>
                                            </td>
                                            <td className="col-md-6" >
                                                <h5>{userService.formatUsername(this.props.timeLineUser.city)}</h5>
                                            </td>
                                        </tr>
                                        {(isAdmin || isRoot) && <tr className="row">
                                            <td className="col-md-6" >
                                                <h5 className=" font-weight-bold">Role</h5>
                                            </td>
                                            <td className="col-md-6" >
                                                <h5>{timeLineUserRole}</h5>
                                            </td>
                                        </tr>}

                                    </tbody>
                                </table>
                                <div className="hr-styles"></div>
                                <div className="d-flex justify-content-center ">
                                    {(((isRoot || isAdmin) && !isCurrentUserRoot) || userService.isLoggedInUser(this.props.timeLineUser.username)) && <ButtonWithClickEvent buttonClass={"btn App-button-primary btn-lg m-3"} url={`/home/users/edit/`} text={"Edit"} onClick={this.onSubmitHandlerEdit} />}
                                    {((isRoot) && !userService.isLoggedInUser(this.props.timeLineUser.username)) && <ButtonWithClickEvent buttonClass={"btn App-button-primary btn-lg m-3"} url={`/home/users/delete/`} text={"Delete"} onClick={this.onSubmitHandlerDelete} />}
                                    {(isAdmin || isRoot) && <Button buttonClass={"btn App-button-primary btn-lg m-3"} url={`/home/users/all/${this.props.loggedInUser.id}`} text={"All Users"} />}

                                </div >
                            </div >
                        </div >
                    </section>
                </article>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUserData,
        timeLineUser: state.timeLineUserData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTimeLineUser: (userId) => { dispatch(changeCurrentTimeLineUserAction(userId)) },
        changeAllFriends: (userId) => {dispatch(changeAllFriendsAction(userId))},
        changeAllPictures: (userId) => {dispatch(changeAllPicturesAction(userId))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);