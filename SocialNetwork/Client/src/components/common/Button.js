import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

const Button = (props ) => {

    const { buttonClass, url, text} = props;
    return (
        <NavLink
            className={buttonClass}
            to={url}
            role="button">
            {text}
        </NavLink>
        // <button
        // className={this.props.class}
        // onClick={this.goBack}>
        //     {this.props.text}
        // </button>
    )

}

export default Button;