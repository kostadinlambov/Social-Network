import React from 'react';
import { userService } from '../../infrastructure'


const Picture = (props) => {
    const imageClass = userService.getImageSize(props.imageUrl);

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
                    <button className="">
                        <div className="fbPhotoCurationControl inner uiButtonGroup " ><i class="far fa-trash-alt "></i></div>
                    </button>
                </article>
            </div>



        </li>
    )
}

export default Picture