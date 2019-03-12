import React, { Component } from 'react';
import {NavLink } from 'react-router-dom';
import userService from '../../infrastructure/userService';

export default class StartPage extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
  
    render() {
        const isAdmin = userService.isAdmin();
        const isRoot = userService.isRoot();
        const currentUserId = userService.getUserId();
        let StartPageView;

        if (!localStorage.getItem('token')) {
            StartPageView = (
                <div className="jumbotron bg-light text-dark text-center mb-0 mt-5">
                    <h2 className="h1 h1-responsive">Welcome to SoftUni Social Network!</h2>
                    <hr className="my-2 mb-3 mt-3 col-md-8 mx-auto"></hr>
                    <p className="lead">Please <NavLink className="text-info" exact to="/login">Login</NavLink> or <NavLink className="text-info" exact to="/register">Register</NavLink> if you don't have an account.</p>
                    <hr className="my-2 mb-3 mt-3 col-md-8 mx-auto"></hr>
                    <p className="lead">
                        <NavLink className="btn App-button-primary btn-lg m-3" to="/login" role="button">Login</NavLink>
                        <NavLink className="btn App-button-primary btn-lg m-3" to="/register" role="button">Register</NavLink>
                    </p>
                </div>
            )
        } else {
            StartPageView = (
                <div>
                    <div className="container text-center ">
                        <div className="jumbotron bg-light text-dark text-center mb-0 mt-5">
                            <h3 className="md-display-5 h3 h3-responsive mb-3">Hello {userService.getUsername()}!</h3>
                            <hr className="my-2 mb-3 mt-3 col-md-8 mx-auto"></hr>
                            <h2 className="h1 h1-responsive">Welcome to SoftUni Social Network!</h2>
                            <hr className="my-2 mb-3 mt-3 col-md-8 mx-auto"></hr>
                            <p className="lead">
                                <NavLink className="btn App-button-primary btn-lg m-3" to={`/home/comments/${currentUserId}`} role="button">Home</NavLink>
                                <NavLink className="btn App-button-primary btn-lg m-3" to={`/home/profile/${currentUserId}`} role="button">Profile</NavLink>
                                {(isAdmin || isRoot) && <NavLink className="btn App-button-primary btn-lg m-3" to={`/home/users/all/${userService.getUserId()}`} role="button">All Users</NavLink>}
                            </p>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="container text-center pt-5">
                {StartPageView}
            </div>

        )
    }

}