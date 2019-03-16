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

        debugger;
        this.getAllPosts(timelineUserId);


    }

    getAllPosts(timelineUserId) {
        debugger;
        requester.get('/post/all/' + timelineUserId, (response) => {
            console.log('posts all: ', response);
            debugger;
            if (response.success === true) {
                // toast.success(<ToastComponent.successToast text={response.message} />, {
                //     position: toast.POSITION.TOP_RIGHT
                // });
                debugger;
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
                // toast.error(<ToastComponent.errorToast text={`${error.name}: ${error.message}`} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
                this.props.history.push('/login');

            }
        })
    }

    onChangeHandler(event) {
        console.log('name: ', event.target.name)
        console.log('value: ', event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmitHandler(event) {

        const currentEvent = event;
        event.preventDefault();
        console.log('event: ', event);

        if (!this.canBeSubmitted()) {
            return;
        }

        console.log('Submit this.state: ', this.state);

        const { timelineUserId, loggedInUserId, content, imageUrl } = this.state;

        debugger;


        requester.post('/post/create', { timelineUserId, loggedInUserId, content, imageUrl }, (response) => {
            console.log('response: ', response)

            debugger;
            if (response.success === true) {

                this.getAllPosts(timelineUserId);

                // this.setState({
                //     ...response['payload']
                // })

                console.log('this.state: ', this.state);
                debugger;

            } else {
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }

        }).catch(err => {
            console.log('Login Error (POST): ', err)

            // toast.error(<ToastComponent.errorToast text={`${err.message}`} />, {
            localStorage.clear();

            // if (err.status === 403 && err.response.url === 'http://localhost:8000/login') {
            //     // this.props.history.push('/login');
            //     toast.error(<ToastComponent.errorToast text={'Incorrect credentials!'} />, {
            //         position: toast.POSITION.TOP_RIGHT
            //     });

            // } else {

            toast.error(<ToastComponent.errorToast text={`${err.message}`} />, {
                position: toast.POSITION.TOP_RIGHT
            });
            // }

        })
    }

    removePost(postId, event) {
        event.preventDefault();
        console.log('postId: ' , postId)
        debugger;
        const requestBody = { loggedInUserId: userService.getUserId(), postToRemoveId: postId }

        console.log('requestBody: ', requestBody)
        debugger;
        requester.post('/post/remove', requestBody, (response) => {
            console.log('Remove Post response: ', response)
            debugger;
            if (response.success) {
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                this.getAllPosts(this.state.timelineUserId);
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
        console.log('oField: ', oField);
        let scroll = oField.currentTarget;
        console.log('scroll: ', scroll);
        debugger;

        scroll.style.height = 0 + "px";
        scroll.style.height = scroll.scrollHeight + "px";
    }

    addLike = (postId, event) => {
        event.preventDefault();
        const requestBody = { postId, loggedInUserId: userService.getUserId() }
        debugger;
        console.log('requestBody: ', requestBody)
        debugger;
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
        const loggedInUserProfilePicUrl = userService.getProfilePicUrl();
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
                                                // style={{ 'overflow': 'hidden', 'border': 'none', 'resize': 'none' , 'width': '100%'}}
                                                onInput={(e) => { e.currentTarget.style.height = ''; e.currentTarget.style.height = e.currentTarget.scrollHeight + "px" }}
                                                value={this.state.content}
                                                onChange={this.onChangeHandler}
                                                onBlur={this.handleBlur('content')}
                                                aria-describedby="contentHelp"
                                                placeholder={`What's on your mind, ${loggedInUserFirstName}?`}
                                            >
                                            </TextareaAutosize>
                                            {/* {shouldMarkError('post') && <small id="contentHelp" className="form-text alert alert-danger">Post content is required!</small>} */}
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