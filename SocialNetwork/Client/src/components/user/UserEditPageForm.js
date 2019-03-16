import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { userService, requester } from '../../infrastructure';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common'
import '../../styles/FormPages.css'

export default class UserEditPageForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.id,
            username: this.props.username,
            email: this.props.email,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            address: this.props.address,
            city: this.props.city,
            profilePicUrl: this.props.profilePicUrl,
            backgroundImageUrl: this.props.backgroundImageUrl,
            touched: {
                username: false,
                email: false,
                firstName: false,
                lastName: false,
                address: false,
                city: false,
                profilePicUrl: false,
                backgroundImageUrl: false,
            }
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmitHandler(event) {
        event.preventDefault();

        if (!this.canBeSubmitted()) {
            return;
        }

        const { touched, ...otherProps } = this.state;
        const loggedInUserId = userService.getUserId();

        requester.put('/users/update/'+ loggedInUserId, { ...otherProps }, (response) => {

            if (response.success === true) {
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                this.props.getUserToShowId(this.state.id);
                this.props.history.push(`/home/profile/${this.state.id}`);

            } else {
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                this.setState({
                    id: this.props.id,
                    username: this.props.username,
                    email: this.props.email,
                    firstName: this.props.firstName,
                    lastName: this.props.lastName,
                    address: this.props.address,
                    city: this.props.city,
                    profilePicUrl: this.props.profilePicUrl,
                    backgroundImageUrl: this.props.backgroundImageUrl
                })

            }
        })
    }

    canBeSubmitted() {
        const { username, email, firstName, lastName, address, city, profilePicUrl, backgroundImageUrl } = this.state;
        const errors = this.validate(username, email, firstName, lastName, address, city, profilePicUrl, backgroundImageUrl);
        const isDisabled = Object.keys(errors).some(x => errors[x])
        return !isDisabled;
    }

    handleBlur = (field) => (event) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate = (username, email, firstName, lastName, address, city, profilePicUrl, backgroundImageUrl) => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        const firstLastNameRegex = /^[A-Z]([a-zA-Z]+)?$/;
        let testEmail = emailRegex.test(email)
        let testFirstName = firstLastNameRegex.test(firstName)
        let testLastName = firstLastNameRegex.test(lastName)
        console.log('testEmail : ', testEmail)

        return {
            username: username.length < 4 || username.length > 16,
            email: email.length === 0 || !testEmail,
            firstName: firstName.length === 0 || !testFirstName,
            lastName: lastName.length === 0 || !testLastName,
            address: address.length === 0,
            city: city.length === 0,
            profilePicUrl: profilePicUrl.length === 0,
            backgroundImageUrl: backgroundImageUrl.length === 0,

        }
    }

    render() {
        const { username, email, firstName, lastName, address, city, profilePicUrl, backgroundImageUrl } = this.state;

        const loggedInUserName = userService.getUsername();
        const loggedInRole = userService.getRole();
        const isAdmin = userService.isAdmin();
        const isRoot = userService.isRoot();

        let showPicsButtons = true;
        if (loggedInUserName !== username && (loggedInRole !== "ROOT")) {
            showPicsButtons = false;
        }
        const errors = this.validate(username, email, firstName, lastName, address, city, profilePicUrl, backgroundImageUrl);
        const isEnabled = !Object.keys(errors).some(x => errors[x])

        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];

            return hasError ? shouldShow : false;
        }
        return (
            <div className="container ">
                <h1 className="text-center font-weight-bold " style={{ 'margin': '1rem auto' }}>Edit Account</h1>
                <hr className="my-2 mb-3 mt-3 col-md-12 mx-auto"></hr>
                <form className="Register-form-container  " onSubmit={this.onSubmitHandler} >

                    <div className="section-container w-100 mx-auto text-center">
                        <section className="left-section">
                            <div className="form-group">
                                <label htmlFor="username" className="font-weight-bold" >Username</label>
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
                                {shouldMarkError('username') && <small id="usernameHelp" className="form-text alert alert-danger"> {(!this.state.username ? 'Username is required!' : 'Username should be at least 4 and maximum 16 characters long!')}</small>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="firstName" className="font-weight-bold" >First Name</label>
                                <input
                                    type="text"
                                    className={"form-control " + (shouldMarkError('firstName') ? "error" : "")}
                                    id="firstName"
                                    name="firstName"
                                    value={this.state.firstName}
                                    onChange={this.onChangeHandler}
                                    onBlur={this.handleBlur('firstName')}
                                    aria-describedby="firstNameHelp"
                                    placeholder="Enter first name"
                                />
                                {shouldMarkError('firstName') && <small id="firstNameHelp" className="form-text alert alert-danger">{(!this.state.firstName ? 'First Name is required!' : 'First Name must start with a capital letter and contain only letters!')}</small>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="address" className="font-weight-bold" >Address</label>
                                <input
                                    type="text"
                                    className={"form-control " + (shouldMarkError('address') ? "error" : "")}
                                    id="address"
                                    name="address"
                                    value={this.state.address}
                                    onChange={this.onChangeHandler}
                                    onBlur={this.handleBlur('address')}
                                    aria-describedby="addressHelp"
                                    placeholder="Enter address"
                                />
                                {shouldMarkError('address') && <small id="addressHelp" className="form-text alert alert-danger">{(!this.state.address ? 'Address is required!' : '')}</small>}
                            </div>

                            {showPicsButtons && <div className="form-group">
                                <label htmlFor="profilePicUrl" className="font-weight-bold" >Profile image url</label>
                                <input
                                    type="text"
                                    className={"form-control " + (shouldMarkError('profilePicUrl') ? "error" : "")}
                                    id="profilePicUrl"
                                    name="profilePicUrl"
                                    value={this.state.profilePicUrl}
                                    onChange={this.onChangeHandler}
                                    onBlur={this.handleBlur('profilePicUrl')}
                                    aria-describedby="profilePicUrlHelp"
                                    placeholder="Enter profile image url"
                                />
                                {shouldMarkError('profilePicUrl') && <small id="profilePicUrl" className="form-text alert alert-danger">{(!this.state.profilePicUrl ? 'Profile Image Url is required!' : '')}</small>}
                            </div>}

                        </section>

                        <section className="right-section">
                            <div className="form-group">
                                <label htmlFor="email" className="font-weight-bold">Email Address</label>
                                <input
                                    type="email"
                                    className={"form-control " + (shouldMarkError('email') ? "error" : "")}
                                    id="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChangeHandler}
                                    onBlur={this.handleBlur('email')}
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"

                                />
                                {shouldMarkError('email') && <small id="emailHelp" className="form-text alert alert-danger">{(!this.state.email ? 'Email is required!' : 'Invalid e-mail address!')}</small>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName" className="font-weight-bold">Last Name</label>
                                <input
                                    type="text"
                                    className={"form-control " + (shouldMarkError('lastName') ? "error" : "")}
                                    id="lastName"
                                    name="lastName"
                                    value={this.state.lastName}
                                    onChange={this.onChangeHandler}
                                    onBlur={this.handleBlur('lastName')}
                                    aria-describedby="lastNameHelp"
                                    placeholder="Enter last name"
                                />
                                {shouldMarkError('lastName') && <small id="lastNameHelp" className="form-text alert alert-danger">{(!this.state.lastName ? 'Last Name is required!' : 'Last Name must start with a capital letter and contain only letters!')}</small>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="city" className="font-weight-bold">City</label>
                                <input
                                    type="text"
                                    className={"form-control " + (shouldMarkError('city') ? "error" : "")}
                                    id="city"
                                    name="city"
                                    value={this.state.city}
                                    onChange={this.onChangeHandler}
                                    onBlur={this.handleBlur('city')}
                                    aria-describedby="cityHelp"
                                    placeholder="Enter city"
                                />
                                {shouldMarkError('city') && <small id="cityHelp" className="form-text alert alert-danger">{(!this.state.city ? 'City is required!' : '')}</small>}
                            </div>

                            {showPicsButtons && <div className="form-group">
                                <label htmlFor="backgroundImageUrl" className="font-weight-bold" >Cover image url</label>
                                <input
                                    type="text"
                                    className={"form-control " + (shouldMarkError('backgroundImageUrl') ? "error" : "")}
                                    id="backgroundImageUrl"
                                    name="backgroundImageUrl"
                                    value={this.state.backgroundImageUrl}
                                    onChange={this.onChangeHandler}
                                    onBlur={this.handleBlur('backgroundImageUrl')}
                                    aria-describedby="backgroundImageUrlHelp"
                                    placeholder="Enter cover image url"
                                />
                                {shouldMarkError('backgroundImageUrl') && <small id="backgroundImageUrlHelp" className="form-text alert alert-danger">{(!this.state.backgroundImageUrl ? 'Cover Image Url is required!' : '')}</small>}
                            </div>}


                        </section>
                    </div>
                    <hr className="my-2 mb-3 mt-3 col-md-12 mx-auto"></hr>
                    <div className="text-center">
                        <button disabled={!isEnabled} type="submit" className="btn App-button-primary btn-lg m-3">Edit</button>
                        <NavLink className="btn App-button-primary btn-lg m-3" to={`/home/profile/${this.props.id}`} role="button">Cancel</NavLink>
                        {(isAdmin || isRoot) && <NavLink className="btn App-button-primary btn-lg m-3" to={`/home/users/all/${userService.getUserId()}`} role="button">All Users</NavLink>}
                    </div>
                </form>
            </div>
        )
    }
}

