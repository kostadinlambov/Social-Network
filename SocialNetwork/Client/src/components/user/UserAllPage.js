import React, { Component, Fragment } from 'react';
import UserRow from './UserRow';
import { requester } from '../../infrastructure/'
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import './css/UserAllPage.css';

export default class UserAllPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userArr: [],
            id: '',
        };
    }

    componentDidMount() {
        const userId = this.props.match.params.id;

        requester.get('/users/all/' + userId, (response) => {
            if (response) {
                this.setState({
                    userArr: response,
                    id: userId
                })
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

    render() {
        if (this.props.match.params.id !== this.props.id) {
            this.props.getUserToShowId(this.props.match.params.id);
        }

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
                                    {this.state.userArr.map((user, i) => <UserRow key={user.id} index={i + 1} {...this.props} {...user} />)}
                                </tbody>
                            </table>

                        </div>
                    </section>
                </article>
            </Fragment>
        )
    }
}