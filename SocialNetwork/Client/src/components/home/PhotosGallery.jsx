import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import benderPic from '../../assets/images/Bender/Bender_1.jpeg';
import benderPic_11 from '../../assets/images/Bender/Bender_11.jpg';
import benderPic_4 from '../../assets/images/Bender/Bender_4.jpg';
import benderPic_5 from '../../assets/images/Bender/Bender_5.jpg';
import benderPic_10 from '../../assets/images/Bender/Bendder_10.jpg';
import benderPic_7 from '../../assets/images/Bender/Bender_7.jpg';
import benderPic_8 from '../../assets/images/Bender/Bender_8.jpg';
import benderPic_9 from '../../assets/images/Bender/Bender_9.jpg';

const PhotoGallery = (props) => {
    return (
        <Fragment >
            <article className="aside-article-photos">
                <div className="aside-article-header">
                    <div className="aside-article-icon">
                        <i className="fas fa-images"></i>
                    </div>
                    <h3 className="aside-article-title">Photos</h3>
                </div>
                <ul className="aside-article-gallery bender-photos">
                    <li><NavLink className="zoom" to=""><img className="l" src={benderPic} alt="" /></NavLink></li>
                    <li><NavLink className="zoom" to=""><img className="l" src={benderPic_11} alt="" /></NavLink></li>
                    <li><NavLink className="zoom" to=""><img src={benderPic_4} alt="" /></NavLink></li>
                    <li><NavLink className="zoom" to=""><img className="l" src={benderPic_5} alt="" /></NavLink></li>
                    <li><NavLink className="zoom" to=""><img className="l" src={benderPic_4} alt="" /></NavLink></li>
                    <li><NavLink className="zoom" to=""><img className="l" src={benderPic_10} alt="" /></NavLink></li>
                    <li><NavLink className="zoom" to=""><img className="l" src={benderPic_7} alt="" /></NavLink></li>
                    <li><NavLink className="zoom" to=""><img className="l" src={benderPic_8} alt="" /></NavLink></li>
                    <li><NavLink className="zoom" to=""><img className="l" src={benderPic_9} alt="" /></NavLink></li>
                </ul>
            </article>
        </Fragment>
    )
}

export default PhotoGallery;