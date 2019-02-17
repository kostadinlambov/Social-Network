import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import benderPic from '../..//assets/images/Bender/Bender_1.jpeg';
import fryPic from '../..//assets/images/Friends/PhilipJFry.jpg';
import leelaPic from '../..//assets/images/Friends/Leela.jpg';
import futuramaPic from '../..//assets/images/Futurama.jpg';
// import './css/TimeLine.css';

const MainSharedContent = (props) => {

    return (
        <Fragment >
            <article className="main-article-shared-content">

                <section className="main-article-content-section">
                    <div className="main-article-shared-content-header">
                        <div className="main-article-shared-content-image">
                            <img src={benderPic} alt="bender" />
                        </div>
                        <div className="main-article-shared-content-description">
                            <p className="user-info">Bender Rodrigez <span className="user-info-span">shared a</span> link</p>
                            <p className="description">Feb 27 18:40 PM &bull; via Instagram</p>
                        </div>
                    </div>
                    <div className="main-article-shared-media">
                        <img src={futuramaPic} alt="Futurama" />
                    </div>
                    <div className="main-article-shared-content-footer">
                        <div className="main-article-left-side-icons-container">
                            <ul>
                                <li>
                                    <i className="fas fa-thumbs-up"></i>
                                </li>
                                <li>
                                    <i className="fas fa-share"></i>
                                </li>
                            </ul>
                        </div>
                        <div className="main-article-right-side-icons-container">
                            <div className="comment-icon">
                                <i className="fas fa-comments"></i>
                            </div>
                            <p>2</p>
                        </div>
                    </div>
                </section>

                <section className="main-article-comments-section">
                    <div className="main-article-comments-container">
                        {/* <!-- <div className="comment"> --> */}
                        <div className="main-article-shared-content-image">
                            <img src={fryPic} alt="" />
                        </div>
                        <div className="main-article-shared-content-description">
                            <div className="comment-info">
                                <p className="user-info"> Philip J. Fry</p>
                                <p className="description"> 18:25 PM</p>
                            </div>
                            <p className="content">Philip J. Fry, commonly known simply by his surname Fry, is a fictional
                                character and the protagonist of the animated sitcom Futurama. He is voiced by Billy
                                West using a version of his own voice as he sounded when he was 25.[1][2] He is a
                                slacker delivery boy from the 20th century who becomes cryogenically frozen and
                                reawakens in the 30th century to become a delivery boy there with an intergalactic
                                delivery company run by his 30th great nephew, Professor Hubert J. Farnsworth. </p>
                        </div>
                        {/* <!-- </div> --> */}
                    </div>
                    <div className="main-article-comments-container">
                        {/* <!-- <div className="comment"> --> */}
                        <div className="main-article-shared-content-image">
                            <img className="l" src={leelaPic} alt="" />
                        </div>
                        <div className="main-article-shared-content-description">
                            <div className="comment-info">
                                <p className="user-info"> Turanga Leela</p>
                                <p className="description"> 11:25 AM</p>
                            </div>
                            <p className="content">Leela (full name Turanga Leela) is a fictional character from the
                                animated television series Futurama. Leela is spaceship captain, pilot, and head of all
                                aviation services on board the Planet Express Ship. Throughout the series, she has an
                                on-again, off-again relationship with and eventually marries Philip J. Fry, the central
                                character in the series and becomes the mother to Kif's offspring and in the comics
                                 only, Elena Fry.</p>
                        </div>
                        {/* <!-- </div> --> */}
                    </div>
                    <div className="write-comment">
                        <div className="comment">
                            <div className="main-article-shared-content-image">
                                <img src={benderPic} alt="" />
                            </div>
                            <div className="comment-input">
                                <input type="text" placeholder="Write a comment..." />
                            </div>
                        </div>
                    </div>
                </section>
            </article>
        </Fragment>
    )
}

export default MainSharedContent;