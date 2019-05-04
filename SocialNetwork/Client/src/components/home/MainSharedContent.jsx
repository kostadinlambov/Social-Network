import React, { Fragment, Component } from 'react';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import Post from './Post';
import './css/MainSharedContent.css'
import WritePost from './WritePost';
import WriteComment from './WriteComment';

import { connect } from 'react-redux';
import { createPostAction, fetchAllPostsAction, removePostAction, addLikePostAction } from '../../store/actions/postActions';
import { createCommentAction, removeCommentAction, addLikeCommentAction } from '../../store/actions/commentActions';
import { changeCurrentTimeLineUserAction, changeAllFriendsAction } from '../../store/actions/userActions';
import { changeAllPicturesAction } from '../../store/actions/pictureActions';

class MainSharedContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentTimeLineUserId: '',
            allPostsArr: [],
        };

        this.getAllPosts = this.getAllPosts.bind(this);
        this.addLike = this.addLike.bind(this);
        this.removePost = this.removePost.bind(this);
        this.addLikeComment = this.addLikeComment.bind(this);
        this.removeComment = this.removeComment.bind(this);
        this.createPost = this.createPost.bind(this);
        this.createComment = this.createComment.bind(this);
    }

    componentDidMount = () => {
        const currentTimeLineUserId = this.props.match.params.id
        this.setState({ currentTimeLineUserId });

        if (currentTimeLineUserId !== this.props.timeLineUser.id) {
            this.initialDataLoad(currentTimeLineUserId);
        }else{
            this.getAllPosts(currentTimeLineUserId);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentTimeLineUserId !== this.props.match.params.id) {
            this.initialDataLoad(this.props.match.params.id);
        }

        const loading = this.props.fetchAllPosts.loading || this.props.removePost.loading ||
            this.props.removeCommentData.loading || this.props.addLikePostData.loading ||
            this.props.addLikeCommentData.loading || this.props.createPostData.loading ||
            this.props.createCommentData.loading;

        if (!loading && this.state.allPostsArr !== this.props.allPostsArr) {
            this.setState({
                allPostsArr: this.props.allPostsArr
            })
        }

        const errorMessage = this.getErrorMessage(prevProps, prevState);
        const successMessage = this.getSuccessMessage(prevProps, prevState)

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

    getSuccessMessage(prevProps, prevState) {
        if (!this.props.fetchAllPosts.hasError && this.props.fetchAllPosts.message && this.props.fetchAllPosts !== prevProps.fetchAllPosts) {
            return this.props.fetchAllPosts.message;
        }
        else if (!this.props.removePostData.hasError && this.props.removePostData.message && this.props.removePostData !== prevProps.removePostData) {
            return this.props.removePostData.message;

        } else if (!this.props.removeCommentData.hasError && this.props.removeCommentData.message && this.props.removeCommentData !== prevProps.removeCommentData) {
            return this.props.removeCommentData.message;
        }
        else if (!this.props.addLikePostData.hasError && this.props.addLikePostData.message && this.props.addLikePostData !== prevProps.addLikePostData) {
            return this.props.addLikePostData.message;
        }
        else if (!this.props.addLikeCommentData.hasError && this.props.addLikeCommentData.message && this.props.addLikeCommentData !== prevProps.addLikeCommentData) {
            return this.props.addLikeCommentData.message;
        }
        else if (!this.props.createPostData.hasError && this.props.createPostData.message && this.props.createPostData !== prevProps.createPostData) {
            return this.props.createPostData.message;
        }
        else if (!this.props.createCommentData.hasError && this.props.createCommentData.message && this.props.createCommentData !== prevProps.createCommentData) {
            return this.props.createCommentData.message;
        }
        return null;
    }

    getErrorMessage(prevProps, prevState) {
        if (this.props.fetchAllPosts.hasError && prevProps.fetchAllPosts.error !== this.props.fetchAllPosts.error) {
            return this.props.fetchAllPosts.message || 'Server Error';
        }
        else if (this.props.removePostData.hasError && prevProps.removePostData.error !== this.props.removePostData.error) {
            return this.props.removePostData.message || 'Server Error';

        } else if (this.props.removeCommentData.hasError && prevProps.removeCommentData.error !== this.props.removeCommentData.error) {
            return this.props.removeCommentData.message || 'Server Error';
        }
        else if (this.props.addLikePostData.hasError && prevProps.addLikePostData.error !== this.props.addLikePostData.error) {
            return this.props.addLikePostData.message || 'Server Error';
        }
        else if (this.props.addLikeCommentData.hasError && prevProps.addLikeCommentData.error !== this.props.addLikeCommentData.error) {
            return this.props.addLikeCommentData.message || 'Server Error';
        }
        else if (this.props.createPostData.hasError && prevProps.createPostData.error !== this.props.createPostData.error) {
            return this.props.createPostData.message || 'Server Error';
        }
        else if (this.props.createCommentData.hasError && prevProps.createCommentData.error !== this.props.createCommentData.error) {
            return this.props.createCommentData.message || 'Server Error';
        }

        return null;
    }

    initialDataLoad = (currentTimeLineUserId) => {
        this.setState({ currentTimeLineUserId },
            () => {
                this.props.changeTimeLineUser(currentTimeLineUserId);
                this.props.changeAllPictures(currentTimeLineUserId);
                this.props.changeAllFriends(currentTimeLineUserId);
                this.getAllPosts(currentTimeLineUserId);
            }
        )
    }

    getAllPosts(timelineUserId) {
        this.props.loadAllPosts(timelineUserId);
    }

    createPost(content, imageUrl) {
        const loggedInUserId = this.props.loggedInUser.id;
        const timelineUserId = this.props.timeLineUser.id;
        this.props.createPost(timelineUserId, loggedInUserId, content, imageUrl);
    }

    createComment(postId, content, imageUrl) {
        const loggedInUserId = this.props.loggedInUser.id;
        const timelineUserId = this.props.timeLineUser.id;
        this.props.createComment(postId, loggedInUserId, timelineUserId, content, imageUrl);
    }

    removePost(postId) {
        const loggedInUserId = this.props.loggedInUser.id;
        const timelineUserId = this.props.timeLineUser.id;
        this.props.removePost(loggedInUserId, postId, timelineUserId);
    }

    addLike = (postId) => {
        const loggedInUserId = this.props.loggedInUser.id;
        const timelineUserId = this.props.timeLineUser.id;
        this.props.addLikePost(loggedInUserId, postId, timelineUserId);
    }

    removeComment(commentId) {
        const loggedInUserId = this.props.loggedInUser.id;
        const timelineUserId = this.props.timeLineUser.id;
        this.props.removeComment(loggedInUserId, commentId, timelineUserId);
    }

    addLikeComment = (commentId, event) => {
        const loggedInUserId = this.props.loggedInUser.id;
        const timelineUserId = this.props.timeLineUser.id;
        this.props.addLikeComment(loggedInUserId, commentId, timelineUserId);
    }

    render() {
        return (
            <Fragment >
                <article className="main-article-shared-content">
                    <WritePost
                        loggedInUser={this.props.loggedInUser}
                        createPost={this.createPost}
                        createPostData={this.props.createPostData}
                        loadingAllPosts={this.props.fetchAllPosts.loading}
                    />
                    <section className="post-content-section">
                        {this.state.allPostsArr.map((post, index) =>
                            <Fragment key={post.postId}>
                                <Post
                                    addLike={this.addLike}
                                    removePost={this.removePost}
                                    addLikeComment={this.addLikeComment}
                                    removeComment={this.removeComment}
                                    {...post}
                                    timelineUserId={this.props.timeLineUser.id}
                                    currentLoggedInUserId={this.props.loggedInUser.id}
                                />

                                <WriteComment
                                    timelineUserId={this.props.timeLineUser.id}
                                    loggedInUser={this.props.loggedInUser}
                                    getAllPosts={this.getAllPosts}
                                    createComment={this.createComment}
                                    createCommentData={this.props.createCommentData}
                                    loadingAllPosts={this.props.fetchAllPosts.loading}
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
        loggedInUser: state.loggedInUserData,
        timeLineUser: state.timeLineUserData,

        allPostsArr: state.fetchAllPosts.allPostsArr,
        fetchAllPosts: state.fetchAllPosts,

        createPostData: state.createPost,
        removePostData: state.removePost,
        addLikePostData: state.addLikePost,

        createCommentData: state.createComment,
        removeCommentData: state.removeComment,
        addLikeCommentData: state.addLikeComment,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadAllPosts: (userId) => { dispatch(fetchAllPostsAction(userId)) },
        createPost: (loggedInUserId, postId, timelineUserId) => { dispatch(createPostAction(loggedInUserId, postId, timelineUserId)) },
        removePost: (loggedInUserId, postId, timelineUserId) => { dispatch(removePostAction(loggedInUserId, postId, timelineUserId)) },
        addLikePost: (loggedInUserId, postId, timelineUserId) => { dispatch(addLikePostAction(loggedInUserId, postId, timelineUserId)) },
        createComment: (postId, loggedInUserId, timelineUserId, content, imageUrl) => { dispatch(createCommentAction(postId, loggedInUserId, timelineUserId, content, imageUrl)) },
        removeComment: (loggedInUserId, commentId, timelineUserId) => { dispatch(removeCommentAction(loggedInUserId, commentId, timelineUserId)) },
        addLikeComment: (loggedInUserId, commentId, timelineUserId) => { dispatch(addLikeCommentAction(loggedInUserId, commentId, timelineUserId)) },
        changeTimeLineUser: (userId) => { dispatch(changeCurrentTimeLineUserAction(userId)) },
        changeAllFriends: (userId) => { dispatch(changeAllFriendsAction(userId)) },
        changeAllPictures: (userId) => { dispatch(changeAllPicturesAction(userId)) },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainSharedContent);