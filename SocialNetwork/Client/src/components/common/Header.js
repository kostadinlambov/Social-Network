import React, { Component } from 'react';
import '../../styles/Header.css'

export default class Header extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div className="custom-header-container">
                <div className="container ">
                    {/* <div className="custom-header-container"> */}
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <a className="navbar-brand text-white" href="/">Social Network</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <a className="nav-link text-white" href="/">Home<span className="sr-only">(current)</span></a>
                                </li>
                                {/* <li className="nav-item">
                                <a className="nav-link text-white" href="#">Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">Pricing</a>
                            </li> */}
                                <li className="nav-item dropdown text-white">
                                    <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Dropdown link</a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <a className="dropdown-item" href="/">Action</a>
                                        <a className="dropdown-item" href="/">Another action</a>
                                        <a className="dropdown-item" href="/">Something else here</a>
                                    </div>
                                </li>
                            </ul>


                        </div>
                        <ul className="navbar-nav d-flex justify-content-end align-items-center">
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/register">Register</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/login">Login</a>
                            </li>

                        </ul>
                    </nav>
                </div>
            </div>
        );

    }
}