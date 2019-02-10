import React, { Component } from 'react';
import { userService, requester } from '../../infrastructure';
import { Button } from '../common';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common'


export default class UserEditPage extends Component {
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
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        debugger;
        this.setState({
            id: this.props.location.state.id,
            username: this.props.location.state.username,
            email: this.props.location.state.email,
            firstName: this.props.location.state.firstName,
            lastName: this.props.location.state.lastName,
            address: this.props.location.state.address,
            city: this.props.location.state.city,
        })

    }

    onChangeHandler(event) {
        debugger;
        console.log('name: ', event.target.name)
        console.log('value: ', event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmitHandler(event) {
        event.preventDefault();
        console.log('event: ', event);
        debugger;

        requester.put('/users/update', { ...this.state }, (response) => {
            console.log('response: ', response)
            debugger;
            toast.success(<ToastComponent.successToast text={response.message} />, {
                position: toast.POSITION.TOP_RIGHT
            });
            this.props.history.push(`/profile/${this.state.id}`);
        })
    }

    render() {

        const { match, location, history } = this.props
        console.log('match: ', match);
        console.log('location: ', location);
        console.log('history: ', history);
        debugger;
        return (
            <div className="container">
                <h1 className="mt-5 mb-5 text-center font-weight-bold ">Edit Account</h1>
                <form className="Register-form-container" onSubmit={this.onSubmitHandler}>

                    <div className="section-container">
                        <section className="left-section">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChangeHandler}
                                    aria-describedby="usernameHelp"
                                    placeholder="Enter username"
                                />
                                <small id="usernameHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name="firstName"
                                    value={this.state.firstName}
                                    onChange={this.onChangeHandler}
                                    aria-describedby="firstNameHelp"
                                    placeholder="Enter first name"
                                />
                                <small id="firstNameHelp" className="form-text text-muted">We'll never share your first name with anyone else.</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    name="address"
                                    value={this.state.address}
                                    onChange={this.onChangeHandler}
                                    aria-describedby="addressHelp"
                                    placeholder="Enter address"
                                />
                                <small id="addressHelp" className="form-text text-muted">We'll never share your last name with anyone else.</small>
                            </div>
                        </section>

                        <section className="right-section">
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChangeHandler}
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="firstName">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    value={this.state.lastName}
                                    onChange={this.onChangeHandler}
                                    aria-describedby="lastNameHelp"
                                    placeholder="Enter last name"
                                />
                                <small id="lastNameHelp" className="form-text text-muted">We'll never share your last name with anyone else.</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    name="city"
                                    value={this.state.city}
                                    onChange={this.onChangeHandler}
                                    aria-describedby="cityHelp"
                                    placeholder="Enter city"
                                />
                                <small id="cityHelp" className="form-text text-muted">We'll never share your city with anyone else.</small>
                            </div>
                        </section>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn App-button-primary btn-lg m-3">Edit</button>
                        {/* <Button  buttonClass={"btn App-button-primary btn-lg m-3"} url={`/users/all`} text={"Edit"} /> */}
                        <Button buttonClass={"btn App-button-primary btn-lg m-3"} url={`/`} text={"Cancel"} />
                    </div>

                </form>
                <p>{JSON.stringify(this.state, null, 2)}</p>
            </div>
        )
    }
}

