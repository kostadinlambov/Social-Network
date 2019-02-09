import React, { Component } from 'react';
import '../../styles/Register.css'
import requester from '../../infrastructure/requester'
import Input from '../common/Input'
import observer from '../../infrastructure/observer';
import userService from '../../infrastructure/userService';
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
        // const { firstNameError, ...otherProps } = this.state;

        requester.post('/login', { ...this.state }, (response) => {
            console.log('response: ', response)
            localStorage.setItem('token', response);

            observer.trigger(observer.events.loginUser, userService.getUsername());
            debugger;
            this.props.history.push('/');

            // if(response.success == true){
            //     observer.trigger(observer.events.notification,  { type: 'success', message: response.message });

            // this.setState({ fireRedirect: true })
            // }else {
            //     observer.trigger(observer.events.notification, { type: 'error', message: response.message });
            //     this.setState({
            //         username:'',
            //         email:'',
            //         password:'',
            //         confirmPassword:'',
            //         firstName:'',
            //         lastName:'',
            //         adress:'',
            //         city:''
            //     })
            // }

        })
    }


    render() {
        return (
            <div className="container">
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


{/* <div className="form-group">
                        <Input
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.onChangeHandler}
                            label="Email address"
                        />
                    </div> */}