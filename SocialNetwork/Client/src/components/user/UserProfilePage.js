import React, { Component } from 'react';
import { userService } from '../../infrastructure';
import { Button, ButtonWithClickEvent } from '../common'

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

        this.setState({id: userId});
        this.props.getUserToShowId(userId);
    }


    onSubmitHandlerDelete = (e) => {
        console.log(this.props.id)

        this.props.history.push({
            pathname: "/home/users/delete/" + this.props.id,
        });
    }


    onSubmitHandlerEdit = (e) => {
        // e.preventDefault();
        console.log(this.state.id)
        this.setState({...this.props})
        console.log('this.state: ', this.state)
        console.log('this.props: ', this.props)
        debugger;

        const id = this.state.id;
        
        this.props.history.push({
            pathname: "/home/users/edit/" + this.state.id,
            state:
                { ...this.state }
        });
    }


    componetnDidUpdate(prevProps, prevState){
        const newId = this.props.match.params.id;
        const lastId = prevProps.id;
        console.log('prevProps: ', prevProps)
        console.log('newId: ', newId)
        console.log('lastId: ', lastId)
        if(newId !== lastId){
            this.props.getUserToShowId(newId);
        }
    }

    render = () => {
        // if (!this.state.ready) {
        //     return <h1 className="text-center pt-5 mt-5">Loading...</h1>
            
        // }

        if(this.props.match.params.id !== this.props.id){
            this.props.getUserToShowId(this.props.match.params.id);
        }

        const loggedInUserName = userService.getUsername();
        const loggedInRole = userService.getRole();

        let showPicsButtons = true;
        if (loggedInUserName !== this.state.username && (loggedInRole !== "ROOT")) {
            showPicsButtons = false;
        }

        let authority;
        if (this.props.authorities[0]) {
            authority = this.props.authorities[0]['authority'];
        }

        const isAdmin = userService.isAdmin();
        const isRoot = userService.isRoot();
        const isCurrentUserRoot = authority === 'ROOT';

        return (
            <div className="container mx-auto text-center " >

                <h1 className="text-center font-weight-bold" style={{ 'margin': '1rem auto' }}>Account Details</h1>
                <hr className="my-2 mb-3 mt-3 col-md-8 mx-auto" />
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
                                    <h5>{this.props.username}</h5>
                                </td>
                            </tr>
                            <tr className="row">
                                <td className="col-md-6" >
                                    <h5 className=" font-weight-bold">Email</h5>
                                </td>
                                <td className="col-md-6">
                                    <h5>{this.props.email}</h5>
                                </td>
                            </tr>
                            <tr className="row">
                                <td className="col-md-6" >
                                    <h5 className=" font-weight-bold">First Name</h5>
                                </td>
                                <td className="col-md-6" >
                                    <h5>{this.props.firstName}</h5>
                                </td>
                            </tr>
                            <tr className="row">
                                <td className="col-md-6" >
                                    <h5 className=" font-weight-bold">Last Name</h5>
                                </td>
                                <td className="col-md-6" >
                                    <h5>{this.props.lastName}</h5>
                                </td>
                            </tr>
                            <tr className="row">
                                <td className="col-md-6" >
                                    <h5 className=" font-weight-bold">Address</h5>
                                </td>
                                <td className="col-md-6">
                                    <h5>{this.props.address}</h5>
                                </td>
                            </tr>
                            <tr className="row">
                                <td className="col-md-6" >
                                    <h5 className=" font-weight-bold">City</h5>
                                </td>
                                <td className="col-md-6" >
                                    <h5>{this.props.city}</h5>
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
                        {(((isRoot ||isAdmin) && !isCurrentUserRoot) || userService.isLoggedInUser(this.props.username)) && <ButtonWithClickEvent buttonClass={"btn App-button-primary btn-lg m-3"} url={`/home/users/edit/`} text={"Edit"} onClick={this.onSubmitHandlerEdit} />}
                        {((isRoot) && !userService.isLoggedInUser(this.props.username)) && <ButtonWithClickEvent buttonClass={"btn App-button-primary btn-lg m-3"} url={`/home/users/delete/`} text={"Delete"} onClick={this.onSubmitHandlerDelete} />}
                        {(isAdmin || isRoot) && <Button buttonClass={"btn App-button-primary btn-lg m-3"} url={`/home/users/all/${userService.getUserId()}`} text={"All Users"} />}

                    </div >
                </div >

                <hr className="my-2 mb-3 mt-3 col-md-8 mx-auto" />
            </div >
            // </div >

        )
    }

}