import React from 'react';
import { userService } from '../../infrastructure'


const Picture = (props) => {
    const imageClass = userService.getImageSize(props.imageUrl);
    const isRoot = userService.isRoot();
    const isTheCurrentLoggedInUser = (props.userId === userService.getUserId());

    return (

        <li>
            <div id="container">
                <article className="card " id="contauner">
                    <div className="media">
                        <img className={imageClass} src={props.imageUrl} alt="pic1" />
                    </div>
                    {/* <div className="content">
                                <h3 className="card-title">Philip J. Fry</h3>
                                <p></p>
                </div> */}
                    {/* <div className="fbPhotoCurationControl uiButtonGroup far fa-trash-alt" id="delete-button"></div> */}
                    <div  onClick={props.removePhoto.bind(this, props.id)}>
                   { (isRoot ||  isTheCurrentLoggedInUser) &&  <div className="btn fbPhotoCurationControl inner uiButtonGroup delete-button" ><i className="far fa-trash-alt "></i></div>} 
                    </div>
                </article>
            </div>
        </li>
    )
}

export default Picture