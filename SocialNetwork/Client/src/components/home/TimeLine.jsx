import React from 'react';
import { NavLink } from 'react-router-dom';

const TimeLine = (props) => {
    return (
        <article className="main-article-header">
            <nav>
                <ul>
                    <li>
                        <NavLink className="timeline " exact to={`/home/comments/${props.id}`}>
                            <i className="fas fa-video"></i>
                            <div className="">TIMELINE</div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="about  " exact to={`/home/profile/${props.id}`}>
                            <i className="fas fa-info-circle"></i>
                            <div>PROFILE</div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="friends " exact to={`/home/friends/${props.id}`}>
                            <i className="fas fa-user-friends"></i>
                            <div>FRIENDS</div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="photos " exact to={`/home/gallery/${props.id}`}>
                            <i className="fas fa-camera-retro"></i>
                            <div>PHOTOS</div>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </article>
    )
}

export default TimeLine;