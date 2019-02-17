import React, { Component } from 'react';
import UserRow from './UserRow';
import { requester, observer } from '../../infrastructure/'
import { toast } from 'react-toastify';
import { ToastComponent } from '../common'


export default class UserAllPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userArr: []
        };
    }

    componentDidMount() {
        debugger;
        requester.get('/users/all', (response) => {
            debugger;
            console.log('users all: ', response);

            if (response.success === true) {
                console.log('success message: ', response.message);
                debugger;
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
                // observer.trigger(observer.events.notification, { type: 'success', message: response.message });

                this.setState({
                    userArr: response['payload']
                },)
                console.log('all users state', this.state)
            } else {
                console.log('error message: ', response.message);
                debugger;
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
                // observer.trigger(observer.events.notification, { type: 'error', message: response.message });
            }
            debugger;
        });
    }

    render() {
        return (
            <div className="container col-md-8 text-center pt-5">
                <h1 className="mt-5 mb-5 text-center font-weight-bold display-5">All Users</h1>
                {/* <hr className="display-3 col-md-10" /> */}
                <table className="table table-hover mt-3 w-80 mx-auto text-center">
                    <thead>
                        <tr className="row">
                            <th className="col-md-1" scope="col">#</th>
                            <th className="col-md-3" scope="col">Username</th>
                            <th className="col-md-3" scope="col">Role</th>
                            <th className="col-md-5" scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.userArr.map((user, i) => <UserRow key={user.id} index={i + 1} {...user} {...this.props} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}