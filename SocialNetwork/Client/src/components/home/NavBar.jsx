import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import benderPic from '../..//assets/images/Bender/Bender_1.jpeg';
import observer from '../../infrastructure/observer'
import userService from '../../infrastructure/userService'
// import './css/TimeLine.css';

export default class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = { username: '' }

        observer.subscribe(observer.events.loginUser, this.userLoggedIn)
    }

    userLoggedIn = (username) => {
        debugger;
        this.setState({ username })
    }

    render() {
        const role = userService.getRole();
        const isAdmin = userService.isAdmin();
        const userId = userService.getUserId();
        const profileLink = "/profile/" + userId;

        debugger;

        console.log('isAdmin: ', isAdmin)
        console.log(this.props)

        const { loggedIn, onLogout } = this.props;
        debugger;
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
                                <div className="nav-search-icon">
                                    <NavLink  to="#"><i className="fas fa-search"></i></NavLink>
                                </div>
                                <div className="nav-search-div">
                                    <input type="text" className="nav-search" placeholder="Search..." />
                                </div>
                            </div>

                            <label id="toggle" htmlFor="main-nav-toggle"><span>Menu</span></label>

                            <nav className="nav-main">
                                <ul className="nav-ul">

                                    {/* <li><NavLink to="{{ site.baseurl }}/about">Bender</NavLink></li>
                                    <li><NavLink to="{{ site.baseurl }}/">Home</NavLink></li>
                                    <li><NavLink className="fas fa-user-friends" to="{{ site.baseurl }}/friends"></NavLink></li>
                                    <li><NavLink className="fas fa-camera" to="{{ site.baseurl }}/gallery/"></NavLink></li> */}

                                    {loggedIn && <li className="nav-item"><NavLink exact to={`/home/profile/${userId}`} className="nav-link  fas fa-user tooltipCustom"  > {userService.getUsername()}<span className="tooltiptextCustom">Profile</span></NavLink></li>}

                                    {loggedIn && <li className="nav-item"><NavLink exact to={`/home/${userId}`} className="nav-link ">Home</NavLink></li>}

                                    {loggedIn && <li className="nav-item"><NavLink exact to={`/home/findFriends/${userId}`} className="nav-link " >Find friends!</NavLink></li>}

                                    {loggedIn && <li className="nav-item"><NavLink  exact to={`/home/friends/${userId}`} className="nav-link fas fa-user-friends tooltipCustom"> <span className="tooltiptextCustom">Friend Requests</span></NavLink></li>}
                                    {loggedIn && <li className="nav-item"><NavLink  exact to={`/home/friends/${userId}`} className="nav-link fas fa-envelope tooltipCustom"><span className="tooltiptextCustom">Messages</span></NavLink></li>}
                                    {/* {loggedIn && <li><NavLink className="fas fa-camera" to="{{ site.baseurl }}/gallery/"></NavLink></li>} */}

                                    {loggedIn && <li className="nav-item"><NavLink exact to="#" className="nav-link " onClick={onLogout} >Logout</NavLink></li>}

                                    {/* {loggedIn && <li className="nav-item">
                            
                                    <NavLink exact to="javascript:void(0)" style={{ margin: 20, color: 'white' }} onClick={onLogout}>Logout</NavLink>
                                </li>} */}

                                    {!loggedIn && <li className="nav-item">
                                        <NavLink exact to="/login" className="nav-link" >Login</NavLink>
                                    </li>}

                                    {!loggedIn && <li className="nav-item">
                                        <NavLink exact to="/register" className="nav-link" >Register</NavLink>
                                    </li>}
                                    

                                </ul>
                            </nav>

                        </div>
                    </section>
                </header>
            </Fragment>
        )
    }

}


