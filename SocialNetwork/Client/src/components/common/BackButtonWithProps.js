import React, {Component} from  'react';

export default class BackButtonWithProps extends Component {
    constructor(props){
        super(props)
        this.goBack = this.goBack.bind(this)
    }

    goBack() {
        this.props.history.goBack()
    }

    render() {
        return (
            <button
            className={this.props.class}
            onClick={this.goBack}>
                {this.props.text}
            </button>
        )
    }
}