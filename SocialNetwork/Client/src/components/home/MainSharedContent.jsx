import React, { Fragment, Component } from 'react';
import { requester, userService } from '../../infrastructure/'
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import Post from './Post';
import './css/MainSharedContent.css'
import WritePost from './WritePost';
import WriteComment from './WriteComment';


class MainSharedContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedInUserId: '',
            timelineUserId: '',
            content: '',
            likeCount: 0,
            commentsCount: 0,
            allPostsArr: [],
        };

        this.getAllPosts = this.getAllPosts.bind(this);
        this.addLike = this.addLike.bind(this);
        this.removePost = this.removePost.bind(this);
        this.addLikeComment = this.addLikeComment.bind(this);
        this.removeComment = this.removeComment.bind(this);
    }

    componentDidMount = () => {
        const timelineUserId = this.props.match.params.id;
        const loggedInUserId = userService.getUserId();

        this.props.getUserToShowId(timelineUserId);

        this.setState({ loggedInUserId: loggedInUserId, timelineUserId: timelineUserId });
        this.getAllPosts(timelineUserId);
    }

    getAllPosts(timelineUserId) {
        requester.get('/post/all/' + timelineUserId, (response) => {
            if (response) {
                this.setState({
                    allPostsArr: response,
                    // allPostsArr: response['payload'],
                    content: '',
                })
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

    removePost(postId, event) {
        event.preventDefault();
        const requestBody = { loggedInUserId: userService.getUserId(), postToRemoveId: postId }

        requester.post('/post/remove', requestBody, (response) => {
            if (response.success) {
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                this.getAllPosts(this.state.timelineUserId);
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

    removeComment(commentId, event) {
        event.preventDefault();
        const requestBody = { loggedInUserId: userService.getUserId(), commentToRemoveId: commentId }
        requester.post('/comment/remove', requestBody, (response) => {
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
            toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
                this.props.history.push('/login');
            }
        })
    }

    addLikeComment = (commentId, event) => {
        event.preventDefault();
        const requestBody = { commentId, loggedInUserId: userService.getUserId() }
        requester.post('/like/comment', requestBody, (response) => {
            if (response.success) {
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                this.getAllPosts(this.state.timelineUserId);
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

    render() {
        if (this.props.match.params.id !== this.props.id) {
            this.props.getUserToShowId(this.props.match.params.id);
            this.getAllPosts(this.props.match.params.id);
        }

        const loggedInUserProfilePicUrl = this.props.profilePicUrl;
        return (

            <Fragment >
                <article className="main-article-shared-content">

                    <WritePost {...this.props} timelineUserId={this.state.timelineUserId} getAllPosts={this.getAllPosts} loggedInUserProfilePicUrl={loggedInUserProfilePicUrl} />

                    <section className="post-content-section">
                        {this.state.allPostsArr.map((post, index) =>
                            <Fragment key={post.postId}>
                                <Post
                                    addLike={this.addLike}
                                    removePost={this.removePost}
                                    addLikeComment={this.addLikeComment}
                                    removeComment={this.removeComment}
                                    {...post}
                                    currentTimelineUserId={this.state.timelineUserId}
                                />

                                <WriteComment
                                    {...this.props}
                                    timelineUserId={this.state.timelineUserId}
                                    getAllPosts={this.getAllPosts}
                                    loggedInUserProfilePicUrl={loggedInUserProfilePicUrl}
                                    postId={post.postId}
                                />


                            </Fragment >
                        )}

                    </section>

                   

                </article>
            </Fragment>
        )
    }
}

export default MainSharedContent;