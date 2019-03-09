import React, { Component } from 'react';
import '../../styles/FormPages.css';
import requester from '../../infrastructure/requester';
import Input from '../common/Input';
import observer from '../../infrastructure/observer';
import userService from '../../infrastructure/userService';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common'

export default class LoginPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            touched: {
                username: false,
                password: false
            }
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

        if (!this.canBeSubmitted()) {
            return;
        }

        const { touched, ...otherProps } = this.state;

        requester.post('/login', { ...otherProps }, (response) => {
            console.log('response: ', response)

            if (response.error) {
                // observer.trigger(observer.events.notification, { type: 'error', message: 'Incorrect credentials!' });
                toast.error(<ToastComponent.errorToast text={' Incorrect credentials!'} />, {
                    position: toast.POSITION.TOP_RIGHT,
                });


            } else {
                const token = response.split(' ')[1];
                localStorage.setItem('token', token);

                observer.trigger(observer.events.loginUser, token);
                // observer.trigger(observer.events.notification, { type: 'success', message: 'You have successfully logged in!' });
                toast.success(<ToastComponent.successToast text={' You have successfully logged in!'} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
                
                this.props.history.push('/');
            }

        }).catch(err => {
            console.log('Login Error (POST): ', err)

            // toast.error(<ToastComponent.errorToast text={`${err.message}`} />, {
            localStorage.clear();

            // if (err.status === 403 && err.response.url === 'http://localhost:8000/login') {
            //     // this.props.history.push('/login');
            //     toast.error(<ToastComponent.errorToast text={'Incorrect credentials!'} />, {
            //         position: toast.POSITION.TOP_RIGHT
            //     });

            // } else {
                
                toast.error(<ToastComponent.errorToast text={`${err.message}`} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            // }

        })
    }

    canBeSubmitted() {
        const { username, password } = this.state;

        const errors = this.validate(username, password);
        const isDisabled = Object.keys(errors).some(x => errors[x])
        return !isDisabled;
    }

    handleBlur = (field) => (event) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });

    }

    validate = (username, password) => {
        return {
            username: username.length === 0,
            password: password.length === 0
        }
    }

    render() {
        const { username, password } = this.state;

        const errors = this.validate(username, password);
        const isEnabled = !Object.keys(errors).some(x => errors[x])

        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];

            return hasError ? shouldShow : false;
        }

        return (
            <div className="container pt-5">

                <h1 className="mt-5 mb-5 text-center font-weight-bold ">Login</h1>
                <form className="Login-form-container" onSubmit={this.onSubmitHandler}>
                    <div className="form-group">
                        {/* <label htmlFor="username" className={(shouldMarkError('username') ? "error-text-label" : "")}>Username</label> */}
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className={"form-control " + (shouldMarkError('username') ? "error" : "")}
                            id="username"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChangeHandler}
                            onBlur={this.handleBlur('username')}
                            aria-describedby="usernameHelp"
                            placeholder="Enter username"
                        />
                        {shouldMarkError('username') && <small id="usernameHelp" className="form-text alert alert-danger">Username is required!</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" >Password</label>
                        <input
                            type="password"
                            className={"form-control " + (shouldMarkError('password') ? "error" : "")}
                            id="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChangeHandler}
                            onBlur={this.handleBlur('password')}
                            aria-describedby="passwordHelp"
                            placeholder="Enter password"
                        />
                        {shouldMarkError('password') && <small id="passwordHelp" className="form-text alert alert-danger">Password is required!</small>}
                    </div>

                    <div className="text-center">
                        <button disabled={!isEnabled} type="submit" className="btn App-button-primary btn-lg m-3">Login</button>
                    </div>

                </form>

                <p>{JSON.stringify(this.state, null, 2)}</p>

            </div>
        )
    }
};