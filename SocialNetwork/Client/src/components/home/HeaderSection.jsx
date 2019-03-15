import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import userService from '../../infrastructure/userService'
import placeholder_user_image from '../../assets/images/placeholder-profile-male.jpg'
import default_background_image from '../../assets/images/default-background-image.jpg'


const HeaderSection = (props) => {
    console.log('HeaderSection props: ', props)
    console.log('props.profilePicUrl :', props.profilePicUrl)

    const profilePicUrl = props.profilePicUrl || placeholder_user_image;
    const backgroundImageUrl = props.backgroundImageUrl || default_background_image
    console.log('profilePicUrl :', profilePicUrl)
    let imgClassName = '';

    if(props.profilePicUrl){
       imgClassName = userService.getImageSize(profilePicUrl);
    }

    return (
        <Fragment >
            <header className="site-header">
                <section className="header-section" style={{'backgroundImage': `url(${backgroundImageUrl})`}}>
                    <div className="header-container">
                        <span className="img-container">
                            <img className={imgClassName}  src={profilePicUrl} alt="Profile pic" />
                        </span>
                        <div className="header-content">
                            <h2 className="text-shadow" >{`${props.firstName} ${props.lastName}`}</h2>
                            <div className="header-button-container">
                                <button className="button update-info">
                                    <NavLink to={`/home/profile/${props.id}`}>UPDATE INFO</NavLink>
                                </button>
                                <button className="button view-activity">
                                    <NavLink to={`/home/comments/${props.id}`}>VIEW ACTIVITY</NavLink>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </header>
        </Fragment>
    )
}

export default HeaderSection;



