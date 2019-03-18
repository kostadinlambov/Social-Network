import React from 'react'

const ButtonWithClickEvent = (props) => {
    const { buttonClass, text, onClick } = props;

    return (
        <button
            type="button"
            className={buttonClass}
            onClick={onClick}>
            {text}
        </button>
    )
}

export default ButtonWithClickEvent;