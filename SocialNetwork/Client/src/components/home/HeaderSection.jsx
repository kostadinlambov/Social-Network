import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import benderPic from '../..//assets/images/Bender/Bender_1.jpeg';
// import './css/TimeLine.css';

const HeaderSection = (props) => {

    return (
        <Fragment >
            {/* <input type="checkbox" name="main-nav-toggle" id="main-nav-toggle" /> */}
            <header className="site-header">

            

                {/* <section className="navbar-section">

                    <div className="navbar-wrapper">

                        <div className="nav-searchbar-container">
                            <div className="site-logo">
                                <NavLink to="/" >Social Network</NavLink>
                            </div>
                            <div className="nav-search-icon">
                                <NavLink to="#"><i className="fas fa-search"></i></NavLink>
                            </div>
                            <div className="nav-search-div">
                                <input type="text" className="nav-search" placeholder="Search..." />
                    </div>
                        </div>

                        <label id="toggle" htmlFor="main-nav-toggle"><span>Menu</span></label>

                        <nav className="nav-main">
                            <ul className="nav-ul">

                                <li><NavLink to="{{ site.baseurl }}/about">Bender</NavLink></li>
                                <li><NavLink to="{{ site.baseurl }}/">Home</NavLink></li>
                                <li><NavLink className="fas fa-user-friends" to="{{ site.baseurl }}/friends"></NavLink></li>
                                <li><NavLink className="fas fa-camera" to="{{ site.baseurl }}/gallery/"></NavLink></li>
                        <i ></i>
                            </ul>
                        </nav>

                    </div>
                </section> */}
                <section className="header-section">
                    <div className="header-container">
                        <span className="img-container">
                            <img src={benderPic} alt="Profile image1" />
                        </span>
                        <div className="header-content">
                            <h2>Bender Rodrigez</h2>
                            <div className="header-button-container">
                                <button className="button update-info">
                                    <NavLink to={`/home/profile/${props.userId}`}>UPDATE INFO</NavLink>
                                </button>
                                <button className="button view-activity">
                                    <NavLink to={`/home/${props.userId}`}>VIEW ACTIVITY</NavLink>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </header>
        </Fragment>
    )
}

export default HeaderSection;



