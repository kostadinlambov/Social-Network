import React, { Fragment } from 'react';
import { userService } from '../../infrastructure'
import benderPic from '../..//assets/images/Bender/Bender_1.jpeg';
import fryPic from '../..//assets/images/Friends/PhilipJFry.jpg';
import leelaPic from '../..//assets/images/Friends/Leela.jpg';
import futuramaPic from '../..//assets/images/Futurama.jpg';


const Post = (props) => {
    const imageClass = userService.getImageSize(props.imageUrl);
    const imageClassUserPick = userService.getImageSize(props.loggedInUserProfilePicUrl);
    const isRoot = userService.isRoot();
    const isTheCurrentLoggedInUser = (props.userId === userService.getUserId());
    // props.imageUrl = fryPic;

    return (

        <Fragment>

            <div className="post-content-article-header ">
                <div className="post-content-article-image">
                    <img className={imageClassUserPick} src={props.loggedInUserProfilePicUrl} alt="bender" />
                </div>
                <div className="post-content-article-description">
                    <p className="post-user-info">{props.loggedInUserFirstName} {props.loggedInUserLastName} <span className="post-user-info-span">shared a</span> link</p>
                    <p className="post-description"> {props.time} Feb 27 18:40 PM &bull; via Instagram</p>
                </div>
            </div>
            <div className="post-content">
                <p className="">{props.content} </p>
            </div>

            {props.imageUrl && <div className="post-media">
                <img className={imageClass} src={props.imageUrl} alt="Futurama" />
            </div>}

            <div className="post-footer">
                <div className="post-left-side-icons-container">
                    <ul>
                        <li>
                            <i className="fas fa-thumbs-up"></i>
                        </li>
                        <li>
                            <i className="fas fa-share"></i>
                        </li>
                    </ul>
                </div>
                <div className="post-right-side-icons-container">
                    <div className="comment-icon">
                        <i className="fas fa-comments"></i>
                    </div>
                    <p>{props.likeCount}</p>
                </div>
            </div>

        </Fragment>

    )
}

export default Post