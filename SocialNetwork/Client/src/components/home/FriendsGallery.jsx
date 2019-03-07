import React, { Fragment, Component } from 'react';
import { NavLink } from 'react-router-dom';
import { requester, userService } from '../../infrastructure';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import placeholder_user_image from '../../assets/images/placeholder-profile-male.jpg'

export default class FriendsGallery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            friendsArr: [],
            ready: false,
        }

    }

    componentDidMount() {
        const userId = this.props.userId;
        requester.get(`/relationship/friends/${userId}`, (response) => {
            console.log('friends all: ', response);

            this.setState({
                friendsArr: response, ready: true
            })
        }).catch(err => {
            console.error('deatils err:', err)
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
        if (!this.state.ready) {
            // return <h1 className="text-center pt-5 mt-5">Loading...</h1>
            return null;
        }


        return (
            <Fragment >
                <article className="aside-article-friends">
                    <div className="aside-article-header">
                        <div className="aside-article-icon">
                            <i className="fas fa-user-friends"></i>
                        </div>
                        <NavLink className="friends " exact to={`/home/friends/${this.props.userId}`}>
                            <h3 className="aside-article-title" style={{ color: ' #333' }}>
                                Friends &bull; {this.state.friendsArr.length}
                            </h3>
                        </NavLink>
                    </div>
                    <ul className="aside-article-gallery ">
                        {this.state.friendsArr.map(friend => {
                            const profilePicUrl = friend.profilePicUrl || placeholder_user_image
                            const imageClassName = userService.getImageSize(profilePicUrl, true);
                            return (
                                <li key={friend.id}>
                                    <NavLink to="#"><img className={imageClassName} src={profilePicUrl} alt="Pic" /></NavLink>
                                    <div className="img-details"><p className="user-name">{`${friend.firstName} ${friend.lastName}`}</p> </div>
                                </li>)
                        })}
                    </ul>
                </article>
            </Fragment>
        )
    }
}

