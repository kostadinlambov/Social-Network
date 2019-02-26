import React, { Component } from 'react'
import { userService, requester, observer } from '../../infrastructure';
import {withRootAuthorization} from '../../hocs/withAuthorization'
import { Button, ButtonWithClickEvent } from '../common'
import { toast } from 'react-toastify';
import { ToastComponent } from '../common'


 export default class UserDeletePage extends Component {
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
        };

        this.onSubmitHandlerDelete = this.onSubmitHandlerDelete.bind(this);
    }

    componentDidMount = () => {
        // const userId = userService.getUserId;
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

        })
    }


    onSubmitHandlerDelete = (e) => {
        e.preventDefault();
        console.log(this.state.id);
        debugger;

        requester.delete('/users/delete/' + this.state.id, {}, (response) => {
            debugger;
            if (response.success === true) {

                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
                // observer.trigger(observer.events.notification, { type: 'success', message: response.message })
                this.props.history.push(`/`);

                this.setState({ fireRedirect: true })
            } else {
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
                // observer.trigger(observer.events.notification, { type: 'error', message: response.message });
            }
        })
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

                <h1 className="text-center font-weight-bold alert alert-danger position col-md-10 mx-auto">Are you sure you want to delete this User?</h1>
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
                        {(isAdmin || isRoot) && <ButtonWithClickEvent buttonClass={"btn App-button-primary btn-lg m-3"} url={`/home/users/delete/`} text={"Delete"} onClick={this.onSubmitHandlerDelete} />}
                        {(isAdmin || isRoot) && <Button buttonClass={"btn App-button-primary btn-lg m-3"} url={`/home/users/all`} text={"All Users"} />} 
                    </div >
                </div >

                <hr className="my-2 mb-3 mt-3 col-md-8 mx-auto" />
            </div >
            // </div >
        )
    }
}