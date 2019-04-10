import React, { Component, Fragment } from 'react';
import { requester, userService } from '../../infrastructure'
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import TextareaAutosize from 'react-autosize-textarea';
import FriendChatBox from './FriendChatBox';
import FriendMessage from './FriendMessage';
import '../user/css/UserAllPage.css';
import './css/MessageBox.css';

import placeholder_user_image from '../../assets/images/placeholder-profile-male.jpg'

export default class MessageBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedInUserId: '',
            chatUserId: '',
            chatUserFirstName: '',
            chatUserLastName: '',
            chatUserProfilePicUrl: '',
            userBoxHeight: 'toggle',
            chatBoxHeight: '',
            chatBoxDisplay: 'display-none',
            content: '',
            friendsArr: [],
            allMessages: [],
            touched: {
                content: false,
            }
            // loggedInUserId: userService.getUserId(),
            // timelineUserId: '',
            // imageUrl: '',
            // loggedInUserProfilePicUrl: '',

        };

        this.handleBlur = this.handleBlur.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.showUserChatBox = this.showUserChatBox.bind(this);
        this.changeChatBoxDisplay = this.changeChatBoxDisplay.bind(this);
        this.loadAllFriends = this.loadAllFriends.bind(this);
        this.getAllMessages = this.getAllMessages.bind(this);
    }

    componentDidMount() {
        const userId = userService.getUserId();
        this.setState({
            loggedInUserId: userId
        }, this.loadAllFriends(userId))
    }

    loadAllFriends = (userId) => {
        requester.get(`/relationship/friends/${userId}`, (response) => {
            this.setState({
                friendsArr: response
            })
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

    getAllMessages = () => {
        debugger;
        requester.get('/message/all/' + this.state.chatUserId, (response) => {
            console.log('All messages: ', response)
            debugger;
            if (response) {
                this.setState({
                    allMessages: response,
                    content: '',
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
        debugger;

        if (!this.canBeSubmitted()) {
            return;
        }

        const { chatUserId: toUserId, content, loggedInUserId } = this.state;

        debugger;

        requester.post('/message/create', { toUserId, content }, (response) => {
            console.log('response', response)
            debugger;
            if (response.success === true) {
                debugger;
                this.getAllMessages();
                this.setState({ content: '' })
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
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


    showUserChatBox = (id, firstName, lastName, profilePicUrl, event) => {
        this.setState({
            chatUserId: id,
            chatUserFirstName: firstName,
            chatUserLastName: lastName,
            chatUserProfilePicUrl: profilePicUrl
        }, () => {
            this.getAllMessages();
            this.changeChatBoxDisplay()
        })
        debugger;
    }

    render() {
        console.log('MessageBox props', this.props)

        // if (this.props.match.params.id !== this.props.id) {
        //     this.props.getUserToShowId(this.props.match.params.id);
        // }

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

        const { chatUserFirstName, chatUserLastName, chatUserProfilePicUrl } = this.state

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

                    {this.state.friendsArr.map((friend) =>
                        <FriendChatBox
                            key={friend.id}
                            changeChatBoxDisplay={this.changeChatBoxDisplay}
                            showUserChatBox={this.showUserChatBox}
                            {...friend}
                        />
                    )}

                </section>

                <section className={`chat-container ${chatBoxHeight} ${chatBoxDisplay}`}>
                    <div className="chat-friend-container" onClick={this.changeChatBoxHeight}>
                        <div className="chat-friend-image">
                            <img className={imageClassUserPick} src={chatUserProfilePicUrl} alt="bender" />
                        </div>
                        <div className="chat-username-container" >
                            <p className="chat-username">{chatUserFirstName} {chatUserLastName}</p>
                        </div>
                    </div>
                    <div className="content-wrapper">

                        <div className="chat-content">
                            {this.state.allMessages.map((message, index) =>
                                <FriendMessage
                                    key={message.fromUserId + index}
                                    {...message}
                                />
                            )}
                        </div>
                        <div className="chat-footer">
                            <div className="chat-input-group">

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
                    </div>

                </section>
            </Fragment>
        )
    }
}