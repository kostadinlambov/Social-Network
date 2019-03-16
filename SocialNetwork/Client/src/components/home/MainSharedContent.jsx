import React, { Fragment, Component } from 'react';
import { requester, userService } from '../../infrastructure/'
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import Post from './Post';
import './css/MainSharedContent.css'
import TextareaAutosize from 'react-autosize-textarea';


class MainSharedContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedInUserId: '',
            timelineUserId: '',
            username: '',
            firstName: '',
            lastName: '',
            postId: '',
            userprofilePicUrl: '',
            likeCount: 0,
            commentsCount: 0,
            time: {},
            content: '',
            imageUrl: '',
            allPostsArr: [],
            touched: {
                content: false,
            }
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.autoGrow = this.autoGrow.bind(this);
        this.getAllPosts = this.getAllPosts.bind(this);
        this.addLike = this.addLike.bind(this);
        this.removePost = this.removePost.bind(this);
    }

    componentDidMount = () => {
        const timelineUserId = this.props.match.params.id;
        const loggedInUserId = userService.getUserId();

        this.props.getUserToShowId(timelineUserId);

        this.setState({ loggedInUserId: loggedInUserId, timelineUserId: timelineUserId });
        this.getAllPosts(timelineUserId);
    }

    getAllPosts(timelineUserId) {
        debugger;
        requester.get('/post/all/' + timelineUserId, (response) => {
            console.log('posts all: ', response);
            debugger;
            if (response.success === true) {
                this.setState({
                    allPostsArr: response['payload'],
                    content: '',
                })
                console.log('time: ', response['payload'])
            } else {
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
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

    onChangeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmitHandler(event) {
        const currentEvent = event;
        event.preventDefault();

        if (!this.canBeSubmitted()) {
            return;
        }

        const { timelineUserId, loggedInUserId, content, imageUrl } = this.state;

        requester.post('/post/create', { timelineUserId, loggedInUserId, content, imageUrl }, (response) => {
            if (response.success === true) {
                this.getAllPosts(timelineUserId);
            } else {
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }

        }).catch(err => {
            localStorage.clear();
            toast.error(<ToastComponent.errorToast text={`${err.message}`} />, {
                position: toast.POSITION.TOP_RIGHT
            });
            // }

        })
    }

    removePost(postId, event) {
        event.preventDefault();
        const requestBody = { loggedInUserId: userService.getUserId(), postToRemoveId: postId }

        requester.post('/post/remove', requestBody, (response) => {
            console.log('Remove Post response: ', response)
            if (response.success) {
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                this.getAllPosts(this.state.timelineUserId);
            } else {
                console.log('error message: ', response.message);
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }).catch(err => {
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

    canBeSubmitted() {
        const { content } = this.state;

        const errors = this.validate(content);
        const isDisabled = Object.keys(errors).some(x => errors[x])
        return !isDisabled;
    }

    handleBlur = (field) => (event) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });

    }

    validate = (content) => {
        return {
            content: content.length === 0,
        }
    }

    autoGrow = (oField) => {
        let scroll = oField.currentTarget;
        scroll.style.height = 0 + "px";
        scroll.style.height = scroll.scrollHeight + "px";
    }

    addLike = (postId, event) => {
        event.preventDefault();
        const requestBody = { postId, loggedInUserId: userService.getUserId() }
        requester.post('/like/add', requestBody, (response) => {
            if (response.success) {
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                this.getAllPosts(this.state.timelineUserId);
            } else {
                console.log('error message: ', response.message);
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }).catch(err => {
            console.error('Add Like err:', err)
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
        const { content } = this.state;

        const errors = this.validate(content);
        const isEnabled = !Object.keys(errors).some(x => errors[x])
        const displayButon = isEnabled ? '' : 'hidden'

        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];

            return hasError ? shouldShow : false;
        }

        const imageClass = userService.getImageSize(this.props.imageUrl);
        // const loggedInUserProfilePicUrl = userService.getProfilePicUrl();
        const loggedInUserProfilePicUrl = this.props.profilePicUrl;
        const loggedInUserFirstName = userService.getFirstName();

        const likesCount = this.state.likeCount;
        const commentsCount = this.state.commentsCount;

        return (
            <Fragment >
                <article className="main-article-shared-content">
                    <section className="posts-section">
                        <div className="write-post" id="create-post-button-container">
                            <div className="post">
                                <div className="post-image">
                                    <img className={imageClass} src={loggedInUserProfilePicUrl} alt="" />
                                </div>
                                <div className="post-area-container">
                                    <form className="" onSubmit={this.onSubmitHandler}>
                                        <div className="form-group post-textarea-form-group">
                                            <TextareaAutosize
                                                name="content"
                                                id="content"
                                                className="post-textarea"
                                                onInput={(e) => { e.currentTarget.style.height = ''; e.currentTarget.style.height = e.currentTarget.scrollHeight + "px" }}
                                                value={this.state.content}
                                                onChange={this.onChangeHandler}
                                                onBlur={this.handleBlur('content')}
                                                aria-describedby="contentHelp"
                                                placeholder={`What's on your mind, ${loggedInUserFirstName}?`}
                                            >
                                            </TextareaAutosize>
                                        </div>

                                        <div className="text-center">
                                            <button disabled={!isEnabled} style={{ 'visibility': `${displayButon}` }} type="submit" className="btn uiButtonGroup post-button-fbPhotoCurationControl App-button-primary ">POST</button>
                                        </div>
                                      
                                    </form>
                                </div>

                            </div>
                        </div>
                    </section>

                    <section className="post-content-section">
                        {this.state.allPostsArr.map((post) => 
                        <Post 
                        key={post.postId} 
                        addLike={this.addLike} 
                        commentsCount={commentsCount} 
                        removePost={this.removePost} 
                        {...post}  
                        currentTimelineUserId = {this.state.timelineUserId}
                        />)}
                    </section>
                </article>
            </Fragment>
        )
    }

}

export default MainSharedContent;