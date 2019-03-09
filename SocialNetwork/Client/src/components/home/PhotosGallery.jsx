import React, { Fragment, Component } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import { requester, userService } from '../../infrastructure';
import PictureSideBar from './PictureSideBar';


import benderPic from '../../assets/images/Bender/Bender_1.jpeg';
import benderPic_11 from '../../assets/images/Bender/Bender_11.jpg';
import benderPic_4 from '../../assets/images/Bender/Bender_4.jpg';
import benderPic_5 from '../../assets/images/Bender/Bender_5.jpg';
import benderPic_10 from '../../assets/images/Bender/Bendder_10.jpg';
import benderPic_7 from '../../assets/images/Bender/Bender_7.jpg';
import benderPic_8 from '../../assets/images/Bender/Bender_8.jpg';
import benderPic_9 from '../../assets/images/Bender/Bender_9.jpg';

export default class PhotoGallery extends Component {
    constructor(props) {
        super(props)

        this.state = {
            picturesArr: [],
            ready: false
        }
    }

    componentDidMount() {
        this.loadAllPictures();
    }

    loadAllPictures = () => {
        const userId = userService.getUserId()

        requester.get('/pictures/all/' + userId, (response) => {
            console.log('pictures all: ', response);
            debugger;
            if (response.success === true) {
                // toast.success(<ToastComponent.successToast text={response.message} />, {
                //     position: toast.POSITION.TOP_RIGHT
                // });

                this.setState({
                    picturesArr: response['payload'],
                    ready: true,
                })
            } else {
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
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

    render() {
        if (!this.state.ready) {
            return null
        }
        return (
            <Fragment >
                <article className="aside-article-photos">
                    <div className="aside-article-header">
                        <div className="aside-article-icon">
                            <i className="fas fa-images"></i>
                        </div>
                        < NavLink className="friends " exact to={`/home/gallery/${this.props.userId}`}>
                            <h3 className="aside-article-title" style={{ color: ' #333' }}>
                            Photos &bull; {this.state.picturesArr.length}
                            </h3>
                        </NavLink>
                        {/* <h3 className="aside-article-title">Photos</h3> */}
                    </div>
                    <hr className="my-2 mb-3 mt-2 col-md-10 mx-auto" />
                    <ul className="aside-article-gallery bender-photos">
                    {this.state.picturesArr.map((picture) => <PictureSideBar key={picture.id}  {...picture} />)}

                     {/* {this.state.picturesArr.length > 0
                        ?
                        <Fragment>
                            <hr className="my-2 mb-4 mt-3 col-md-10 mx-auto" />
                            <ul className="grid-container">

                                {this.state.picturesArr.map((picture) => <PictureSideBar key={picture.id}  {...picture} />)}
                            </ul>
                        </Fragment>
                        :
                        <Fragment>
                            <hr className="my-2 mb-5 mt-3 col-md-10 mx-auto" />
                            <h2 className="text-center">There Are No Photos Of {userService.getUsername()}</h2>
                            <hr className="my-2 mb-5 mt-3 col-md-10 mx-auto" />
                        </Fragment>

                    } */}
                       
                    </ul>

                   
                </article>
            </Fragment >
        )
    }

}
