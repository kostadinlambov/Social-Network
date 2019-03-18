import React, { Fragment } from 'react';
import { userService } from '../../infrastructure';
import './css/Comment.css'

const Comment = (props) => {
    const imageClass = userService.getImageSize(props.imageUrl);
    const imageClassUserPick = userService.getImageSize(props.loggedInUserProfilePicUrl);

    let isRoot = userService.isRoot();
    let isCommentCreator = (props.creatorId === userService.getUserId());
    let isTimeLineUser = (props.currentTimelineUserId === userService.getUserId());

    const dayTime = props.time.hour <= 12 ? 'AM' : 'PM';
    const month = props.time.month.substring(0, 1) + props.time.month.substring(1, 5).toLowerCase()
    const hour = props.time.hour < 10 ? '0' + props.time.hour : props.time.hour;
    const minute = props.time.minute < 10 ? '0' + props.time.minute : props.time.minute;

    return (
        <Fragment>
            <div className="" id="container">
                <div className="main-article-comments-container">
                    <div className="post-content-article-image">
                        <img className={imageClassUserPick} src={props.creatorProfilePicUrl} alt="creatorPic" />
                    </div>
                    <div className="main-article-shared-content-description">
                        <p className="content"><span >{props.creatorFirstName} {props.creatorLastName}</span> {props.content} </p>
                        {/* <hr className="my-2 mb-2 mt-2 col-md-11 mx-auto" /> */}
                        <div className="comment-info">
                            {/* <p class="user-info"> {props.creatorFirstName} {props.creatorLastName}</p> */}
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