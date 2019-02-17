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
                <div className="aside-intro-content">
                    <h4 className="occupation">Robot</h4>
                    <p>Lives in Apartment 00100100, Robot Arms Apartments, in New New York, Earth.</p>
                    <p>From Tijuana, Mexico.</p>
                </div>

                <button className="button update-info">
                    <NavLink className="about  " exact to={`/profile/${props.userId}`}>UPDATE INFO</NavLink>
                </button>
                {/* <!-- <div className="aside-intro-update">
                 <a className="active" href="{{ site.baseurl }}/about">UPDATE INFO</a>
                 </div> --> */}
            </article>
        </Fragment>
    )
}

export default Intro;