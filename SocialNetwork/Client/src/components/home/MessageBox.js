import React, { Component, Fragment } from 'react';
import { userService } from '../../infrastructure';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import TextareaAutosize from 'react-autosize-textarea';
import FriendChatBox from './FriendChatBox';
import FriendMessage from './FriendMessage';
import '../user/css/UserAllPage.css';
import './css/MessageBox.css';
import { connect } from 'react-redux';
import { fetchAllChatFriendsAction, updateUserStatusAction } from '../../store/actions/userActions';
import { fetchAllMessagesAction, addMessageAction, fetchAllUnreadMessagesAction } from '../../store/actions/messageActions';

import Stomp from "stompjs";
import SockJS from "sockjs-client";

class MessageBox extends Component {
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
            clientConnected: false,
            touched: {
                content: false,
            }
        };

        this._isMounted = false;

        this.serverUrl = userService.getBaseUrl() + '/socket'
        this.stompClient = null;

        this.handleBlur = this.handleBlur.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.showUserChatBox = this.showUserChatBox.bind(this);
        this.changeChatBoxDisplay = this.changeChatBoxDisplay.bind(this);
        this.getAllMessages = this.getAllMessages.bind(this);
        this.loadAllChatFriends = this.loadAllChatFriends.bind(this);
    }

    componentDidMount() {
        const userId = userService.getUserId();
        this.setState({
            loggedInUserId: userId,
        });

        this.initializeWebSocketConnection();
        this.loadAllChatFriends();

        this._isMounted = true;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.allMessagesArr !== prevProps.allMessagesArr) {
            this.setState({
                content: '',
            }, () => {
                if (this.state.shouldScrollDown) {
                    this.scrollDown();
                } else {
                    this.setState({ shouldScrollDown: true }, this.scrollTop())
                }
            });
        }

        if (this.props.friendsChatArr.length !== prevProps.friendsChatArr.length) {
            this.setState({
                chatBoxDisplay: 'display-none'
            })
        }

        if (this.props.triggerMessageLoad !== prevProps.triggerMessageLoad) {
            const userData = this.props.triggerMessageLoad;
            this.showUserChatBox(userData)
        }

        const errorMessage = this.getErrorMessage(prevProps, prevState);
        const successMessage = this.getSuccessMessage(prevProps, prevState)

        if (errorMessage) {
            toast.error(<ToastComponent.errorToast text={errorMessage} />, {
                position: toast.POSITION.TOP_RIGHT
            });
        } else if (successMessage) {
            toast.success(<ToastComponent.successToast text={successMessage} />, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    componentWillUnmount() {
        this.stompClient.disconnect();
        this._isMounted = false;
    }

    getSuccessMessage(prevProps, prevState) {
        if (!this.props.fetchAllChatFriends.hasError && this.props.fetchAllChatFriends.message && this.props.fetchAllChatFriends !== prevProps.fetchAllChatFriends) {
            return this.props.fetchAllChatFriends.message;
        }
        else if (!this.props.fetchAllMessages.hasError && this.props.fetchAllMessages.message && this.props.fetchAllMessages !== prevProps.fetchAllMessages) {
            return this.props.fetchAllMessages.message;
        }
        return null;
    }

    getErrorMessage(prevProps, prevState) {
        if (this.props.fetchAllChatFriends.hasError && prevProps.fetchAllChatFriends.error !== this.props.fetchAllChatFriends.error) {
            return this.props.fetchAllChatFriends.message || 'Server Error';
        }
        else if (this.props.fetchAllMessages.hasError && prevProps.fetchAllMessages.error !== this.props.fetchAllMessages.error) {
            return this.props.fetchAllMessages.message || 'Server Error';
        }

        return null;
    }

    initializeWebSocketConnection = () => {
        const ws = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(ws);
        const headers = this.getAuthHeader();

        this.stompClient.connect(headers, (frame) => {
            if (this._isMounted) {
                this.setState({ clientConnected: true });
                this.stompClient.subscribe("/user/queue/position-update", (message) => {
                    if (message.body) {
                        const messageBody = JSON.parse(message.body);
                        if (this._isMounted && (messageBody.fromUserId === this.state.chatUserId || messageBody.fromUserId === userService.getUserId())) {
                            this.props.addMessage(messageBody)
                        }

                        if (messageBody.fromUserId !== userService.getUserId()) {
                            const formattedUserNames = userService.formatUsername(messageBody.fromUserFirstName, messageBody.fromUserLastName)

                            toast.info(<ToastComponent.infoToast text={`You have a new message from ${formattedUserNames}!`} />, {
                                position: toast.POSITION.TOP_RIGHT
                            });

                            this.props.loadAllUnreadMessages();
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
            }
        }, () => {
            toast.error(<ToastComponent.errorToast text={`Lost connection to ${this.serverUrl}. Refresh the page to reconnect.`} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            //// Callback for automatically reconnecting to the server
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

    getAllMessages = (chatUserId) => {
        this.props.fetchAllMessages(chatUserId);
    }

    loadAllChatFriends = () => {
        const userId = userService.getUserId();
        this.props.loadAllChatFriends(userId);
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
            content: '',
        }, () => {
            this.getAllMessages(id);
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
        let usersCount = this.props.friendsChatArr.filter(user => { return user.online === true });
        return usersCount.length;
    }

    changeUserOnlineStatus(webSocketMessage) {
        const { userId: id, online } = webSocketMessage;
        this.props.updateUserStatus({ id, online });
    }

    render() {
        if (!this.state.clientConnected) {
            console.log('Connecting...')
            return <h1 className="text-center pt-5 mt-5">Connecting...</h1>
        }

        const { content } = this.state;
        const errors = this.validate(content);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);
        const displayButon = isEnabled ? '' : 'hidden';
        const loggedInUserFirstName = userService.getFirstName();
        const userBoxHeight = this.state.userBoxHeight;
        const chatBoxHeight = this.state.chatBoxHeight;
        const chatBoxDisplay = this.state.chatBoxDisplay;

        const { chatUserProfilePicUrl, chatUserNameFormatted } = this.state;
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
                    <div className="messagebox-friendsChatArr-wrapper">

                        {this.props.friendsChatArr.map((friend) =>
                            <FriendChatBox
                                key={friend.id}
                                showUserChatBox={this.showUserChatBox}
                                {...friend}
                            />
                        )}
                    </div>
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
                            {this.props.allMessagesArr.map((message) =>
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

const mapStateToProps = (state) => {
    return {
        friendsChatArr: state.fetchAllChatFriends.friendsChatArr,
        fetchAllChatFriends: state.fetchAllChatFriends,

        allMessagesArr: state.fetchAllMessages.allMessagesArr,
        fetchAllMessages: state.fetchAllMessages,

        triggerMessageLoad: state.triggerMessageLoad,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadAllChatFriends: (userId) => { dispatch(fetchAllChatFriendsAction(userId)) },
        fetchAllMessages: (chatUserId) => { dispatch(fetchAllMessagesAction(chatUserId)) },
        updateUserStatus: (userData) => { dispatch(updateUserStatusAction(userData)) },
        addMessage: (messageBody) => { dispatch(addMessageAction(messageBody)) },
        loadAllUnreadMessages: () => { dispatch(fetchAllUnreadMessagesAction()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBox);