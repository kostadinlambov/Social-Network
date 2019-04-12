import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { userService, requester, observer } from '../../infrastructure';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import './css/MessageNavbarRow.css';

import './css/Navbar.css';
import MessageNavBarRow from './MessageNavbarRow';

export default class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            search: '',
            allUnreadMessages: [],
        }

        this.searchFriend = this.searchFriend.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.getAllUnreadMessages = this.getAllUnreadMessages.bind(this);

        observer.subscribe(observer.events.loginUser, this.userLoggedIn)
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

        console.log('this.state.search: ', this.state.search)
    }



    getAllUnreadMessages = () => {
        debugger;
        requester.get('/message/unread/', (response) => {
            console.log('All unread messages: ', response)
            debugger;
            if (response) {
                this.setState({
                    allUnreadMessages: response,
                }, () => {
                    // if (this.state.shouldScrollDown) {
                    //     this.scrollDown();
                    // } else {
                    //     this.setState({ shouldScrollDown: true }, this.scrollTop())
                    // }
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

    render() {
        const role = userService.getRole();
        const isAdmin = userService.isAdmin();
        const isRoot = userService.isRoot();
        const userId = userService.getUserId();

        const { loggedIn, onLogout } = this.props;
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

                            <label id="toggle" htmlFor="main-nav-toggle"><span>Menu</span></label>

                            <nav className="nav-main">
                                <ul className="nav-ul">
                                    {loggedIn && <li className="nav-item"><NavLink exact to={`/home/profile/${userId}`} className="nav-link  fas fa-user tooltipCustom"  > {userService.getUsername()}<span className="tooltiptextCustom">Profile</span></NavLink></li>}

                                    {loggedIn && <li className="nav-item"><NavLink exact to={`/home/comments/${userId}`} className="nav-link ">Home</NavLink></li>}
                                    {loggedIn && <li className="nav-item"><NavLink exact to={`/home/findFriends/${userId}/findFriends`} className="nav-link " >Find friends!</NavLink></li>}
                                    {loggedIn && <li className="nav-item"><NavLink exact to={`/home/findFriends/${userId}/requests`} className="nav-link fas fa-user-friends tooltipCustom"> <span className="tooltiptextCustom">Friend Requests</span></NavLink></li>}

                                    {/* {loggedIn && <li className="nav-item">
                                        <NavLink exact to={`/home/message/${userId}`} className="nav-link fas fa-envelope tooltipCustom">
                                            <span className="tooltiptextCustom">Messages</span>
                                        </NavLink>


                                    </li>} */}
                                    {loggedIn &&

                                        <li className="nav-item dropdown " onClick={this.getAllUnreadMessages} >
                                            <NavLink
                                                className="nav-link  fas fa-envelope tooltipCustom"
                                                to="#"
                                                id="navbarDropdown"
                                                role="button"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                            <span className="tooltiptextCustom">Messages</span>
                                        </NavLink>
                                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                                <div className="messagebox-navbar-container">
                                                    {this.state.allUnreadMessages.map(message =>
                                                        <MessageNavBarRow
                                                            key={message.id}
                                                            {...message}
                                                            className="dropdown-item"
                                                        />

                                                    )}
                                                </div>
                                            </div>

                                            {/* <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <a className="dropdown-item" href="#">Action</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="#">Something else here</a>
                                        </div> */}
                                        </li>}

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


