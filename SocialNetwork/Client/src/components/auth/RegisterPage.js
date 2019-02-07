import React, { Component } from 'react';
import '../../styles/Register.css'
import requester from '../../infrastructure/requester'
import Input from '../common/Input'

export default class RegisterPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            firstNameError: '',
            lastName: '',
            address: '',
            city: '',
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
        const { firstNameError, ...otherProps } = this.state;

        requester.post('/users/register', { ...otherProps }, (response) => {

            console.log('response: ', response)
            debugger;
            this.props.history.push('/login');

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
                <h1 >Register</h1>
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
                                    placeholder="Enter city"
                                />
                                <small id="passwordHelp" className="form-text text-muted">We'll never share your password with anyone else.</small>
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

                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={this.state.confirmPassword}
                                    onChange={this.onChangeHandler}
                                    aria-describedby="confirmPasswordHelp"
                                    placeholder="Confirm your password"
                                />
                                <small id="confirmPasswordHelp" className="form-text text-muted">We'll never share your password with anyone else.</small>
                            </div>
                        </section>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn App-button-primary reg-btn">Register</button>
                    </div>

                </form>
                <p>{JSON.stringify(this.state, null, 2)}</p>
            </div>
        )
    }
};
