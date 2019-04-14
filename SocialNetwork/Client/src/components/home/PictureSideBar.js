import React from 'react';
import { userService } from '../../infrastructure'

const PictureSideBar = (props) => {
    const imageClass = userService.getImageSize(props.imageUrl);

    return (
        <li>
            <div className="zoom" >
                <img className={imageClass} src={props.imageUrl} alt="" />
            </div>
        </li>
    )
}

export default PictureSideBar