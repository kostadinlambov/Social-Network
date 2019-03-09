import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
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
            id: '',
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
        this.loadAllPictures();
    }

    loadAllPictures = () => {
        const userId = userService.getUserId()

        requester.get('/pictures/all/' + userId, (response) => {
            console.log('pictures all: ', response);
            debugger;
            if (response.success === true) {
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                this.setState({
                    picturesArr: response['payload']
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

    uploadFile = (event) => {
        debugger;
        // event.preventDefault();
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
        data.append('loggedInUserId', userService.getUserId());

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
                    this.setState({ ready: true });
                    this.loadAllPictures();
                } else {
                    toast.error(<ToastComponent.errorToast text={response.message} />, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }

            }).catch(err => {
                console.error('Upload Pic Err:', err)
                toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
                    // toast.error(<ToastComponent.errorToast text={`${error.name}: ${error.message}`} />, {
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

        console.log('event: ', event)
        console.log('photoToRemoveId: ', photoToRemoveId)
        
        // const id = this.state.id;
        const requestBody = { loggedInUserId: userService.getUserId(), photoToRemoveId: photoToRemoveId }

        console.log('requestBody: ', requestBody)
        debugger;
        requester.post('/pictures/remove', requestBody, (response) => {
            console.log('RemovePicture response: ', response)
            debugger;
            if (response.success) {
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                this.props.history.push("/home/gallery/" + userService.getUserId())

            } else {
                debugger;
                console.log('error message: ', response.message);
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }).catch(err => {
            debugger;
            console.error('Remove Picture err:', err)
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
        if (!this.state.ready) {
            return <h1 className="text-center pt-5 mt-5">Uploading File...</h1>
        }

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

                        <div className="">
                            {/* <h4 style={{ color: 'red' }}>{this.state.error}</h4>
                            <h4 style={{ color: 'green' }}>{this.state.msg}</h4> */}
                            <button className="button update-info" >
                                <label id="upload" htmlFor="fileUpload" > ADD PHOTO</label>
                                <input id="fileUpload" onChange={this.onFileChange} type="file" />
                            </button>
                        </div>

                    </div>
                    {this.state.picturesArr.length > 0
                        ?
                        <Fragment>
                            <hr className="my-2 mb-4 mt-3 col-md-10 mx-auto" />
                            <ul className="grid-container">

                                {this.state.picturesArr.map((picture) => <Picture key={picture.id} removePhoto={this.removePhoto}  {...picture}  />)}
                            </ul>
                        </Fragment>
                        :
                        <Fragment>
                            <hr className="my-2 mb-5 mt-3 col-md-10 mx-auto" />
                            <h3 className="text-center">There are no photos of <span className="username-gallery">{userService.getUsername()}</span>.</h3>
                            <hr className="my-2 mb-5 mt-3 col-md-10 mx-auto" />
                        </Fragment>

                    }

                </article>
            </section>

        )
    }
}