import React, { Component, Fragment } from 'react';
import '../../styles/FormPages.css';
import '../../custom-css/otp-verification.css';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import placeholder_user_image from '../../assets/images/placeholder.png';
import default_background_image from '../../assets/images/default-background-image.jpg';
import { connect } from 'react-redux';
import { verifyOtpAction, redirectAction, completeRegistrationAction } from '../../store/actions/authActions';

class OtpVerificationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            otp: '',
            email: '',
            loading: false,
            timeLeft: 600, // 10 minutes in seconds
            otpSent: true,
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.handleResendOtp = this.handleResendOtp.bind(this);
    }

    componentDidMount() {
        // Get email from props or localStorage
        const email = (this.props.location && this.props.location.state && this.props.location.state.email) || localStorage.getItem('registrationEmail');
        const registrationData = JSON.parse(localStorage.getItem('registrationData') || '{}');

        if (!email) {
            this.props.history.push('/register');
            return;
        }

        this.setState({ email });

        // Start countdown timer
        this.timerInterval = setInterval(() => {
            this.setState(prevState => {
                if (prevState.timeLeft <= 0) {
                    clearInterval(this.timerInterval);
                    return { timeLeft: 0 };
                }
                return { timeLeft: prevState.timeLeft - 1 };
            });
        }, 1000);
    }

    componentWillUnmount() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // Handle OTP verification success
        if (this.props.otpVerified && prevProps.otpVerified !== this.props.otpVerified) {
            toast.success(
                <ToastComponent.successToast text="Email verified successfully!" />,
                { position: toast.POSITION.TOP_RIGHT }
            );

            // Get stored registration data
            const registrationData = JSON.parse(localStorage.getItem('registrationData') || '{}');

            // Complete registration with stored data
            setTimeout(() => {
                this.props.completeRegistration({
                    ...registrationData,
                    email: this.state.email
                });
            }, 1000);
        }

        // Handle OTP verification error
        if (this.props.otpError && this.props.otpError.hasError && prevProps.otpError !== this.props.otpError) {
            toast.error(
                <ToastComponent.errorToast text={this.props.otpError.message} />,
                { position: toast.POSITION.TOP_RIGHT }
            );
        }

        // Handle registration completion success
        if (this.props.registrationComplete && prevProps.registrationComplete !== this.props.registrationComplete) {
            toast.success(
                <ToastComponent.successToast text="Registration successful! Redirecting to login..." />,
                { position: toast.POSITION.TOP_RIGHT }
            );

            // Clear stored data
            localStorage.removeItem('registrationEmail');
            localStorage.removeItem('registrationData');

            setTimeout(() => {
                this.props.history.push('/login');
            }, 2000);
        }

        // Handle registration error
        if (this.props.registerError && this.props.registerError.hasError && prevProps.registerError !== this.props.registerError) {
            toast.error(
                <ToastComponent.errorToast text={this.props.registerError.message} />,
                { position: toast.POSITION.TOP_RIGHT }
            );
        }
    }

    onChangeHandler(event) {
        const value = event.target.value.replace(/\D/g, '').slice(0, 6); // Only numbers, max 6 digits
        this.setState({ otp: value });
    }

    onSubmitHandler(event) {
        event.preventDefault();

        if (!this.state.otp || this.state.otp.length !== 6) {
            toast.error(
                <ToastComponent.errorToast text="Please enter a valid 6-digit OTP" />,
                { position: toast.POSITION.TOP_RIGHT }
            );
            return;
        }

        this.setState({ loading: true });
        this.props.verifyOtp(this.state.email, this.state.otp);
    }

    handleResendOtp() {
        this.setState({ loading: true });

        // Call resend OTP endpoint
        const requester = require('../../infrastructure').requester;
        requester.post('/otp/send', { email: this.state.email }, (response) => {
            if (response.success) {
                toast.success(
                    <ToastComponent.successToast text="OTP sent successfully! Check your email." />,
                    { position: toast.POSITION.TOP_RIGHT }
                );
                this.setState({
                    otp: '',
                    loading: false,
                    timeLeft: 600 // Reset 10 minutes timer
                });

                // Restart timer
                if (this.timerInterval) {
                    clearInterval(this.timerInterval);
                }
                this.timerInterval = setInterval(() => {
                    this.setState(prevState => {
                        if (prevState.timeLeft <= 0) {
                            clearInterval(this.timerInterval);
                            return { timeLeft: 0 };
                        }
                        return { timeLeft: prevState.timeLeft - 1 };
                    });
                }, 1000);
            } else {
                toast.error(
                    <ToastComponent.errorToast text={response.message || 'Failed to resend OTP'} />,
                    { position: toast.POSITION.TOP_RIGHT }
                );
                this.setState({ loading: false });
            }
        }).catch(err => {
            toast.error(
                <ToastComponent.errorToast text={err.message} />,
                { position: toast.POSITION.TOP_RIGHT }
            );
            this.setState({ loading: false });
        });
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    render() {
        const { otp, email, loading, timeLeft } = this.state;
        const isOtpValid = otp && otp.length === 6;
        const isExpired = timeLeft === 0;

        return (
            <Fragment>
                <section className="pt-3">
                    <div className="container register-form-content-section pb-4">
                        <h1 className="text-center font-weight-bold mt-4" style={{ margin: '1rem auto', paddingTop: '2rem' }}>
                            Email Verification
                        </h1>
                        <div className="hr-styles" style={{ width: '70%' }}></div>

                        <div className="otp-verification-container" style={{
                            maxWidth: '500px',
                            margin: '3rem auto',
                            padding: '2rem',
                            borderRadius: '10px',
                            backgroundColor: '#f8f9fa',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                        }}>
                            <div className="text-center mb-4">
                                <p style={{ fontSize: '16px', color: '#666', marginBottom: '1rem' }}>
                                    We've sent a 6-digit OTP to:
                                </p>
                                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                                    {email}
                                </p>
                                <small style={{ color: '#999' }}>
                                    Check your email inbox or spam folder
                                </small>
                            </div>

                            <form onSubmit={this.onSubmitHandler}>
                                <div className="form-group">
                                    <label htmlFor="otp" style={{ fontSize: '16px', fontWeight: '500' }}>
                                        Enter OTP Code
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="otp"
                                        name="otp"
                                        value={otp}
                                        onChange={this.onChangeHandler}
                                        placeholder="000000"
                                        maxLength="6"
                                        style={{
                                            fontSize: '24px',
                                            letterSpacing: '10px',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            padding: '15px',
                                            borderRadius: '8px',
                                            border: '2px solid #ddd'
                                        }}
                                        disabled={loading || isExpired}
                                    />
                                </div>

                                {/* Timer Display */}
                                <div className="text-center mb-3">
                                    <div style={{
                                        fontSize: '14px',
                                        color: isExpired ? '#dc3545' : '#666',
                                        fontWeight: '500'
                                    }}>
                                        {isExpired ? (
                                            <span>⏰ OTP Expired</span>
                                        ) : (
                                            <span>⏱️ Expires in: {this.formatTime(timeLeft)}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Error Message for Expired OTP */}
                                {isExpired && (
                                    <div className="alert alert-warning text-center mb-3">
                                        Your OTP has expired. Please request a new one.
                                    </div>
                                )}

                                {/* Verify Button */}
                                <div className="text-center mb-3">
                                    <button
                                        type="submit"
                                        className="btn App-button-primary btn-lg"
                                        disabled={!isOtpValid || loading || isExpired}
                                        style={{ width: '100%', opacity: !isOtpValid || loading || isExpired ? 0.6 : 1 }}
                                    >
                                        {loading ? 'Verifying...' : 'Verify OTP'}
                                    </button>
                                </div>

                                {/* Resend OTP Button */}
                                <div className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-link"
                                        onClick={this.handleResendOtp}
                                        disabled={loading}
                                        style={{ color: '#007bff', textDecoration: 'none' }}
                                    >
                                        Didn't receive the OTP? <span style={{ fontWeight: 'bold' }}>Resend</span>
                                    </button>
                                </div>
                            </form>

                            {/* Help Text */}
                            <div className="mt-4 pt-3" style={{ borderTop: '1px solid #ddd' }}>
                                <small style={{ color: '#666', lineHeight: '1.8' }}>
                                    <strong>💡 Tips:</strong><br />
                                    • OTP is valid for 10 minutes<br />
                                    • Check your spam folder if you don't see the email<br />
                                    • Each OTP can only be used once<br />
                                    • Only PESU emails are allowed
                                </small>
                            </div>
                        </div>

                        {/* Back to Register Link */}
                        <div className="text-center mt-4">
                            <a href="/register" style={{ color: '#007bff', textDecoration: 'none' }}>
                                ← Back to Registration
                            </a>
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        otpVerified: state.otp && state.otp.verified,
        otpError: state.otpError || { hasError: false },
        registerError: state.registerError || { hasError: false },
        registrationComplete: state.register && state.register.complete
    };
}

function mapDispatchToProps(dispatch) {
    return {
        verifyOtp: (email, otp) => dispatch(verifyOtpAction(email, otp)),
        completeRegistration: (userData) => dispatch(completeRegistrationAction(userData)),
        redirect: () => dispatch(redirectAction())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OtpVerificationPage);
