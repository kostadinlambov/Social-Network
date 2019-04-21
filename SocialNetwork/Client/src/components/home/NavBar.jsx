import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { userService, requester, observer } from '../../infrastructure';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import MessageNavBarRow from './MessageNavbarRow';
import './css/MessageNavbarRow.css';
import './css/Navbar.css';

export default class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            search: '',
            showDropdown: '',
            unreadMessages: 0,
            displayMessageCount: false,
            allUnreadMessages: [],
        }

        this.searchFriend = this.searchFriend.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.getAllFriendMessages = this.getAllFriendMessages.bind(this);
        this.triggerMessageLoad = this.triggerMessageLoad.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.changeMessaboxVisibility = this.changeMessaboxVisibility.bind(this);

        observer.subscribe(observer.events.loginUser, this.userLoggedIn)
    }

    componentDidMount = () => {
        // this.setState({ showDropdown: '' },
        //     () => this.getAllFriendMessages()
        // )
    }

    userLoggedIn = (username) => {
        this.setState({ username })
    }

    searchFriend(event) {
        event.preventDefault();

        this.props.history.push({
            pathname: "/home/users/search",
            state: {
                search: this.state.search
            }
        })
    }

    handleChange(event) {
        event.preventDefault();
        const { name, value } = event.target

        this.setState({
            [name]: value
        })
    }

    onChangeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    getAllFriendMessages = () => {
        if (this.state.showDropdown === 'show-dropdown') {
            this.changeMessaboxVisibility();
            return;
        }

        requester.get('/message/friend', (response) => {
            if (response) {
                this.setState({
                    allUnreadMessages: response,
                    displayMessageCount: false,
                }, () => {
                    this.changeMessaboxVisibility()
                    this.getUnreadMessagesCount()
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

    triggerMessageLoad = (id, firstName, lastName, profilePicUrl, event) => {
        this.changeMessaboxVisibility();
        observer.trigger(observer.events.loadMessages, { id, firstName, lastName, profilePicUrl });
    }

    handleBlur = () => (event) => {
        this.setState({
            showDropdown: '',
        });
    }

    changeMessaboxVisibility = () => {
        if (this.state.showDropdown === '') {
            this.setState({ showDropdown: 'show-dropdown' })
        } else {
            this.setState({ showDropdown: '' })
        }
    }

    getUnreadMessagesCount = () => {
        let count = this.state.allUnreadMessages.reduce((a, b) => {
            return a + b.count;
        }, 0)

        if (count > 0) {
            this.setState({
                unreadMessages: count,
                displayMessageCount: true,
            })
        }
    }

    render() {
        const isAdmin = userService.isAdmin();
        const isRoot = userService.isRoot();
        const userId = userService.getUserId();

        const { loggedIn, onLogout } = this.props;
        const showDropdown = this.state.showDropdown;
        let pathname = this.props.location.pathname !== "/" && this.props.location.pathname !== "/home/users/search";

        let messages = (
            <Fragment>
                <div className="dropdown-messagebox-header" onClick={this.changeHeight}>
                    <h5 className="dropdown-chat-title" style={{ color: ' #333' }}>
                        There are no messages for you!
                    </h5>
                </div>
            </Fragment>
        )

        if (this.state.allUnreadMessages.length > 0) {
            messages = (
                <Fragment>
                    <div className="messagebox-navbar-container">
                        {this.state.allUnreadMessages.map(message =>
                            <MessageNavBarRow
                                key={message.id}
                                {...message}
                                triggerMessageLoad={this.triggerMessageLoad}
                                className="dropdown-item"
                            />
                        )}
                    </div>
                </Fragment>
            )


        }

        return (
            <Fragment >
                <input type="checkbox" name="main-nav-toggle" id="main-nav-toggle" />
                <header className="site-header">
                    <section className="navbar-section">
                        <div className="navbar-wrapper">
                            <div className="nav-searchbar-container">
                                <div className="site-logo">
                                    <NavLink to="/" className="nav-link " >Social Network</NavLink>
                                </div>
                                {loggedIn && <form className="form-inline my-2 my-lg-0" onSubmit={this.searchFriend}>
                                    <input
                                        className="form-control mr-sm-2"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        name="search"
                                        id="search"
                                        value={this.state.search}
                                        onChange={this.onChangeHandler}
                                    />

                                    <button className="btn button-navbar-outline my-2 my-sm-0" type="submit">Search</button>
                                </form>}
                            </div>

                            <label id="toggle" htmlFor="main-nav-toggle" style={{ 'marginBottom': '0' }}><span>Menu</span></label>

                            <nav className="nav-main">
                                <ul className="nav-ul">
                                    {loggedIn && <li className="nav-item"><NavLink exact to={`/home/profile/${userId}`} className="nav-link  fas fa-user tooltipCustom"  > {userService.getUsername()}<span className="tooltiptextCustom">Profile</span></NavLink></li>}

                                    {loggedIn && <li className="nav-item"><NavLink exact to={`/home/comments/${userId}`} className="nav-link ">Home</NavLink></li>}
                                    {loggedIn && <li className="nav-item"><NavLink exact to={`/home/findFriends/${userId}/findFriends`} className="nav-link " >Find friends!</NavLink></li>}


                                    {loggedIn &&
                                        <li className="nav-item">
                                            <NavLink exact to={`/home/findFriends/${userId}/requests`} className="nav-link tooltipCustom">
                                                <i className="fas fa-user-friends"></i>
                                                {/* <i id="icon-badge-container-friend-requests" data-count="2" className="fas fa-user-friends"></i> */}
                                                <span className="tooltiptextCustom" id="friend-requests-tooltip">Friend Requests</span>
                                            </NavLink>
                                        </li>}

                                    {loggedIn && pathname &&
                                        <li className="nav-item"
                                            id="onclick-wrapper"
                                            onClick={this.getAllFriendMessages}
                                            onBlur={this.handleBlur('onclick-wrapper')}
                                        >
                                            {/* <div className="icon-badge-wrapper"> */}
                                                <NavLink className="fas fa-envelope tooltipCustom nav-link" to="#">
                                                    <span className="tooltiptextCustom">Messages</span>
                                                </NavLink>
                                                {/* {this.state.displayMessageCount && <span id="icon-badge-container-messages">{this.state.unreadMessages}</span>} */}
                                            {/* </div> */}

                                            <div className={`dropdown-container ${showDropdown}`}>
                                                <div className="dropdown-messagebox-header" onClick={this.changeHeight}>
                                                    <div className="dropdown-messagebox-chat-icon">
                                                        <i className="fas fa-envelope"></i>
                                                    </div>
                                                    <h4 className="dropdown-chat-title" style={{ color: ' #333' }}>
                                                        Messages
                                                    </h4>
                                                </div>
                                                {messages}
                                            </div>
                                        </li>
                                    }

                                    {(loggedIn && (isRoot || isAdmin)) && <li className="nav-item"><NavLink exact to={`/home/logs/${userId}`} className="nav-link"> Logs</NavLink></li>}
                                    {loggedIn && <li className="nav-item"><NavLink exact to="#" className="nav-link " onClick={onLogout} >Logout</NavLink></li>}
                                    {!loggedIn && <li className="nav-item"><NavLink exact to="/login" className="nav-link" >Login</NavLink></li>}
                                    {!loggedIn && <li className="nav-item"><NavLink exact to="/register" className="nav-link" >Register</NavLink></li>}
                                </ul>
                            </nav>
                        </div>
                    </section>
                </header>
            </Fragment >
        )
    }
}


