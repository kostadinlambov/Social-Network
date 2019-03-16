import React, { Component, Fragment } from 'react';
import '../App.css'


export default function withWarning(WrappedComponent) {
    return class withWarningComponent  extends Component {
        render() {
            return (
                // <h1>Hello from withLoading</h1>
                <Fragment >
                    <div className="alert">
                        <span className="alert-symbol">&#9888;</span>
                        <WrappedComponent {...this.props} />
                    </div>
                </Fragment>
            )
        }
    }
}
