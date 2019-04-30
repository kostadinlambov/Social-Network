import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { userService } from '../../infrastructure';
import placeholder_user_image from '../../assets/images/placeholder.png';

const FriendsGallery = (props) => {
    return (
        <Fragment >
            <article className="aside-article-friends">
                <div className="aside-article-header">
                    <div className="aside-article-icon">
                        <i className="fas fa-user-friends"></i>
                    </div>
                    <NavLink className="friends " exact to={`/home/friends/${props.timeLineUserId}`}>
                        <h3 className="aside-article-title" style={{ color: ' #333' }}>
                            Friends &bull; {props.friendsArr.length}
                        </h3>
                    </NavLink>
                </div>
                <div className="hr-styles" style={{'width': '90%'}}></div>
                <ul className="aside-article-gallery ">
                    {props.friendsArr.map(friend => {
                        const profilePicUrl = friend.profilePicUrl || placeholder_user_image
                        const imageClassName = userService.getImageSize(profilePicUrl);
                        let formattedUsername = '';
                        if(friend.firstName.length > 10){
                            formattedUsername = userService.formatUsername(friend.firstName,'', 10)
                        }else{
                             formattedUsername = userService.formatUsername(friend.firstName, friend.lastName, 15)
                        }
                        return (
                            <li key={friend.id}>
                                <NavLink to="#"><img className={imageClassName} src={profilePicUrl} alt="Pic" /></NavLink>
                                <div className="img-details"><p className="user-name">{formattedUsername}</p> </div>
                            </li>)
                    })}
                </ul>
            </article>
        </Fragment>
    )
}

export default FriendsGallery;

