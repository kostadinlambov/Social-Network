import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { userService } from '../../infrastructure'
import default_background_image from '../../assets/images/default-background-image.jpg'
import placeholder_user_image from '../../assets/images/placeholder-profile-male.jpg'

const FriendChatBox = (props) => {

    // if (!this.state.ready) {
    //     return null;
    // }

    const {id,  firstName, lastName } = props;

    const profilePicUrl = props.profilePicUrl || placeholder_user_image

    let imgClassName = '';
    if (profilePicUrl) {
        imgClassName = userService.getImageSize(profilePicUrl);
    }

    console.log('FriendChatBox props: ', props)

    return (
        <div className="messagebox-friend-container" onClick={(e) => props.showUserChatBox(id, firstName, lastName, profilePicUrl, e )}>
            <div className="messagebox-friend-image">
                <img className={imgClassName} src={profilePicUrl} alt="profilePic" />
            </div>
            <div className="messagebox-username-container" >
                <p className="messagebox-username">{firstName} {lastName} </p>
            </div>
        </div>
    )
}

export default FriendChatBox;

