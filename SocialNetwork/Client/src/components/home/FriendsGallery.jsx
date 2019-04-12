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
                    <NavLink className="friends " exact to={`/home/friends/${props.id}`}>
                        <h3 className="aside-article-title" style={{ color: ' #333' }}>
                            Friends &bull; {props.friendsArr.length}
                        </h3>
                    </NavLink>
                </div>
                <hr className="my-2 mb-3 mt-2 col-md-10 mx-auto" />
                <ul className="aside-article-gallery ">
                    {props.friendsArr.map(friend => {
                        const profilePicUrl = friend.profilePicUrl || placeholder_user_image
                        const imageClassName = userService.getImageSize(profilePicUrl, true);
                        // const userNames = userService.formatUsername(friend.firstName, friend.lastName, 2);
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

