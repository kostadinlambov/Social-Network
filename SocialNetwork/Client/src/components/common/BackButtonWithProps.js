import React, {Component} from  'react';

export default class BackButton extends Component {
    constructor(props){
        super(props)
        this.goBack = this.goBack.bind(this)
    }

    goBack() {
        this.props.history.goBack()
    }

    static contextTypes = {
        router: () => true
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