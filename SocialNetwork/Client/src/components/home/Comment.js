import React, { Fragment } from 'react';
import { userService } from '../../infrastructure';
import './css/Comment.css'

const Comment = (props) => {
    const imageClass = userService.getImageSize(props.imageUrl);
    const imageClassUserPick = userService.getImageSize(props.loggedInUserProfilePicUrl);

    let isRoot = userService.isRoot();
    let isCommentCreator = (props.creatorId === props.currentLoggedInUserId);
    let isTimeLineUser = (props.timelineUserId === props.currentLoggedInUserId);

    const dayTime = props.time.hour <= 12 ? 'AM' : 'PM';
    const month = props.time.month.substring(0, 1) + props.time.month.substring(1, 5).toLowerCase()
    const hour = props.time.hour < 10 ? '0' + props.time.hour : props.time.hour;
    const minute = props.time.minute < 10 ? '0' + props.time.minute : props.time.minute;

    const creatorFormattedName = userService.formatUsername(props.creatorFirstName,props.creatorLastName )

    return (
        <Fragment>
            <div className="" id="container">
                <div className="main-article-comments-container">
                    <div className="post-content-article-image">
                        <img className={imageClassUserPick} src={props.creatorProfilePicUrl} alt="creatorPic" />
                    </div>
                    <div className="main-article-shared-content-description">
                        <p className="content"><span >{creatorFormattedName}</span> {props.content} </p>
                        <div className="comment-info">
                            <p className="description"> {props.time.dayOfMonth} {month} {hour}:{minute} {dayTime}</p>
                        </div>
                    </div>
                </div>

                {props.imageUrl && <div className="post-media">
                    <img className={imageClass} src={props.imageUrl} alt="Futurama" />
                </div>}

                {(isRoot || isCommentCreator || isTimeLineUser) && <div onClick={props.removeComment.bind(this, props.commentId)}>
                    <div className="btn uiButtonGroup fbPhotoCurationControl  delete-button" ><i className="far fa-trash-alt "></i></div>
                </div>}
            </div>
        </Fragment>
    )
}

export default Comment