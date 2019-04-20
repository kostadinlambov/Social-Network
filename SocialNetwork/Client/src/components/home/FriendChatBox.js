import React from 'react';
import { userService } from '../../infrastructure';
import placeholder_user_image from '../../assets/images/placeholder.png';

const FriendChatBox = (props) => {
    const { id, firstName, lastName , online} = props;

    const profilePicUrl = props.profilePicUrl || placeholder_user_image

    let imgClassName = '';
    if (profilePicUrl) {
        imgClassName = userService.getImageSize(profilePicUrl);
    }

    let userNameFormatted = userService.formatUsername(firstName, lastName, 21);

    let onlineStatusClass = online ? 'online-status' : 'offline-status'

    return (
        <div className="messagebox-friend-container" onClick={(e) => props.showUserChatBox({id, firstName, lastName, profilePicUrl}, e)}>
            <i className={`fas fa-circle ${onlineStatusClass}`}></i>
            <div className="messagebox-friend-image">
                <img className={imgClassName} src={profilePicUrl} alt="profilePic" />
            </div>
            <div className="messagebox-username-container" >
                <p className="messagebox-username">{userNameFormatted} </p>
            </div>
        </div>
    )
}

export default FriendChatBox;

