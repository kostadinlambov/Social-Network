import React from 'react';
import { NavLink } from 'react-router-dom';
// import './css/TimeLine.css';

const TimeLine = (props) => {
    debugger;
    console.log('TimeLine props :', props)
    return (
        <article className="main-article-header">
            <nav>
                <ul>
                    <li>
                        <NavLink className="timeline " exact to={`/home/${props.userId}`}>
                            <i className="fas fa-video"></i>
                            <div className="">TIMELINE</div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="about  " exact to={`/profile/${props.userId}`}>
                            <i className="fas fa-info-circle"></i>
                            <div>PROFILE</div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="friends " exact to={`/friends/${props.userId}`}>
                            <i className="fas fa-user-friends"></i>
                            <div>FRIENDS</div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="photos " exact to={`/gallery/${props.userId}`}>
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