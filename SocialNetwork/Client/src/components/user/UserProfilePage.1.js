import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom'
import { userService, requester } from '../../infrastructure';
import { Button, ButtonWithClickEvent } from '../common'
import { toast } from 'react-toastify';
import { ToastComponent } from '../../components/common';

import placeholder_user_image from '../../assets/images/placeholder-profile-male.jpg'
import default_background_image from '../../assets/images/default-background-image.jpg'


export default class UserProfilePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            profilePicUrl: '',
            backgroundImageUrl: '',
            authorities: [],
            ready: false
        }

    }

    componentDidMount = () => {
        const userId = this.props.match.params.id;
        console.log("current User id: ", userId);

        this.props.getUserToShowId(userId);

        requester.get(`/users/details/${userId}`, (userData) => {

            console.log("userData: ", userData);

            this.setState({
                ...userData,
                ready: true,
                profilePicUrl: userData.profilePicUrl || placeholder_user_image,
                backgroundImageUrl: userData.backgroundImageUrl || default_background_image,
            })
            
            console.log("this.state: ", this.state);

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

    onSubmitHandlerDelete = (e) => {
        console.log(this.state.id)

        this.props.history.push({
            pathname: "/home/users/delete/" + this.state.id,
            state:
                { ...this.state }
        });
        
    }


    onSubmitHandlerEdit = (e) => {
        // e.preventDefault();
        console.log(this.state.id)

        this.props.history.push({
            pathname: "/home/users/edit/" + this.state.id,
            state:
                { ...this.state }
        });
    }

    render = () => {
        // if (!this.state.ready) {
        //     return <h1 className="text-center pt-5 mt-5">Loading...</h1>
            
        // }

        const loggedInUserName = userService.getUsername();
        const loggedInRole = userService.getRole();

        let showPicsButtons = true;
        if (loggedInUserName !== this.state.username && (loggedInRole !== "ROOT")) {
            showPicsButtons = false;
            // this.props.history.push('/');
        }

        let authority;
        if (this.state.authorities[0]) {
            authority = this.state.authorities[0]['authority'];
        }

        const isAdmin = userService.isAdmin();
        const isRoot = userService.isRoot();
        const isCurrentUserRoot = authority === 'ROOT';

        return (
            <div className="container mx-auto text-center " >

                <h1 className="text-center font-weight-bold" style={{ 'margin': '1rem auto' }}>Account Details</h1>
                <hr className="my-2 mb-3 mt-3 col-md-8 mx-auto" />
                {/* <div className="d-flex justify-content-center  "> */}
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
                                <td className="col-md-6" >
                                    <h5>{this.state.username}</h5>
                                </td>
                            </tr>
                            <tr className="row">
                                <td className="col-md-6" >
                                    <h5 className=" font-weight-bold">Email</h5>
                                </td>
                                <td className="col-md-6">
                                    <h5>{this.state.email}</h5>
                                </td>
                            </tr>
                            <tr className="row">
                                <td className="col-md-6" >
                                    <h5 className=" font-weight-bold">First Name</h5>
                                </td>
                                <td className="col-md-6" >
                                    <h5>{this.state.firstName}</h5>
                                </td>
                            </tr>
                            <tr className="row">
                                <td className="col-md-6" >
                                    <h5 className=" font-weight-bold">Last Name</h5>
                                </td>
                                <td className="col-md-6" >
                                    <h5>{this.state.lastName}</h5>
                                </td>
                            </tr>
                            <tr className="row">
                                <td className="col-md-6" >
                                    <h5 className=" font-weight-bold">Address</h5>
                                </td>
                                <td className="col-md-6">
                                    <h5>{this.state.address}</h5>
                                </td>
                            </tr>
                            <tr className="row">
                                <td className="col-md-6" >
                                    <h5 className=" font-weight-bold">City</h5>
                                </td>
                                <td className="col-md-6" >
                                    <h5>{this.state.city}</h5>
                                </td>
                            </tr>
                            {(isAdmin || isRoot) && <tr className="row">
                                <td className="col-md-6" >
                                    <h5 className=" font-weight-bold">Role</h5>
                                </td>
                                <td className="col-md-6" >
                                    <h5>{authority}</h5>
                                </td>
                            </tr>}

                        </tbody>
                    </table>
                    <hr className="my-2 mb-3 mt-3 col-md-12 mx-auto" />
                    <div className="d-flex justify-content-center ">
                        {(((isRoot ||isAdmin) && !isCurrentUserRoot) || userService.isLoggedInUser(this.state.username)) && <ButtonWithClickEvent buttonClass={"btn App-button-primary btn-lg m-3"} url={`/home/users/edit/`} text={"Edit"} onClick={this.onSubmitHandlerEdit} />}
                        {((isRoot) && !userService.isLoggedInUser(this.state.username)) && <ButtonWithClickEvent buttonClass={"btn App-button-primary btn-lg m-3"} url={`/home/users/delete/`} text={"Delete"} onClick={this.onSubmitHandlerDelete} />}
                        {(isAdmin || isRoot) && <Button buttonClass={"btn App-button-primary btn-lg m-3"} url={`/home/users/all`} text={"All Users"} />}

                    </div >
                </div >

                <hr className="my-2 mb-3 mt-3 col-md-8 mx-auto" />
            </div >
            // </div >

        )
    }

}