import React, { Component, Fragment } from 'react';
import { userService } from '../../infrastructure'
import { toast } from 'react-toastify';
import { ToastComponent } from '../common'
import Picture from './Picture';
import './css/UserGallery.css';

import { css } from '@emotion/core';
import { RingLoader, GridLoader, MoonLoader, CircleLoader } from 'react-spinners';

import { connect } from 'react-redux';
import { changeCurrentTimeLineUserAction, changeAllFriendsAction } from '../../store/actions/userActions';
import { addPicturesAction, changeAllPicturesAction, removePictureAction } from '../../store/actions/pictureActions';

const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
`;

class UserGalleryPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            file: '',
            error: '',
            msg: '',
            ready: true,
        };

        this.uploadFile = this.uploadFile.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.removePhoto = this.removePhoto.bind(this);
    }

    componentDidMount() {
        const currentTimeLineUserId = this.props.match.params.id;
        if (currentTimeLineUserId !== this.props.timeLineUserData.id) {
            this.props.changeTimeLineUser(currentTimeLineUserId);
            this.props.changeAllPictures(currentTimeLineUserId);
            this.props.changeAllFriends(currentTimeLineUserId);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const loading = this.props.addPicture.loading

        if (!loading && this.props.addPicture !== prevProps.addPicture) {
            this.setState({ ready: true })
        }

        const errorMessage = this.getErrorMessage(prevProps);
        const successMessage = this.getSuccessMessage(prevProps)

        if (errorMessage) {
            toast.error(<ToastComponent.errorToast text={errorMessage} />, {
                position: toast.POSITION.TOP_RIGHT
            });
        } else if (successMessage) {
            toast.success(<ToastComponent.successToast text={successMessage} />, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    getSuccessMessage(prevProps) {
        if (!this.props.addPicture.hasError && this.props.addPicture.message && this.props.addPicture !== prevProps.addPicture) {
            return this.props.addPicture.message;
        } else if (!this.props.removePicture.hasError && this.props.removePicture.message && this.props.removePicture !== prevProps.removePicture) {
            return this.props.removePicture.message;
        }

        return null;
    }

    getErrorMessage(prevProps) {
        if (this.props.addPicture.hasError && prevProps.addPicture.error !== this.props.addPicture.error) {
            return this.props.addPicture.message || 'Server Error';
        } else if (this.props.removePicture.hasError && prevProps.removePicture.error !== this.props.removePicture.error) {
            return this.props.removePicture.message || 'Server Error';
        }

        return null;
    }

    uploadFile = () => {
        this.setState({ error: '', msg: '' });

        if (!this.state.file) {
            toast.error(<ToastComponent.errorToast text='Please upload a file.' />, {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }

        if (this.state.file.size >= 2000000) {
            toast.error(<ToastComponent.errorToast text='File size exceeds limit of 2MB.' />, {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }

        const timeLineUserId = this.props.timeLineUserData.id;

        let data = new FormData();
        data.append('file', this.state.file);
        data.append('loggedInUserId', timeLineUserId);

        this.props.addImage(data, timeLineUserId);
    }

    removePhoto = (photoToRemoveId) => {
        const timeLineUserId = this.props.timeLineUserData.id;
        const loggedInUserId = this.props.loggedInUserData.id;

        this.props.removeImage(loggedInUserId, photoToRemoveId, timeLineUserId);
    }

    onFileChange = (event) => {
        this.setState({
            file: event.target.files[0],
            ready: false
        }, () => this.uploadFile());
    }

    render() {
        if (!this.state.ready && this.props.picturesArr.length === 0) {
            // return <CircleLoader
            //     css={override}
            //     sizeUnit={"px"}
            //     size={150}
            //     color={'#61dafb'}
            //     loading={true}
            // />
        }

        const isRoot = userService.isRoot();
        const isTheCurrentLoggedInUser = (this.props.loggedInUserData.id === this.props.timeLineUserData.id);

        const formattedUserNames = userService.formatUsername(this.props.timeLineUserData.firstName, this.props.timeLineUserData.lastName)

        return (

            <section className="galerry-section">

                <article className="aside-article-photos">
                    <div className="gallery-article-intro">

                        <div className="gallery-aside-article-header"  >
                            <div className="aside-article-icon">
                                <i className="fas fa-images"></i>
                            </div>
                            <h3 className="aside-article-title">Photos</h3>
                        </div>

                        {(isRoot || isTheCurrentLoggedInUser) && <div className="">
                            <button className="button update-info">
                                <label className="cursor-pointer" id="upload" htmlFor="fileUpload" > ADD PHOTO
                                <input className="cursor-pointer" id="fileUpload" onChange={this.onFileChange} type="file" />
                                </label>
                            </button>
                        </div>}

                    </div>

                    {this.props.picturesArr.length > 0
                        ?
                        <Fragment>
                            <div className="hr-styles" style={{ 'width': '90%' }}></div>

                            {!this.state.ready ?
                                <CircleLoader
                                    css={override}
                                    sizeUnit={"px"}
                                    size={150}
                                    color={'#61dafb'}
                                    loading={true}
                                /> :
                                <ul className="grid-container">
                                    {this.props.picturesArr.map((picture) => <Picture key={picture.id} removePhoto={this.removePhoto}  {...picture} userId={this.props.timeLineUserData.id} />)}
                                </ul>}
                        </Fragment>
                        :

                        <Fragment>
                            {!this.state.ready ?
                                <Fragment>
                                    <div className="hr-styles" style={{ 'width': '90%' }}></div>
                                    <CircleLoader
                                        css={override}
                                        sizeUnit={"px"}
                                        size={150}
                                        color={'#61dafb'}
                                        loading={true}
                                    />
                                </Fragment> :
                                <Fragment>
                                    <div className="hr-styles" style={{ 'width': '90%' }}></div>
                                    <h3 className="text-center">There are no photos of <span className="username-gallery">{`${formattedUserNames}`}</span> !</h3>
                                    <div className="hr-styles" style={{ 'width': '90%' }}></div>
                                </Fragment>
                            }
                        </Fragment>
                    }
                </article>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addPicture: state.addPicture,
        removePicture: state.removePicture,
        picturesArr: state.fetchPictures.picturesArr,
        fetchPictures: state.fetchPictures,
        timeLineUserData: state.timeLineUserData,
        loggedInUserData: state.loggedInUserData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTimeLineUser: (userId) => { dispatch(changeCurrentTimeLineUserAction(userId)) },
        changeAllFriends: (userId) => { dispatch(changeAllFriendsAction(userId)) },
        changeAllPictures: (userId) => { dispatch(changeAllPicturesAction(userId)) },
        addImage: (data, userId) => { dispatch(addPicturesAction(data, userId)) },
        removeImage: (loggedInUserId, photoToRemoveId, timeLineUserId) => { dispatch(removePictureAction(loggedInUserId, photoToRemoveId, timeLineUserId)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserGalleryPage);