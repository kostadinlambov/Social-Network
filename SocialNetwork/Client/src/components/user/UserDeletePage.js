import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom';
import { userService, requester } from '../../infrastructure';
import { Button, ButtonWithClickEvent } from '../common'
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import './css/UserDeletePage.css';

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
        const userId = this.props.match.params.id;

        requester.get(`/users/details/${userId}`, (userData) => {
            this.setState({
                ...userData
            })
        })
    }

    onSubmitHandlerDelete = (e) => {
        e.preventDefault();

        requester.delete('/users/delete/' + this.state.id, {}, (response) => {
            if (response.success === true) {
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
                this.props.history.push(`/`);
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

    render = () => {
        if (this.props.match.params.id !== this.props.id) {
            this.props.getUserToShowId(this.props.match.params.id);
        }

        let authority;
        if (this.state.authorities[0]) {
            authority = this.state.authorities[0]['authority'];
        }

        const isAdmin = userService.isAdmin();
        const isRoot = userService.isRoot();

        return (
            <Fragment>
                <article className="main-article-shared-content">
                    <section className="delete-content-section">
                        <div className="container mx-auto text-center mb-4" >
                            <h1 className="text-center font-weight-bold alert alert-danger position col-md-10 mt-4" style={{ 'margin': '1.5rem auto' }}>Are you sure you want to delete this User?</h1>
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
                                                <h5>{userService.formatUsername(this.state.username)}</h5>
                                            </td>
                                        </tr>
                                        <tr className="row">
                                            <td className="col-md-6" >
                                                <h5 className=" font-weight-bold">Email</h5>
                                            </td>
                                            <td className="col-md-6">
                                                <h5>{userService.formatUsername(this.state.email)}</h5>
                                            </td>
                                        </tr>
                                        <tr className="row">
                                            <td className="col-md-6" >
                                                <h5 className=" font-weight-bold">First Name</h5>
                                            </td>
                                            <td className="col-md-6" >
                                                <h5>{userService.formatUsername(this.props.firstName)}</h5>
                                            </td>
                                        </tr>
                                        <tr className="row">
                                            <td className="col-md-6" >
                                                <h5 className=" font-weight-bold">Last Name</h5>
                                            </td>
                                            <td className="col-md-6" >
                                                <h5>{userService.formatUsername(this.props.lastName)}</h5>
                                            </td>
                                        </tr>
                                        <tr className="row">
                                            <td className="col-md-6" >
                                                <h5 className=" font-weight-bold">Address</h5>
                                            </td>
                                            <td className="col-md-6">
                                                <h5>{userService.formatUsername(this.state.address)}</h5>
                                            </td>
                                        </tr>
                                        <tr className="row">
                                            <td className="col-md-6" >
                                                <h5 className=" font-weight-bold">City</h5>
                                            </td>
                                            <td className="col-md-6" >
                                                <h5>{userService.formatUsername(this.state.city)}</h5>
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
                                {/* <hr className="my-2 mb-3 mt-3 col-md-12 mx-auto" /> */}
                                <div className="hr-styles"></div>
                                <div className="d-flex justify-content-center ">
                                    {(isAdmin || isRoot) && <ButtonWithClickEvent buttonClass={"btn App-button-primary btn-lg m-3"} url={`/home/users/delete/`} text={"Delete"} onClick={this.onSubmitHandlerDelete} />}
                                    {(isAdmin || isRoot) && <NavLink className="btn App-button-primary btn-lg m-3" to={`/home/profile/${this.props.id}`} role="button">Cancel</NavLink>}
                                    {(isAdmin || isRoot) && <Button buttonClass={"btn App-button-primary btn-lg m-3"} url={`/home/users/all/${userService.getUserId()}`} text={"All Users"} />}
                                </div >
                            </div >

                        </div >

                    </section>
                </article>
            </Fragment>
        )
    }
}