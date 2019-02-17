import React, { Component, Fragment } from 'react';
// import './css/Home.css'
import TimeLine from './TimeLine';
import HeaderSection from './HeaderSection';
import MainSharedContent from './MainSharedContent';
import Intro from './Intro';
import PhotoGallery from './PhotosGallery';
import FriendsGallery from './FriendsGallery';
import userService from '../../infrastructure/userService';

export default class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: ''
        }
    }

    componentWillMount() {
        const currentUserId = userService.getUserId();

        this.setState({ id: currentUserId })
    }


    render() {
        debugger;
        return (

            <Fragment>
                <HeaderSection userId={this.state.id} />

                <main className="site-content">

                    {/* <div className="container"> */}
                    <section className="main-section">

                        <TimeLine userId={this.state.id} />
                        <MainSharedContent userId={this.state.id} />

                        {/* {% include timeline_include.html class="active" %}
                    {% include main_shared_content_include.html %} */}

                    </section>

                    <section className="aside-section">
                    <Intro userId={this.state.id} />

                    <PhotoGallery userId={this.state.id} />

                    <FriendsGallery userId={this.state.id} />

                        {/* {% include intro_include.html %}
                    
                    {% include photos_include.html %}
                    
                    {% include friends_include.html %} */}

                    </section>

                    {/* </div> */}
                </main>
            </Fragment>
        );
    }
}