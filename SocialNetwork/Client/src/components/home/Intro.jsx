import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const Intro = (props) => {
    return (
        <Fragment >
            <article className="aside-article-intro">
                <div className="aside-article-header">
                    <div className="aside-article-icon">
                        <i className="fas fa-globe-asia"></i>
                    </div>
                    <h3 className="aside-article-title">Intro</h3>
                </div>
                <hr className="my-2 mb-3 mt-2 col-md-10 mx-auto" />
                <div className="aside-intro-content">
                    <h4 className="occupation">{props.firstName} {props.lastName}</h4>
                    <p>Lives at {props.address},  in {props.city}.</p>
                    <p>From {props.city}.</p>
                </div>

                <button className="button update-info">
                    <NavLink className="about  " exact to={`/home/profile/${props.id}`}>UPDATE INFO</NavLink>
                </button>
            </article>
        </Fragment>
    )
}

export default Intro;