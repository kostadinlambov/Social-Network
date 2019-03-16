import React, { Component } from 'react'


const ButtonWithClickEvent = (props) => {

    // onSubmitHandlerEdit = (e) => {
    //     debugger;
    //     const { buttonClass, url, text, ...otherProps } = this.props;
    //     // e.preventDefault();
    //     console.log(this.state.id)

    //     this.props.history.push({
    //         pathname: url + otherProps.id,
    //         state:
    //             { ...otherProps }
    //     });
    // }


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