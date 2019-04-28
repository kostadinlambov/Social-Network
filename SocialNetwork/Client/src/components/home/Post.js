import React, { Fragment } from 'react';
import { userService } from '../../infrastructure';
import Comment from './Comment';

const Post = (props) => {
    const imageClass = userService.getImageSize(props.imageUrl);
    const imageClassUserPick = userService.getImageSize(props.loggedInUserProfilePicUrl);

    let isRoot = userService.isRoot();
    let isPostCreator = (props.loggedInUserId === props.currentLoggedInUserId);
    let isTimeLineUser = (props.timelineUserId === props.currentLoggedInUserId);

    const dayTime = props.time.hour <= 12 ? 'AM' : 'PM';
    const month = props.time.month.substring(0, 1) + props.time.month.substring(1, 5).toLowerCase()
    const hour = props.time.hour < 10 ? '0' + props.time.hour : props.time.hour;
    const minute = props.time.minute < 10 ? '0' + props.time.minute : props.time.minute;

    const formattedName = userService.formatUsername(props.loggedInUserFirstName, props.loggedInUserLastName);

    return (
        <Fragment>
            <div className="post-wrapper" id="container">
                <div className="post-content-article-header ">
                    <div className="post-content-article-image">
                        <img className={imageClassUserPick} src={props.loggedInUserProfilePicUrl} alt="bender" />
                    </div>
                    <div className="post-content-article-description">
                        <p className="post-user-info">{formattedName} </p>
                        <p className="post-description"> {props.time.dayOfMonth} {month} {hour}:{minute} {dayTime}</p>
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
                            <li className="like-icon">
                                <div className="like-button" onClick={props.addLike.bind(this, props.postId)}> <i className="fas fa-thumbs-up"></i></div>
                            </li>
                            <li className="like-count">
                                <div >{props.likeCount}</div>
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
                        <p>{props.commentList.length}</p>
                    </div>
                </div>

                {(isRoot || isPostCreator || isTimeLineUser) && <div onClick={props.removePost.bind(this, props.postId)}>
                    <div className="btn uiButtonGroup fbPhotoCurationControl  delete-button" ><i className="far fa-trash-alt "></i></div>
                </div>}
            </div>

            <div className="comment-wrapper" id="comment-container">
                {props.commentList.map((comment) =>
                    <Comment
                        key={comment.commentId}
                        addLikeComment={props.addLikeComment}
                        removeComment={props.removeComment}
                        timelineUserId={props.timelineUserId}
                        currentLoggedInUserId={props.currentLoggedInUserId}
                        {...comment}
                    />)}
            </div>
        </Fragment>
    )
}

export default Post