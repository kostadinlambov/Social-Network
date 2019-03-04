import React, { Component } from 'react';
import './BindingForm.css'

class BindingForm extends Component {
    componentWillMount() {
        this.props.children.forEach(child => {
            if (child.type === 'input' && child.props.type !== 'submit') {
                this.setState({ [child.props.name]: null })
            }
        })
    }

    handleChangeEvent(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <section className="wrapper">
                <form  onSubmit={(e) => this.props.onSubmit(e, this.state)}>
                    {React.Children.map(this.props.children, child => {
                        if (child.type === 'input' && child.props.type !== 'submit') {
                            //   return  <span onChange={this.handleChangeEvent}>{child}</span>
                            return React.cloneElement(child, { onChange: this.handleChangeEvent.bind(this), ...child.props })
                        }

                        return child;
                    })}
                </form>
            </section>
        )
    }
}

export default BindingForm;

