import React, { Fragment, Component } from 'react';
import { userService} from '../../infrastructure';
import TextareaAutosize from 'react-autosize-textarea';

export default class WriteComment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: '',
            imageUrl: '',
            createCommentData: '',
            touched: {
                content: false,
            }
        };

        this.handleBlur = this.handleBlur.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        const loading = this.props.createCommentData.loading || this.props.loadingAllPosts;

        if (!loading && this.state.createCommentData !== this.props.createCommentData) {
            this.setState({
                content: '',
                imageUrl: '',
                createCommentData: this.props.createCommentData,
            })
        }
    }

    onSubmitHandler(event) {
        event.preventDefault();

        if (!this.canBeSubmitted()) {
            return;
        }
        const postId = this.props.postId;
        const { content, imageUrl } = this.state;

        this.props.createComment(postId, content, imageUrl )
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

        const loggedInUserProfilePicUrl = this.props.loggedInUser.profilePicUrl;
        const imageClass = userService.getImageSize(loggedInUserProfilePicUrl);
        const loggedInUserFirstName = this.props.loggedInUser.firstName;
        const formattedName = userService.formatUsername(loggedInUserFirstName);

        return (
            <Fragment>
                <section className="comment-section">
                    <div className="write-comment" id="create-comment-button-container">
                        <div className="post">
                            <div className="post-image">
                                <img className={imageClass} src={loggedInUserProfilePicUrl} alt="" />
                            </div>
                            <div className="post-area-container">
                                <form className="" onSubmit={this.onSubmitHandler}>
                                    <div className="" id="post-textarea-form-group">
                                        <TextareaAutosize
                                            name="content"
                                            id="content"
                                            className="post-textarea"
                                            value={this.state.content}
                                            onChange={this.onChangeHandler}
                                            onBlur={this.handleBlur('content')}
                                            aria-describedby="contentHelp"
                                            placeholder={`Write a comment, ${formattedName}!`}
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
