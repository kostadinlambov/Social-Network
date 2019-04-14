import React from 'react';
import { userService } from '../../infrastructure';
import placeholder_user_image from '../../assets/images/placeholder.png';

const MessageNavBarRow = (props) => {
    const {fromUserId: id, fromUserFirstName: firstName, fromUserLastName: lastName, content, time, count } = props;
    const profilePicUrl = props.fromUserProfilePicUrl || placeholder_user_image

    let imgClassName = '';
    if (profilePicUrl) {
        imgClassName = userService.getImageSize(profilePicUrl);
    }

    let userNameFormatted = userService.formatUsername(firstName, lastName, 18);
    let contentFormatted = userService.formatUsername(content,'', 40);

    const dayTime = time.hour <= 12 ? 'AM' : 'PM';
    const month = time.month.substring(0, 1) + time.month.substring(1, 5).toLowerCase()
    const hour = time.hour < 10 ? '0' + time.hour : time.hour;
    const minute = time.minute < 10 ? '0' + time.minute : time.minute;

    return (
        <div className="messagebox-navbar-friend-container" onMouseDown={(e) => props.triggerMessageLoad(id, firstName, lastName, profilePicUrl, e)}>
            <div className="messagebox-navbar-friend-image">
                <img className={imgClassName} src={profilePicUrl} alt="profilePic" />
            </div>
            <div className="messagebox-navbar-username-container" >
                <div className="message-wrapper">
                    <p className="messagebox-navbar-username">{userNameFormatted} <span>({count})</span> </p>
                    <p className="message-navbar-time"> {time.dayOfMonth} {month} {hour}:{minute} {dayTime}</p>
                </div>
                <p className="message-navbar-content">{contentFormatted}</p>
            </div>
        </div>
    )
}

export default MessageNavBarRow;

