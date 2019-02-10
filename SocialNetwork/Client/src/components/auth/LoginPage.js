import React, { Component } from 'react';
import '../../styles/Register.css'
import requester from '../../infrastructure/requester'
import Input from '../common/Input'
import observer from '../../infrastructure/observer';
import userService from '../../infrastructure/userService';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common'
// import userService from 



export default class LoginPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(event) {
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

        requester.post('/login', { ...this.state }, (response) => {
            console.log('response: ', response)
            debugger;
            if (response.error) {
                debugger;
                // observer.trigger(observer.events.notification, { type: 'error', message: 'Incorrect credentials!' });
                toast.error(<ToastComponent.errorToast text={' Incorrect credentials!'} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {
                debugger;
                localStorage.setItem('token', response);
                observer.trigger(observer.events.loginUser, userService.getUsername());
                // observer.trigger(observer.events.notification, { type: 'success', message: 'You have successfully logged in!' });
                toast.success(<ToastComponent.successToast text={' You have successfully logged in!'} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
                debugger;
                this.props.history.push('/');
            }

        })
    }

    render() {
        return (

            <div className="container">
                <div>
                    <button onClick={this.notify}>Notify</button>;
                </div>

                <h1 className="mt-5 mb-5 text-center font-weight-bold ">Login</h1>
                <form className="Login-form-container" onSubmit={this.onSubmitHandler}>
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
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChangeHandler}
                            aria-describedby="passwordHelp"
                            placeholder="Enter password"
                        />
                        <small id="passwordHelp" className="form-text text-muted">We'll never share your password with anyone else.</small>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn App-button-primary btn-lg m-3">Login</button>
                    </div>

                </form>

                <p>{JSON.stringify(this.state, null, 2)}</p>

            </div>

        )
    }
};