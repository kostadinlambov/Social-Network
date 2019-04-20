import React, { Component, Fragment } from 'react';
import { requester, userService, observer } from '../../infrastructure'
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import TextareaAutosize from 'react-autosize-textarea';
import FriendChatBox from './FriendChatBox';
import FriendMessage from './FriendMessage';
import '../user/css/UserAllPage.css';
import './css/MessageBox.css';

import Stomp from "stompjs";
import SockJS from "sockjs-client";

export default class MessageBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedInUserId: '',
            chatUserId: '',
            chatUserFirstName: '',
            chatUserLastName: '',
            chatUserNameFormatted: '',
            chatUserProfilePicUrl: '',
            userBoxHeight: 'toggle',
            chatBoxHeight: '',
            chatBoxDisplay: 'display-none',
            content: '',
            shouldScrollDown: false,
            friendsArrLength: 0,
            friendsArr: [],
            allMessages: [],
            webSocketMessages: [],
            friendsChatArr: [],
            clientConnected: false,
            touched: {
                content: false,
            }
        };

        this.serverUrl = userService.getBaseUrl() + '/socket'
        this.stompClient = null;

        this.handleBlur = this.handleBlur.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.showUserChatBox = this.showUserChatBox.bind(this);
        this.changeChatBoxDisplay = this.changeChatBoxDisplay.bind(this);
        this.getAllMessages = this.getAllMessages.bind(this);

        observer.subscribe(observer.events.loadMessages, this.showUserChatBox)
    }

    static getDerivedStateFromProps(props, state) {
        if (props.friendsChatArr.length !== state.friendsChatArr.length) {
            return {
                friendsChatArr: props.friendsChatArr,
                chatBoxDisplay: 'display-none'
            }
        }
        return null;
    }

    componentDidMount() {
        this.props.loadAllChatFriends();
        const userId = userService.getUserId();
        this.setState({
            loggedInUserId: userId,
        });

        this.initializeWebSocketConnection();
    }

    initializeWebSocketConnection = () => {
        const ws = new SockJS(this.serverUrl);

        this.stompClient = Stomp.over(ws);
        const headers = this.getAuthHeader();

        this.stompClient.connect(headers, (frame) => {
            this.setState({ clientConnected: true });
            this.stompClient.subscribe("/user/queue/position-update", (message) => {
                if (message.body) {
                    const parsedBody = JSON.parse(message.body);

                    if (parsedBody.fromUserId === this.state.chatUserId || parsedBody.fromUserId === userService.getUserId()) {
                        this.setState(prevState => ({
                            allMessages: [...prevState.allMessages, parsedBody],
                        }), () => this.scrollDown());
                    }

                    if (parsedBody.fromUserId !== userService.getUserId()) {
                        const formattedUserNames = userService.formatUsername(parsedBody.fromUserFirstName, parsedBody.fromUserLastName)

                        toast.info(<ToastComponent.infoToast text={`You have a new message from ${formattedUserNames}!`} />, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                }
            });

            this.stompClient.subscribe("/chat/login", (message) => {
                if (message.body) {
                    const parsedBody = JSON.parse(message.body);
                    this.changeUserOnlineStatus(parsedBody);
                }
            });

            this.stompClient.subscribe("/chat/logout", (message) => {
                if (message.body) {
                    const parsedBody = JSON.parse(message.body);
                    this.changeUserOnlineStatus(parsedBody);
                }
            });
        }, () => {
            toast.error(<ToastComponent.errorToast text={`Lost connection to ${this.serverUrl}. Refresh the page to reconnect.`} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            //// Callback to automatically reconnecting to the server
            // setTimeout(() => {
            //     toast.error(<ToastComponent.errorToast text={`Lost connection to ${this.serverUrl}. Trying to reconnect.`} />, {
            //         position: toast.POSITION.TOP_RIGHT
            //     });
            //     this.initializeWebSocketConnection();
            // }, 10000);
        });
    }

    sendMessage(payload) {
        this.stompClient.send("/app/message", {}, JSON.stringify(payload));
        this.setState({ content: '' })
    }

    getAuthHeader = () => {
        const token = localStorage.getItem("token");
        return (token && token.length)
            ? { 'Authorization': `Bearer ${token}` }
            : {}
    }

    getAllMessages = () => {
        requester.get('/message/all/' + this.state.chatUserId, (response) => {
            if (response) {
                this.setState({
                    allMessages: response,
                    content: '',
                }, () => {
                    if (this.state.shouldScrollDown) {
                        this.scrollDown();
                    } else {
                        this.setState({ shouldScrollDown: true }, this.scrollTop())
                    }
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

        const { chatUserId: toUserId, content } = this.state;

        if (this.state.clientConnected) {
            this.sendMessage({ toUserId, content });
        } else {
            toast.error(<ToastComponent.errorToast text={`StompClient is disconnected`} />, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
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
        const chatBoxDisplay = this.state.chatBoxDisplay;
        if (chatBoxDisplay === '') {
            this.setState({ chatBoxDisplay: 'display-none' })
        } else {
            this.setState({ chatBoxDisplay: '' })
        }
    }

    showUserChatBox = (data, event) => {
        const { id, firstName, lastName, profilePicUrl } = data
        let chatUserNameFormatted = userService.formatUsername(firstName, lastName, 18)
        this.setState({
            chatUserId: id,
            chatUserFirstName: firstName,
            chatUserLastName: lastName,
            chatUserNameFormatted,
            chatUserProfilePicUrl: profilePicUrl,
            shouldScrollDown: true,
            chatBoxDisplay: '',
            chatBoxHeight: '',

        }, () => {
            this.getAllMessages();
        })
    }

    closeUserChatBox = () => {
        this.setState({ chatBoxDisplay: 'display-none' })
    }

    scrollToBottom() {
        const e = document.getElementById('chat-content');
        e.scrollTop = e.scrollHeight - e.getBoundingClientRect().height;
    }

    scrollTop() {
        const container = document.getElementById('chat-content');
        container.scrollTop = 0;
    }

    scrollDown() {
        const container = document.getElementById('chat-content');
        container.scrollTop = container.scrollHeight
    }

    getOnlineUserCount = () => {
        let usersCount = this.state.friendsChatArr.filter(user => { return user.online === true });
        return usersCount.length;
    }

    changeUserOnlineStatus(webSocketMessage) {
        const { userId: id, online } = webSocketMessage;

        const copieFriendsChatArr = JSON.parse(JSON.stringify(this.state.friendsChatArr));
        const index = copieFriendsChatArr.findIndex(x => x.id === id);

        this.setState((prevState, props) => ({
            friendsChatArr:
                [...copieFriendsChatArr.slice(0, index),
                { ...copieFriendsChatArr[index], online: online },
                ...copieFriendsChatArr.slice(index + 1)]
        }));
    }

    componentWillUnmount() {
        this.stompClient.disconnect();
    }

    render() {
        const { content } = this.state;
        const errors = this.validate(content);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);
        const displayButon = isEnabled ? '' : 'hidden';
        const loggedInUserFirstName = userService.getFirstName();
        const userBoxHeight = this.state.userBoxHeight;
        const chatBoxHeight = this.state.chatBoxHeight;
        const chatBoxDisplay = this.state.chatBoxDisplay;

        const { chatUserFirstName, chatUserLastName, chatUserProfilePicUrl, chatUserNameFormatted } = this.state;
        const imageClassUserPick = userService.getImageSize(chatUserProfilePicUrl);
        const firstNameFormatted = userService.formatUsername(loggedInUserFirstName);

        return (
            <Fragment>
                <section className={`messagebox-container ${userBoxHeight}`} >
                    <div className="messagebox-header" onClick={this.changeHeight}>
                        <div className="messagebox-chat-icon">
                            <i className="fas fa-location-arrow"></i>
                        </div>
                        <h4 className="chat-title" style={{ color: ' #333' }}>
                            Chat &bull; {this.getOnlineUserCount()}
                        </h4>
                    </div>

                    {this.state.friendsChatArr.map((friend) =>
                        <FriendChatBox
                            key={friend.id}
                            showUserChatBox={this.showUserChatBox}
                            {...friend}
                        />
                    )}
                </section>
                <section className={`chat-container ${chatBoxHeight} ${chatBoxDisplay}`} id="chat-container">
                    <div className="chat-friend-container" onClick={this.changeChatBoxHeight}>
                        <div className="chat-friend-image">
                            <img className={imageClassUserPick} src={chatUserProfilePicUrl} alt="bender" />
                        </div>
                        <div className="chat-username-container" >
                            <p className="chat-username">{chatUserNameFormatted}</p>
                        </div>
                    </div>

                    <div className="close-button-container" onClick={this.closeUserChatBox}>
                        <div className="btn chat-uiButtonGroup chat-fbPhotoCurationControl  chat-delete-button" ><i className="fas fa-times"></i></div>
                    </div>

                    <div className="content-wrapper">

                        <div className="chat-content" id="chat-content">
                            {this.state.allMessages.map((message) =>
                                <FriendMessage
                                    key={message.id}
                                    {...message}
                                />
                            )}
                        </div>
                        <div className="chat-footer">
                            <div className="chat-input-group">
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
                                                placeholder={`Type your message, ${firstNameFormatted}?`}
                                                maxRows={6}
                                            >
                                            </TextareaAutosize>
                                        </div>

                                        <div className="text-center">
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