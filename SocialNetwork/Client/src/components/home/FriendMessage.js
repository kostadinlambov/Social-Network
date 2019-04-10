import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { userService } from '../../infrastructure';
import default_background_image from '../../assets/images/default-background-image.jpg';
import placeholder_user_image from '../../assets/images/placeholder-profile-male.jpg';
import './css/Message.css';

const FriendMessage = (props) => {

    const { content, fromUserId, time } = props;

    const dayTime = props.time.hour <= 12 ? 'AM' : 'PM';
    const month = props.time.month.substring(0, 1) + props.time.month.substring(1, 5).toLowerCase()
    const hour = props.time.hour < 10 ? '0' + props.time.hour : props.time.hour;
    const minute = props.time.minute < 10 ? '0' + props.time.minute : props.time.minute;

    const profilePicUrl = props.profilePicUrl || placeholder_user_image

    let imgClassName = '';
    if (profilePicUrl) {
        imgClassName = userService.getImageSize(profilePicUrl);
    }

    console.log('Messages props: ', props)
    debugger

    return (
        // <div className="messagebox-friend-container" onClick={(e) => props.showUserChatBox(id, firstName, lastName, profilePicUrl, e )}>
        //     <div className="messagebox-friend-image">
        //         <img className={imgClassName} src={profilePicUrl} alt="profilePic" />
        //     </div>
        //     <div className="messagebox-username-container" >
        //         <p className="messagebox-username">{firstName} {lastName} </p>
        //     </div>
        // </div>

        <div className="message-container">
            <div className="message-image">
                <img className={imgClassName} src={profilePicUrl} alt="creatorPic" />
            </div>
            <div className="message-description">
                <p className="message-content"> {content} </p>
                {/* <hr className="my-2 mb-2 mt-2 col-md-11 mx-auto" /> */}
                <div className="message-info">
                    {/* <p class="user-info"> {props.creatorFirstName} {props.creatorLastName}</p> */}
                    <p className="message-time"> {time.dayOfMonth} {month} {hour}:{minute} {dayTime}</p>
                </div>
            </div>
        </div>
    )
}

export default FriendMessage;

