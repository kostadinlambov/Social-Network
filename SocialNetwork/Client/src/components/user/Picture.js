import React from 'react';
import {userService} from '../../infrastructure'


const Picture = (props) => {
   const imageClass =  userService.getImageSize(props.imageUrl);

    return (

        <li>
            <article className="card">
                <div className="media">
                    <img className={imageClass} src={props.imageUrl} alt="pic1" />
                </div>
                {/* <div className="content">
                                <h3 className="card-title">Philip J. Fry</h3>
                                <p></p>
                </div> */}
            </article>
        </li>
    )
}

export default Picture