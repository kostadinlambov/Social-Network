import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom'


export default class ProfilePage extends Component {







    render() {

        return (

            <Fragment>
                <h1>Hello from Profile Page!</h1>

                <div className="text-center">
                <NavLink
                    className="btn App-button-primary btn-lg m-3"
                    to="/"
                    role="button">
                    Home
                </NavLink>
                </div>

            </Fragment>
        )
    }
}