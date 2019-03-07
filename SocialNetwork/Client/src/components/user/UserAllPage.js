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
        requester.get('/users/all', (response) => {
            console.log('users all: ', response);

            if (response.success === true) {
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                this.setState({
                    userArr: response['payload']
                },)
            } else {
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
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

    render() {
        return (
            <div className="container col-md-12 text-center">
                <h1 className="text-center font-weight-bold display-5" style={{'margin': '1rem auto'}}>All Users</h1>
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