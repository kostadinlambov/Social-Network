import React, { Component } from 'react';

export default {
    successToast: ({ text, closeToast }) => {

        return (
            // <div >
            //     <i className="fas fa-check mr-1"></i>
            //     {text}
            // </div>
            <div className="d-flex justify-content-start align-items-center" >
                <div style={{ 'fontSize': '25px' }}>
                    <i className="fas fa-check"></i>
                </div>
                <div className="ml-3">
                    {/* <div className="font-weight-bold">Success!</div> */}
                    <div>{text}</div>
                </div>
            </div>
        )
    },

    errorToast: ({ text, closeToast }) => {

        return (
            <div className="d-flex justify-content-start align-items-center">
                <div style={{ 'fontSize': '25px' }}>
                    <i className="fas fa-exclamation-triangle"></i>
                </div>
                <div className="ml-3">
                    <div className="font-weight-bold">Error!</div>
                    <div>{text}</div>
                </div>
            </div>
        )
    },

    infoToast: ({ text, closeToast }) => {

        return (
            <div className="d-flex justify-content-start align-items-center">
                <div style={{ 'fontSize': '25px' }}>
                    <i class="fas fa-info-circle"></i>
                </div>
                <div className="ml-3">
                    {/* <div className="font-weight-bold">Info!</div> */}
                    <div>{text}</div>
                </div>
            </div>
        )
    }
};



