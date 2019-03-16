import React, { Component, Fragment } from 'react';
import { requester, userService } from '../../infrastructure'
import { toast } from 'react-toastify';
import { ToastComponent } from '../common'
import Picture from './Picture';
import './css/UserGallery.css'

export default class UserGalleryPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            picturesArr: [],
            id: this.props.match.params.id,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            username: '',
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
        const userId = this.props.match.params.id;
        this.setState({ id: userId });
        this.props.loadAllPictures(userId);
    }
   
    uploadFile = (event) => {
        debugger;
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

        let data = new FormData();
        data.append('file', this.state.file);
        data.append('loggedInUserId', this.state.id);

        fetch('http://localhost:8000/pictures/add', {
            method: 'POST',
            headers: {
                ...this.getAuthHeader()
            },
            body: data
        }).then(data => data.json())
            .then(response => {
                if (response.success === true) {
                    toast.success(<ToastComponent.successToast text={response.message} />, {
                        position: toast.POSITION.TOP_RIGHT
                    });

                    this.props.loadAllPictures(this.props.id);
                    this.setState({ ready: true });
                } else {
                    toast.error(<ToastComponent.errorToast text={response.message} />, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }

            }).catch(err => {
                toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                    localStorage.clear();
                    this.props.history.push('/login');
                }
            });

    }

    getAuthHeader = () => {
        const token = localStorage.getItem("token");
        return (token && token.length)
            ? { 'Authorization': `Bearer ${token}` }
            : {}
    }

    removePhoto = (photoToRemoveId, event) => {
        event.preventDefault();
        const requestBody = { loggedInUserId: userService.getUserId(), photoToRemoveId: photoToRemoveId }

        requester.post('/pictures/remove', requestBody, (response) => {
            if (response.success) {
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                this.props.loadAllPictures(this.props.id);
            } else {
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }).catch(err => {
            toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
                this.props.history.push('/login');
            }
        })
    }

    onFileChange = (event) => {
        debugger;
        this.setState({
            file: event.target.files[0],
            ready: false
        }, () => this.uploadFile());
    }

    render() {
        if(this.props.match.params.id !== this.props.id){
            this.props.getUserToShowId(this.props.match.params.id);
        }

        if (!this.state.ready) {
            return <h1 className="text-center pt-5 mt-5">Uploading File...</h1>
        }

        const isRoot = userService.isRoot();
        const isTheCurrentLoggedInUser = (this.props.id === userService.getUserId());

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

                        { (isRoot ||  isTheCurrentLoggedInUser) &&    <div className="">
                            <button className="button update-info" >
                                <label id="upload" htmlFor="fileUpload" > ADD PHOTO</label>
                                <input id="fileUpload" onChange={this.onFileChange} type="file" />
                            </button>
                        </div>}

                    </div>
                    {this.props.picturesArr.length > 0
                        ?
                        <Fragment>
                            <hr className="my-2 mb-4 mt-3 col-md-10 mx-auto" />
                            <ul className="grid-container">

                                {this.props.picturesArr.map((picture) => <Picture key={picture.id} removePhoto={this.removePhoto}  {...picture} userId={this.props.id} />)}
                            </ul>
                        </Fragment>
                        :
                        <Fragment>
                            <hr className="my-2 mb-5 mt-3 col-md-10 mx-auto" />
                            <h3 className="text-center">There are no photos of <span className="username-gallery">{`${this.props.firstName} ${this.props.lastName}`}</span>.</h3>
                            <hr className="my-2 mb-5 mt-3 col-md-10 mx-auto" />
                        </Fragment>
                    }
                </article>
            </section>
        )
    }
}