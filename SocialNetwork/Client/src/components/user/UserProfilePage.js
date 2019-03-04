import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom'
import { userService, requester } from '../../infrastructure';
import { Button, ButtonWithClickEvent } from '../common'
import { toast } from 'react-toastify';
import { ToastComponent } from '../../components/common';


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
            authorities: []
        }
    }

    componentDidMount = () => {
        const userId = this.props.match.params.id;
        console.log("current User id: ", userId);
        debugger;

        requester.get(`/users/details/${userId}`, (userData) => {

            console.log("userData: ", userData);


            this.setState({
                ...userData
            })
            debugger;
            console.log("this.state: ", this.state);
            debugger;

        }).catch(err => {
            console.error('deatils err:', err)
            toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
                // toast.error(<ToastComponent.errorToast text={`${error.name}: ${error.message}`} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            if(err.status === 403 && err.message === 'Your JWT token is expired. Please log in!'){
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
        let authority;
        if (this.state.authorities[0]) {
            authority = this.state.authorities[0]['authority'];
        }

        const isAdmin = userService.isAdmin();
        const isRoot = userService.isRoot();

        debugger;
        return (
            <div className="container mx-auto text-center " >

                <h1 className="text-center font-weight-bold ">Account Details</h1>
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
                        {/* <Button buttonClass={"btn App-button-primary btn-lg m-3"} url={`/users/edit/${this.state.id}`} text={"Edit"} /> */}
                        {/* {(isAdmin || isRoot) && <Button buttonClass={"btn App-button-primary btn-lg m-3"} url={`/users/delete/${this.state.id}`} text={"Delete"} />}
                        {(isAdmin || isRoot) && <Button buttonClass={"btn App-button-primary btn-lg m-3"} url={`/users/all`} text={"All Users"} />} */}

                        {<ButtonWithClickEvent buttonClass={"btn App-button-primary btn-lg m-3"} url={`/home/users/edit/`} text={"Edit"} onClick={this.onSubmitHandlerEdit} />}
                        {((isAdmin || isRoot) && !userService.isLoggedInUser(this.state.username)) && <ButtonWithClickEvent buttonClass={"btn App-button-primary btn-lg m-3"} url={`/home/users/delete/`} text={"Delete"} onClick={this.onSubmitHandlerDelete} />}
                        {(isAdmin || isRoot) && <Button buttonClass={"btn App-button-primary btn-lg m-3"} url={`/home/users/all`} text={"All Users"} />}

                    </div >
                </div >

                <hr className="my-2 mb-3 mt-3 col-md-8 mx-auto" />
            </div >
            // </div >

        )
    }

}