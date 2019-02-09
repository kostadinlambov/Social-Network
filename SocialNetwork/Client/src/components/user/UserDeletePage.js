import React, { Component } from 'react'
import { userService, requester } from '../../infrastructure';
import {withRootAuthorization} from '../../hocs/withAuthorization'


 class UserDeletePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            city: '',
        }


    }

    onSubmitHandlerDelete = (e) => {
        e.preventDefault();
        console.log(this.state.id)
        debugger;

        // requester.post('/users/delete/' + this.state.id, {}, (response) => {
        //     debugger
        //     if (response.success === true) {

        //         // observer.trigger(observer.events.loginUser, res.username)
        //         // observer.trigger(observer.events.notification, { type: 'success', message: response.message })


        //         this.setState({ fireRedirect: true })
        //     } else {
        //         // observer.trigger(observer.events.notification, { type: 'error', message: response.message });
        //     }
        // })
    }


    // static propTypes = {
    //     match: PropTypes.object.isRequired,
    //     location: PropTypes.object.isRequired,
    //     history: PropTypes.object.isRequired
    //   }

    render() {
        const { match, location, history } = this.props
        console.log('match: ', match);
        console.log('location: ', location);
        console.log('history: ', history);
        debugger;

        return (
            <div>{location.pathname}</div>
        )
    }
}

export default withRootAuthorization(UserDeletePage)
