import React ,{ Component} from 'react';
import observer from '../../infrastructure/observer';
import '../../styles/notifications.css'

const DEFAULT_STATE = {
    message: '',
    success: '',
    error: '',
    loading: '',
    display: 'none'
}

export default class Notifications extends Component {
    constructor(props) {
        super(props)

        this.state = DEFAULT_STATE

        observer.subscribe(observer.events.notification, this.showNotification)
    }

    showNotification = (data) => {
        debugger;
        this.setState(DEFAULT_STATE)
        let message = data.message
        let type = data.type
        this.notificationTimeout()
        this.setState({ [type]: type, message: message, display: 'inline-block' })
    }

    hideNotification = (event) => this.setState(DEFAULT_STATE)

    componentWillUnmount = () => {
        this.clearTimer();
    };

    notificationTimeout = () => {
        this.timerHandle = setTimeout(() => {
            this.setState({ display: 'none' })
        }, 5000)
    }

    clearTimer = () => {
        if (this.timerHandle) {
            clearTimeout(this.timerHandle);
        }
    }

    render = () => {
        console.log('render notification')

        let notificationId;
        let caption;

        if (this.state.success) {
            notificationId = 'infoBox';
            caption = '';
        } else if (this.state.error) {
            notificationId = 'errorBox'
        } else if (this.state.loading) {
            notificationId = 'loadingBox'
        }

        if (this.state.message) {
            // return (<div id={notificationId} className="notification-container" style={{ display: this.state.display }}>
            return (<div id={notificationId} className="notification-container" style={{ display: this.state.display }}>
                <div>{'Error!'}</div>
                <div>{this.state.message}</div>
            </div>)
        } else {
            return null
        }
    }
}