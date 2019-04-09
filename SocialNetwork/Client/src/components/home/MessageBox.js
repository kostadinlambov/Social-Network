import React, { Component, Fragment } from 'react';
import UserRow from '../user/UserRow';
import { requester, userService } from '../../infrastructure'
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import TextareaAutosize from 'react-autosize-textarea';
import '../user/css/UserAllPage.css';
import './css/MessageBox.css';

import placeholder_user_image from '../../assets/images/placeholder-profile-male.jpg'
import default_background_image from '../../assets/images/default-background-image.jpg'


export default class MessageBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedInUserId: userService.getUserId(),
            timelineUserId: '',
            content: '',
            imageUrl: '',
            loggedInUserProfilePicUrl: '',
            userBoxHeight: '',
            chatBoxHeight: '',
            chatBoxDisplay: '',
            touched: {
                content: false,
            }
        };

        this.handleBlur = this.handleBlur.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.showUserChatBox = this.showUserChatBox.bind(this);
    }

    componentDidMount() {
        const userId = this.props.match.params.id;

        requester.get('/users/all/' + userId, (response) => {
            if (response) {
                this.setState({
                    userArr: response,
                    // userArr: response['payload'],
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

    onSubmitHandler(event) {
        event.preventDefault();

        if (!this.canBeSubmitted()) {
            return;
        }

        const timelineUserId = this.props.timelineUserId;
        const { loggedInUserId, content, imageUrl } = this.state;

        requester.post('/post/create', { timelineUserId, loggedInUserId, content, imageUrl }, (response) => {
            if (response.success === true) {
                this.props.getAllPosts(timelineUserId);
                this.setState({ content: '' })
            } else {
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }).catch(err => {
            localStorage.clear();
            toast.error(<ToastComponent.errorToast text={`${err.message}`} />, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
    }

    onChangeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleBlur = (field) => (event) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    canBeSubmitted() {
        const { content } = this.state;
        const errors = this.validate(content);
        const isDisabled = Object.keys(errors).some(x => errors[x])
        return !isDisabled;
    }

    validate = (content) => {
        return {
            content: content.length === 0,
        }
    }

    changeHeight = () => {
        const userBoxHeight = this.state.userBoxHeight;
        if (userBoxHeight === '') {
            this.setState({ userBoxHeight: 'toggle' })
        } else {
            this.setState({ userBoxHeight: '' })
        }
    }

    changeChatBoxHeight = () => {
        const chatBoxHeight = this.state.chatBoxHeight;
        if (chatBoxHeight === '') {
            this.setState({ chatBoxHeight: 'toggle-chat-container' })
        } else {
            this.setState({ chatBoxHeight: '' })
        }
    }

    changeChatBoxDisplay = () => {
        debugger;
        const chatBoxDisplay = this.state.chatBoxDisplay;
        if (chatBoxDisplay === '') {
            this.setState({ chatBoxDisplay: 'display-none' })
        } else {
            this.setState({ chatBoxDisplay: '' })
        }
    }


    showUserChatBox = (event) => {
        debugger;
        console.log(event);
        debugger;
    }

    render() {
        if (this.props.match.params.id !== this.props.id) {
            this.props.getUserToShowId(this.props.match.params.id);
        }

        // const imageClass = userService.getImageSize(props.imageUrl);
        const imageClassUserPick = userService.getImageSize(placeholder_user_image);

        let isRoot = userService.isRoot();

        const { content } = this.state;

        const errors = this.validate(content);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);
        const displayButon = isEnabled ? '' : 'hidden';

        const imageClass = userService.getImageSize(this.props.imageUrl);
        const loggedInUserProfilePicUrl = userService.getProfilePicUrl();
        // const loggedInUserProfilePicUrl = this.props.loggedInUserProfilePicUrl;
        const loggedInUserFirstName = userService.getFirstName();

        const userBoxHeight = this.state.userBoxHeight;
        const chatBoxHeight = this.state.chatBoxHeight;
        const chatBoxDisplay = this.state.chatBoxDisplay;

        return (
            <Fragment>
                <section className={`messagebox-container ${userBoxHeight}`} >
                    <div className="messagebox-header" onClick={this.changeHeight}>
                        <div className="messagebox-chat-icon">
                            <i className="fas fa-user-friends"></i>
                        </div>
                        <h3 className="chat-title" style={{ color: ' #333' }}>
                            Chat
                        </h3>
                    </div>
                    <div className="messagebox-friend-container" onClick={this.changeChatBoxDisplay}>
                        <div className="messagebox-friend-image">
                            <img className={imageClassUserPick} src={placeholder_user_image} alt="bender" />
                        </div>
                        <div className="messagebox-username-container" >
                            <p className="messagebox-username">Pesho Peshov </p>
                            {/* <p className="post-description"> Time</p> */}
                        </div>

                    </div>
                    <div className="messagebox-friend-container" >
                        <div className="messagebox-friend-image">
                            <img className={imageClassUserPick} src={placeholder_user_image} alt="bender" />
                        </div>
                        <div className="messagebox-username-container" >
                            <p className="messagebox-username">Gosho Goshev </p>
                            {/* <p className="post-description"> Time</p> */}
                        </div>
                    </div>
                

                </section>

                <section className={`chat-container ${chatBoxHeight} ${chatBoxDisplay}`}>
                    <div className="chat-friend-container" onClick={this.changeChatBoxHeight}>
                        <div className="chat-friend-image">
                            <img className={imageClassUserPick} src={placeholder_user_image} alt="bender" />
                        </div>
                        <div className="chat-username-container" >
                            <p className="chat-username">Pesho Peshov </p>
                            {/* <p className="post-description"> Time</p> */}
                        </div>
                    </div>
                    <div className="chat-content">
                                Content

                    </div>

                    <div class="chat-footer">
                        <div class="chat-input-group">

                            {/* <textarea name="" class="form-control type_msg" placeholder="Type your message..."></textarea> */}
                            <div className="chat-area-container">
                                <form onSubmit={this.onSubmitHandler}>
                                    <div className="" id="chat-textarea-form-group">
                                        <TextareaAutosize
                                            name="content"
                                            id="content"
                                            className="chat-textarea"
                                            value={this.state.content}
                                            onChange={this.onChangeHandler}
                                            onBlur={this.handleBlur('content')}
                                            aria-describedby="contentHelp"
                                            placeholder={`Type your message, ${loggedInUserFirstName}?`}
                                            maxRows={6}
                                        >
                                        </TextareaAutosize>
                                    </div>

                                    <div className="text-center">
                                        {/* <button disabled={!isEnabled} style={{ 'visibility': `${displayButon}` }} type="submit" className="btn uiButtonGroup post-button-fbPhotoCurationControl App-button-primary ">POST</button> */}
                                        <button disabled={!isEnabled} style={{ 'visibility': `${displayButon}` }} type="submit" className="btn fas fa-location-arrow App-button-primary send-btn"></button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </section>
                {/* ############################################################### */}

                <div className="" id="container">
                    <div className="post-content-article-header " style={{ background: 'red' }}>
                        <div className="post-content-article-image">
                            <img className={imageClassUserPick} src={placeholder_user_image} alt="bender" />
                        </div>
                        <div className="post-content-article-description" >
                            <p className="post-user-info">Pesho Peshov </p>
                            {/* <p className="post-description"> Time</p> */}
                        </div>
                    </div>
                    <div className="main-article-comments-container" style={{ 'background': 'white' }}>
                        <div className="post-content-article-image">
                            <img className={imageClassUserPick} src={placeholder_user_image} alt="creatorPic" />
                        </div>
                        <div className="main-article-shared-content-description">
                            <p className="content"><span >Pesho Peshov</span> </p>
                        </div>
                    </div>
                </div>


            </Fragment>
        )
    }
}