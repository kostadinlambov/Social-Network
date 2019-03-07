import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import '../../styles/Header.css'
import observer from '../../infrastructure/observer'
import userService from '../../infrastructure/userService'

export default class Header extends Component {
    constructor(props) {
        super(props)

        this.state = { username: '' }

        observer.subscribe(observer.events.loginUser, this.userLoggedIn)
    }

    userLoggedIn = (username) => {
        this.setState({ username })
    }

    render() {
        const role = userService.getRole();

        let isAdmin = userService.isAdmin();

        let userId = userService.getUserId();
        let profileLink = "/profile/" + userId;

        console.log('isAdmin: ', isAdmin)
        console.log(this.props)

        const { loggedIn, onLogout } = this.props;
        return (
            // <div className="custom-header-container">
            <div className="navbar-wrapper">
                {/* <div className="container "> */}
                    <div className="custom-nav-container">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <NavLink exact to="/" className="navbar-brand text-white">Social Network</NavLink>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <NavLink exact to={`/home/${userId}`} className="nav-link text-white" >Home<span className="sr-only">(current)</span></NavLink>
                                </li>

                                {/* <li className="nav-item dropdown text-white">
                                    <NavLink to="#" className="nav-link dropdown-toggle text-white" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Dropdown link</NavLink>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <NavLink exact to="/register" className="dropdown-item" >Register</NavLink>
                                        <NavLink to="/login" className="dropdown-item" >Login</NavLink>
                                        <NavLink to="/logout" className="dropdown-item" >Logout</NavLink>
                                    </div>
                                </li> */}
                                <li className="nav-item active">
                                    <form className="form-inline my-2 my-lg-0">
                                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                        <button className="btn App-button-secondary my-2 my-sm-0" type="submit">Search</button>
                                    </form>
                                </li>
                            </ul>


                            <ul className="navbar-nav d-flex justify-content-end align-items-center">
                                {loggedIn && <li className="nav-item"><NavLink exact to={`/profile/${userId}`} className="nav-link text-white fas fa-user" > {userService.getUsername()}</NavLink></li>}



                                {loggedIn && <li className="nav-item"><NavLink exact to="/frends" className="nav-link text-white" >Find friends!</NavLink></li>}

                                {loggedIn && <li className="nav-item"><NavLink exact to="#" className="nav-link text-white" onClick={onLogout} >Logout</NavLink></li>}

                                {/* {loggedIn && <li className="nav-item">
                            
                                    <NavLink exact to="javascript:void(0)" style={{ margin: 20, color: 'white' }} onClick={onLogout}>Logout</NavLink>
                                </li>} */}

                                {!loggedIn && <li className="nav-item">
                                    <NavLink exact to="/login" className="nav-link text-white" >Login</NavLink>
                                </li>}

                                {!loggedIn && <li className="nav-item">
                                    <NavLink exact to="/register" className="nav-link text-white" >Register</NavLink>
                                </li>}


                            </ul>
                        </div>
                    </nav>
                </div>
            </div >
        );

    }
}