import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { userService, observer, requester } from '../../infrastructure'
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import default_background_image from '../../assets/images/default-background-image.jpg'
import placeholder_user_image from '../../assets/images/placeholder-profile-male.jpg'


export default class Friend extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            username: '',
            profilePicUrl: '',
            backgroundImageUrl: '',
            firstButtonText: '',
            secondButtonText: '',
            firstButtonLink: '',
            secondButtonLink: '',
        }

        this.promote = this.promote.bind(this);
        this.demote = this.demote.bind(this);
    }

    componentDidMount() {

        this.setState({ ...this.props })
        debugger;
    }

    promote = (event) => {
        event.preventDefault();
        const id = this.state.id;
        requester.post('/users/promote?id=' + id, id, (response) => {
            console.log(response)
            debugger;
            if (response.success) {
                this.setState({ role: 'ADMIN' })
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {
                console.log('error message: ', response.message);
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }).catch(err => {
            console.error('Promote err:', err)
            toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
                // toast.error(<ToastComponent.errorToast text={`${error.name}: ${error.message}`} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
                this.props.history.push('/login');
            }
        })
    }

    demote = (event) => {
        event.preventDefault();
        const id = this.state.id;
        requester.post('/users/demote?id=' + id, id, (response) => {
            console.log(response)
            if (response.success) {
                this.setState({ role: 'USER' })
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {
                console.log('error message: ', response.message);
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }

        }).catch(err => {
            console.error('Demote err:', err)
            toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
                // toast.error(<ToastComponent.errorToast text={`${error.name}: ${error.message}`} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
                this.props.history.push('/login');
            }
        })
    }

    render = () => {
        const {id, firstName, lastName, firstButtonText, secondButtonText, firstButtonLink, secondButtonLink } = this.state;
        const backgroundImageUrl = this.state.backgroundImageUrl || default_background_image
        const profilePicUrl = this.state.profilePicUrl || placeholder_user_image

        debugger;
        let imgClassName = '';
        if (profilePicUrl) {
            imgClassName = userService.getImageSize(profilePicUrl);
        }
        debugger;
        return (
            <div className="friend-container" style={{ 'backgroundImage': `url(${backgroundImageUrl})` }}>
                <span className="friend-img-container">
                    <img className={imgClassName} src={profilePicUrl} alt="Profile pic" />
                </span>
                <div className="friend-content">
                    <h2 className="friend-text-shadow" >{`${firstName} ${lastName}`}</h2>
                    <div className="friend-button-container">
                        <button className="button update-info">
                            <NavLink to={firstButtonLink}>{firstButtonText}</NavLink>
                            {/* <NavLink to={`/home/profile/${id}`}>VIEW PROFILE</NavLink> */}
                        </button>
                        <button className="button view-activity">
                            <NavLink to={secondButtonLink}>{secondButtonText}</NavLink>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

