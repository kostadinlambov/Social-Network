import React, { Component, Fragment, lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { withRootAuthorization, withAdminAuthorization, withUserAuthorization } from '../../hocs/withAuthorization';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common'
import { requester } from '../../infrastructure/'


// import './css/Home.css'
import TimeLine from './TimeLine';
import HeaderSection from './HeaderSection';
import MainSharedContent from './MainSharedContent';
import Intro from './Intro';
import PhotoGallery from './PhotosGallery';
import FriendsGallery from './FriendsGallery';
import userService from '../../infrastructure/userService';


const UserProfilePage = lazy(() => import('../../components/user/UserProfilePage'))
const UserEditPage = lazy(() => import('../../components/user/UserEditPage'))
const UserDeletePage = lazy(() => import('../../components/user/UserDeletePage'))

const ErrorPage = lazy(() => import('../../components/common/ErrorPage'))


export default class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            profilePicUrl: '',
            backgroundImageUrl: '',
            authorities: [],
            ready: false
        }
    }

    componentDidMount() {
        const currentUserId = userService.getUserId();
        debugger;

        requester.get(`/users/details/${currentUserId}`, (userData) => {

            console.log("userData: ", userData);


            this.setState({
                ...userData, ready: true
            })
            debugger;
            console.log("this.state: ", this.state);
            debugger;

        }).catch(err => {
            console.error('deatils err:', err)
            toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
                // toast.error(<ToastComponent.errorToast text={`${error.name}: ${error.message}`} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            if(err.status === 403 && err.message === 'Your JWT token is expired. Please log in!'){
                localStorage.clear();
                this.props.history.push('/login');
            }
        })
    }



    render() {
        if(!this.state.ready){
            return <h1 className="text-center pt-5 mt-5">Loading...</h1>
        }
        debugger;
        console.log(this.props.match.url)
        const loggedIn = localStorage.getItem('token');
        debugger;
        return (
            <Fragment>
                <HeaderSection  {...this.state} />

                <main className="site-content">

                    {/* <div className="container"> */}
                    <section className="main-section">


                        <TimeLine userId={this.state.id} />

                        <Suspense fallback={<span>Loading...</span>}>
                            <Switch>
                                {loggedIn && <Route exact path="/home/:id" render={props => <MainSharedContent userId={this.state.id} {...props} />} />}
                                {/* <Route exact path={this.props.match.url + "/:id"} component={UserProfilePage} /> */}
                                {/* <Route exact path={this.props.match.url + "/profile/:id"} render={() => console.log(this.props.match.url + "/profile/:id")} />} */}
                                {loggedIn && <Route exact path="/home/profile/:id" component={UserProfilePage} />}
                                {/* <Route exact path="/profile" component={withAdminAuthorization(ProfilePage)} /> */}
                                {loggedIn && <Route exact path="/home/users/edit/:id" component={UserEditPage} />}
                                {loggedIn && <Route exact path="/home/users/delete/:id" component={withAdminAuthorization(UserDeletePage)} />}
                                <Route exact path="/error" component={ErrorPage} />
                                <Route component={ErrorPage} />
                            </Switch>


                        </Suspense >
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

                </main>
            </Fragment>

        );
    }
}
