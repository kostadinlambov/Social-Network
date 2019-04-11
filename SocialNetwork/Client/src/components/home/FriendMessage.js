import React from 'react';
import { userService } from '../../infrastructure';
import placeholder_user_image from '../../assets/images/placeholder.png';

import './css/Message.css';

const FriendMessage = (props) => {
    const { content, fromUserId, time} = props;
    const loggedInUserId = userService.getUserId();

    let chatContentClass = '';

    if (fromUserId === loggedInUserId) {
        chatContentClass = 'loggedInUser';
    }

    const dayTime = props.time.hour <= 12 ? 'AM' : 'PM';
    const month = props.time.month.substring(0, 1) + props.time.month.substring(1, 5).toLowerCase()
    const hour = props.time.hour < 10 ? '0' + props.time.hour : props.time.hour;
    const minute = props.time.minute < 10 ? '0' + props.time.minute : props.time.minute;

    const profilePicUrl = props.fromUserProfilePicUrl || placeholder_user_image

    let imgClassName = '';
    if (profilePicUrl) {
        imgClassName = userService.getImageSize(profilePicUrl);
    }

    return (
        <div className="message-container">
            <div className={`message-image ${chatContentClass}`}>
                <img className={imgClassName} src={profilePicUrl} alt="creatorPic" />
            </div>
            <div className={`message-description`}>
                <p className={`message-content ${chatContentClass}`}> {content} </p>
                <div className={`message-info ${chatContentClass}`}>
                    <p className="message-time"> {time.dayOfMonth} {month} {hour}:{minute} {dayTime}</p>
                </div>
            </div>
        </div>
    )
}

export default FriendMessage;

