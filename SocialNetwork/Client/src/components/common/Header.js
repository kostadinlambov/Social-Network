import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import '../../styles/Header.css'
import observer from '../../infrastructure/observer'

export default class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {username: ''}

        observer.subscribe(observer.events.loginUser, this.userLoggedIn)
    }

    userLoggedIn = (username => {
        this.setState({username})
    })

    render() {
        return (
            <div className="custom-header-container">
                <div className="container ">
                    {/* <div className="custom-header-container"> */}
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <NavLink  exact to="/" className="navbar-brand text-white">Social Network</NavLink>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <NavLink  exact to="/" className="nav-link text-white" >Home<span className="sr-only">(current)</span></NavLink>
                                </li>
                                {/* <li className="nav-item">
                                <a className="nav-link text-white" href="#">Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">Pricing</a>
                            </li> */}
                                <li className="nav-item dropdown text-white">
                                    <NavLink  to="#" className="nav-link dropdown-toggle text-white" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Dropdown link</NavLink>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <NavLink exact to="/register" className="dropdown-item" >Register</NavLink>
                                        <NavLink  to="/login" className="dropdown-item" >Login</NavLink>
                                        <NavLink  to="/logout" className="dropdown-item" >Logout</NavLink>
                                    </div>
                                </li>
                            </ul>


                        </div>
                        <ul className="navbar-nav d-flex justify-content-end align-items-center">
                            <li className="nav-item">
                                <NavLink  exact to="/register" className="nav-link text-white" >Register</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink  exact to="/login" className="nav-link text-white" >Login</NavLink>
                            </li>

                        </ul>
                    </nav>
                </div>
            </div>
        );

    }
}