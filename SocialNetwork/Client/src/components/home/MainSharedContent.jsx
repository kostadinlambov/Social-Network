import React, { Fragment, Component } from 'react';
import { requester, userService } from '../../infrastructure/'
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import Post from './Post';
import './css/MainSharedContent.css'
import WritePost from './WritePost';
import WriteComment from './WriteComment';

import { connect } from 'react-redux';
import { fetchAllPostsAction } from '../../store/actions/postActions'

class MainSharedContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedInUserId: '',
            timelineUserId: '',
            likeCount: 0,
            commentsCount: 0,
            allPostsArr: [],
            ready: false
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
        this.getAllPosts(timelineUserId);
        this.setState({ loggedInUserId: loggedInUserId, timelineUserId: timelineUserId, ready:true });
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            (this.props.fetchAllPosts.hasError && prevProps.fetchAllPosts.error !== this.props.fetchAllPosts.error)
        ) {

            const errorMessage =
                this.props.fetchAllPosts.message || 'Server Error'

            toast.error(<ToastComponent.errorToast text={errorMessage} />, {
                position: toast.POSITION.TOP_RIGHT
            });

        } else if (
            (!this.props.fetchAllPosts.hasError && this.props.fetchAllPosts.message && this.props.fetchAllPosts !== prevProps.fetchAllPosts)) {

            const successMessage = this.props.fetchAllPosts.message;

            toast.success(<ToastComponent.successToast text={successMessage} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            // this.props.history.push('/login');
        }
    }

    getAllPosts(timelineUserId) {
        this.props.loadAllPosts(timelineUserId);
        // requester.get('/post/all/' + timelineUserId, (response) => {
        //     if (response) {
        //         this.setState({
        //             allPostsArr: response,
        //         })
        //     } else {
        //         toast.error(<ToastComponent.errorToast text={response.message} />, {
        //             position: toast.POSITION.TOP_RIGHT
        //         });
        //     }
        // }).catch(err => {
        //     toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
        //         position: toast.POSITION.TOP_RIGHT
        //     });

        //     if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
        //         localStorage.clear();
        //         this.props.history.push('/login');
        //     }
        // })
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
                // toast.success(<ToastComponent.successToast text={response.message} />, {
                //     position: toast.POSITION.TOP_RIGHT
                // });

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

        const loading = this.props.fetchAllPosts.loading;
        if (!this.state.ready || loading) {
            return <h1 className="text-center pt-5 mt-5">Loading...</h1>
        }

        const loggedInUserProfilePicUrl = this.props.profilePicUrl;
        return (
            <Fragment >
                <article className="main-article-shared-content">
                    <WritePost {...this.props} timelineUserId={this.state.timelineUserId} getAllPosts={this.getAllPosts} loggedInUserProfilePicUrl={loggedInUserProfilePicUrl} />
                    <section className="post-content-section">
                        {this.props.allPostsArr.map((post, index) =>
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

const mapStateToProps = (state) => {
    return {
        allPostsArr: state.fetchAllPosts.allPostsArr,
        fetchAllPosts: state.fetchAllPosts,

        // friendsChatArr: state.fetchAllChatFriends.friendsChatArr,
        // fetchAllChatFriends: state.fetchAllChatFriends,

        // allMessagesArr: state.fetchAllMessages.allMessagesArr,
        // fetchAllMessages: state.fetchAllMessages,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadAllPosts: (userId) => { dispatch(fetchAllPostsAction(userId)) },
        // loadAllChatFriends: (userId) => { dispatch(fetchAllChatFriendsAction(userId)) },
        // fetchAllMessages: (chatUserId) => { dispatch(fetchAllMessagesAction(chatUserId)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainSharedContent);
