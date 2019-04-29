import React, { Fragment, Component } from 'react';
import { userService } from '../../infrastructure';
import TextareaAutosize from 'react-autosize-textarea';

export default class WritePost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: '',
            imageUrl: '',
            createPostData: '',
            touched: {
                content: false,
            }
        };

        this.handleBlur = this.handleBlur.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        const loading = this.props.createPostData.loading || this.props.loadingAllPosts;

        if (!loading && this.state.createPostData !== this.props.createPostData) {
            this.setState({
                content: '',
                imageUrl: '',
                createPostData: this.props.createPostData,
            })
        }
    }

    changeUserData = (userdata) => {
        this.setState({loggedInUserProfilePicUrl: userdata.profilePicUrl})
    }

    onSubmitHandler(event) {
        event.preventDefault();
        if (!this.canBeSubmitted()) {
            return;
        }

        const { content, imageUrl } = this.state;
        this.props.createPost(content, imageUrl);
    }

    onChangeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleBlur = (field) => (event) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    canBeSubmitted() {
        const { content } = this.state;
        const errors = this.validate(content);
        const isDisabled = Object.keys(errors).some(x => errors[x])
        return !isDisabled;
    }

    validate = (content) => {
        return {
            content: content.length === 0,
        }
    }

    render() {
        const { content } = this.state;
        const errors = this.validate(content);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);
        const displayButon = isEnabled ? '' : 'hidden';

        const imageClass = userService.getImageSize(this.props.loggedInUser.profilePicUrl);
        const loggedInUserProfilePicUrl = this.props.loggedInUser.profilePicUrl;
        const loggedInUserFirstName = this.props.loggedInUser.firstName;

        let formattedUsername = userService.formatUsername(loggedInUserFirstName)

        return (
            <Fragment>
                <section className="posts-section">
                    <div className="write-post" id="create-post-button-container">
                        <div className="post">
                            <div className="post-image">
                                <img className={imageClass} src={loggedInUserProfilePicUrl} alt="" />
                            </div>
                            <div className="post-area-container">
                                <form id="post-form" onSubmit={this.onSubmitHandler}>
                                    <div className="" id="post-textarea-form-group">
                                        <TextareaAutosize
                                            name="content"
                                            id="content"
                                            className="post-textarea"
                                            value={this.state.content}
                                            onChange={this.onChangeHandler}
                                            onBlur={this.handleBlur('content')}
                                            aria-describedby="contentHelp"
                                            placeholder={`What's on your mind, ${formattedUsername}?`}
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
            </Fragment>
        )
    }
}
