import React from 'react';
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
    )
}

export default Button;