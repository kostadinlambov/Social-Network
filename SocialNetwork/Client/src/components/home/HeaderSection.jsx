import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import benderPic from '../../assets/images/Bender/Bender_1.jpeg';
import mi28coverPic from '../../assets/images/cover_MI_28_NE.jpg'
// import './css/TimeLine.css';



function getImageSize(profilePicUrl){
    debugger
    let img = new Image();
    img.src = profilePicUrl;
    console.log('this.width + x + this.height');
    console.log(img.width + 'x' + img.height);
    // alert('ImageSize: ' + img.width + 'x' + img.height)
    debugger;
    if(img.width >= img.height){
        return 'l'
    }
    return '';
}


const HeaderSection = (props) => {
    console.log('HeaderSection props: ', props)

    console.log('props.profilePicUrl :', props.profilePicUrl)

    debugger;
    
    const profilePicUrl = props.profilePicUrl || benderPic;
    const backgroundImageUrl = props.backgroundImageUrl || mi28coverPic
    console.log('profilePicUrl :', profilePicUrl)

    debugger;

    let imgClassName = '';

    if(props.profilePicUrl){
       imgClassName =  getImageSize(profilePicUrl);
    }


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
                <section className="header-section" style={{'backgroundImage': `url(${backgroundImageUrl})`}}>
                    <div className="header-container">
                        <span className="img-container">
                            {/* <img src={benderPic} alt="Profile image1" /> */}
                            <img className={imgClassName}  src={profilePicUrl} alt="Profile image1" />
                        </span>
                        <div className="header-content">
                            <h2>{`${props.firstName} ${props.lastName}`}</h2>
                            <div className="header-button-container">
                                <button className="button update-info">
                                    <NavLink to={`/home/profile/${props.id}`}>UPDATE INFO</NavLink>
                                </button>
                                <button className="button view-activity">
                                    <NavLink to={`/home/${props.id}`}>VIEW ACTIVITY</NavLink>
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



