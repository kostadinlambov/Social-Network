import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { userService, observer, requester } from '../../infrastructure'
import { toast } from 'react-toastify';
import { ToastComponent } from '../common'

export default class UserRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            role: '',
            username: ''
        }

        this.promote = this.promote.bind(this);
        this.demote = this.demote.bind(this);
    }

    componentDidMount(){
        this.setState({...this.props})
    }

    promote = (event) => {
        event.preventDefault();
        const id = this.state.id;
        requester.post('/users/promote?id=' + id, id, (response) => {
            console.log(response)
            debugger;
            if (response.success) {
                this.setState({role: 'ADMIN'})
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
                // observer.trigger(observer.events.notification, { type: 'success', message: response.message });
            } else {
                console.log('error message: ', response.message);
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
                // observer.trigger(observer.events.notification, { type: 'error', message: response.message });
            }
        })
    }

    demote = (event) => {
        event.preventDefault();
        const id = this.state.id;
        requester.post('/users/demote?id=' + id, id, (response) => {
            console.log(response)
            if (response.success) {
                this.setState({role: 'USER'})
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
                // observer.trigger(observer.events.notification, { type: 'success', message: response.message });
                debugger;
            } else {
                console.log('error message: ', response.message);
                debugger;
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
                // observer.trigger(observer.events.notification, { type: 'error', message: response.message });
            }

        })
    }

    render = () => {
        return (
            <tr className="row" >
                <td className="col-md-1" >
                    <h5>{this.state.index}</h5>
                </td>
                <td className="col-md-3" >
                    <h5>{this.state.username}</h5>
                </td>
                <td className="col-md-3" >
                    <h5>{this.state.role}</h5>
                </td>
                <td className="col-md-5 d-flex justify-content-center" >
                    {(!userService.checkIfIsRoot(this.state.role) && !userService.isLoggedInUser(this.state.username)) &&
                        <h5>
                            <button className="btn App-button-primary btn-lg m-1" onClick={this.promote} >Promote</button>
                        </h5>}
                    {(!userService.checkIfIsRoot(this.state.role) && !userService.isLoggedInUser(this.state.username)) &&
                        <h5>
                            <button className="btn App-button-primary btn-lg m-1" onClick={this.demote} >Demote</button>
                        </h5>}
                    <h5>
                        <NavLink className="btn App-button-primary btn-lg m-1" to={`/home/profile/${this.state.id}`} role="button">Profile</NavLink>
                    </h5>
                </td>
            </tr>
        )
    }
}

