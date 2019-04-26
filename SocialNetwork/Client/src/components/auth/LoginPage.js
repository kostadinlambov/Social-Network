import React, { Component } from 'react';
import '../../styles/FormPages.css';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import { connect } from 'react-redux';
import { loginAction, redirectAction } from '../../store/actions/authActions';

class LoginPage extends Component {
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

    componentDidUpdate(prevProps, prevState) {
        if (this.props.loginError.hasError && prevProps.loginError !== this.props.loginError) {
            toast.error(<ToastComponent.errorToast text={`${this.props.loginError.message}`} />, {
                position: toast.POSITION.TOP_RIGHT
            });
        } else if (this.props.loginSuccess) {
            this.props.redirect();

            toast.success(<ToastComponent.successToast text={' You have successfully logged in!'} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            this.props.history.push('/');
        }
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

        const { username, password } = this.state;
        this.props.login(username, password);
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
            <section className="pt-3">
                <div className="container login-form-content-section pb-4 " >
                    <h1 className="text-center font-weight-bold mt-4" style={{ 'margin': '1rem auto', 'paddingTop': '2rem' }}>Login</h1>
                    <div className="hr-styles" style={{ 'width': '70%' }}></div>

                    <form className="Login-form-container" onSubmit={this.onSubmitHandler}>
                        <div className="form-group">
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
                </div>
            </section>
        )
    }
};

function mapStateToProps(state, ownProps) {
    return {
        loginSuccess: state.login.success,
        loginError: state.loginError
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        login: (username, password) => dispatch(loginAction(username, password)),
        redirect: () => dispatch(redirectAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
