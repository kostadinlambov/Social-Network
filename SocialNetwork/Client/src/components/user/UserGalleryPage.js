import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { requester, userService } from '../../infrastructure'
import { toast } from 'react-toastify';
import { ToastComponent } from '../common'
import './css/UserGallery.css'

import benderPic from '../../assets/images/Bender/Bender_1.jpeg';
import benderPic_11 from '../../assets/images/Bender/Bender_11.jpg';
import benderPic_4 from '../../assets/images/Bender/Bender_4.jpg';
import benderPic_5 from '../../assets/images/Bender/Bender_5.jpg';
import benderPic_10 from '../../assets/images/Bender/Bendder_10.jpg';
import benderPic_7 from '../../assets/images/Bender/Bender_7.jpg';
import benderPic_8 from '../../assets/images/Bender/Bender_8.jpg';
import benderPic_9 from '../../assets/images/Bender/Bender_9.jpg';
import testPic from '../../assets/images/Social_Media.jpg';


export default class UserGalleryPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            friendsArr: [],
            id: '',
            username: ''
        };
    }

    componentDidMount() {
        const username = userService.getUsername();
        const userId = this.props.match.params.id;
        this.setState({ id: userId, username })

        requester.get(`/relationship/friends/${userId}`, (response) => {
            debugger;
            console.log('friends all: ', response);

            this.setState({
                friendsArr: response
            })
        }).catch(err => {
            console.error('deatils err:', err)
            toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
                // toast.error(<ToastComponent.errorToast text={`${error.name}: ${error.message}`} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
                this.props.history.push('/login');
            }
        })
    }

    removeFriend = (friendToRemoveId, event) => {
        console.log('event: ', event)
        console.log('friendToRemoveId: ', friendToRemoveId)

        event.preventDefault();

        // const id = this.state.id;
        const requestBody = { loggedInUserId: userService.getUserId(), friendToRemoveId: friendToRemoveId }

        console.log('requestBody: ', requestBody)

        requester.post('/relationship/removeFriend', requestBody, (response) => {
            console.log('RemoveFriend response: ', response)
            debugger;
            if (response.success) {
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                this.props.history.push("/home/friends/" + userService.getUserId())

            } else {
                debugger;
                console.log('error message: ', response.message);
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }).catch(err => {
            debugger;
            console.error('Remove Friend err:', err)
            toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
                this.props.history.push('/login');
            }
        })
    }

    render() {


        return (


            <section className="galerry-section">

                <article className="aside-article-photos">
                    <div class="gallery-article-intro">
                        <div className="aside-article-header"  >
                            <div className="aside-article-icon">
                                <i className="fas fa-images"></i>
                            </div>
                            <h3  className="aside-article-title">Photos of {userService.getUsername()}</h3>
                        </div>
                        <div className="gallery-button-container">
                            <button className="button update-info" onClick={this.demote} >ADD PHOTO</button>
                        </div>
                    </div>
                    <ul className="grid-container">
                        <li>
                            <article className="card">
                                <div className="media">
                                    <img className="l" src={testPic} alt="pic1" />
                                </div>
                                {/* <div className="content">
                                <h3 className="card-title">Philip J. Fry</h3>
                                <p></p>
                            </div> */}
                            </article>
                        </li>
                        <li>
                            <article className="card">
                                <div className="media">
                                    <img src={benderPic_11} alt="pic1" />
                                </div>

                            </article>
                        </li>

                        <li>
                            <article className="card">
                                <div className="media">
                                    <img src={benderPic_4} alt="pic1" />
                                </div>

                            </article>
                        </li>
                        <li>
                            <article className="card">
                                <div className="media">
                                    <img src={benderPic_5} alt="pic1" />
                                </div>
                            </article>
                        </li>
                        <li>
                            <article className="card">
                                <div className="media">
                                    <img src={benderPic_10} alt="pic1" />
                                </div>
                            </article>
                        </li>

                        <li>
                            <article className="card">
                                <div className="media">
                                    <img src={benderPic_7} alt="pic1" />
                                </div>
                            </article>
                        </li>
                        <li>
                            <article className="card">
                                <div className="media">
                                    <img src={benderPic_8} alt="pic1" />
                                </div>
                            </article>
                        </li>
                        <li>
                            <article className="card">
                                <div className="media">
                                    <img src={benderPic_9} alt="pic1" />
                                </div>
                            </article>
                        </li>

                        <li>
                            <article className="card">
                                <div className="media">
                                    <img src={benderPic} alt="pic1" />
                                </div>
                            </article>
                        </li>

                        {/* <li>
                        <article className="card">
                            <div className="media">
                                <img src={benderPic} alt="pic1" />
                            </div>
                            <div className="content">
                                <h3 className="card-title">Philip J. Fry</h3>
                                <p>Fry is an immature, slovenly, yet good-hearted and sentimental pizza delivery boy who falls into
                                    a cryogenic pod, causing it to activate and freeze him just after midnight on January 1, 2000.</p>
                            </div>
                        </article>
                    </li> */}
                    </ul>
                </article>
            </section>

        )
    }
}