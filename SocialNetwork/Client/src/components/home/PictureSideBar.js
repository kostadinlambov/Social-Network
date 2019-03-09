import React from 'react';
import { userService } from '../../infrastructure'


const PictureSideBar = (props) => {
    const imageClass = userService.getImageSize(props.imageUrl, true);

    return (
        <li>
            <div className="zoom" to="">
                <img className={imageClass} src={props.imageUrl} alt="" />
            </div>
        </li>
    )
}

export default PictureSideBar