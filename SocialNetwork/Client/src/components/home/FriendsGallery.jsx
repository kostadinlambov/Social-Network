import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import fryPic from '../../assets/images/Friends/PhilipJFry.jpg';
import leelaPic from '../../assets/images/Friends/Leela.jpg';
import amyPic from '../../assets/images/Friends/Amy-Wong.png';
import zappPic from '../../assets/images/Friends/Captian_Zapp_Branigan_1.jpg';
import hermesPic from '../../assets/images/Friends/Hermes_Conrad_1.jpg';
import zoidbergPic from '../../assets/images/Friends/John_Zoidberg_1.png';
import kifgPic from '../../assets/images/Friends/Kif_Kroker_2.jpg';
import farnsworthPic from '../../assets/images/Friends/Professor-Farnsworth_1.jpg';
import niblerthPic from '../../assets/images/Friends/Nibbler_1.jpg';

const FriendsGallery = (props) => {

    return (
        <Fragment >
            <article className="aside-article-friends">
                <div className="aside-article-header">
                    <div className="aside-article-icon">
                        <i className="fas fa-user-friends"></i>
                    </div>
                    <h3 className="aside-article-title">Friends &bull; 80496</h3>
                </div>
                <ul className="aside-article-gallery ">
                    <li>
                        <NavLink to="#"><img className="l" src={fryPic} alt="" /></NavLink>
                        <div className="img-details"><p className="user-name">Philip J. Fry</p> </div>
                    </li>
                    <li>
                        <NavLink to="#"><img src={leelaPic} alt="" /></NavLink>
                        <div className="img-details"><p className="user-name">Turanga Leela</p> </div>
                    </li>
                    <li>
                        <NavLink to="#"><img src={amyPic} alt="" /></NavLink>
                        <div className="img-details"><p className="user-name">Amy Wong</p> </div>
                    </li>
                    <li>
                        <NavLink to="#"><img src={zappPic} alt="" /></NavLink>
                        <div className="img-details"><p className="user-name">Zapp Brannigan</p> </div>
                    </li>
                    <li>
                        <NavLink to="#"><img className="l" src={hermesPic} alt="" /></NavLink>
                        <div className="img-details"><p className="user-name">Hermes Conrad</p> </div>
                    </li>
                    <li>
                        <NavLink to="#"><img src={zoidbergPic} alt="" /></NavLink>
                        <div className="img-details"><p className="user-name">Dr. John A. Zoidberg</p> </div>
                    </li>
                    <li>
                        <NavLink to="#"><img className="l" src={kifgPic} alt="" /></NavLink>
                        <div className="img-details"><p className="user-name">Kif Kroker</p> </div>
                    </li>
                    <li>
                        <NavLink to="#"><img src={farnsworthPic} alt="" /></NavLink>
                        <div className="img-details"><p className="user-name">Professor Farnsworth</p> </div>
                    </li>
                    <li>
                        <NavLink to="#"><img className="l" src={niblerthPic} alt="" /></NavLink>
                        <div className="img-details"><p className="user-name">Nibbler</p> </div>
                    </li>
                </ul>

            </article>
        </Fragment>
    )
}

export default FriendsGallery;