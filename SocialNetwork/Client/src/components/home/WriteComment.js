import React, { Fragment, Component } from 'react';
import { userService, requester} from '../../infrastructure';
import TextareaAutosize from 'react-autosize-textarea';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';

export default class WriteComment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedInUserId: userService.getUserId(),
            timelineUserId: '',
            content: '',
            imageUrl: '',
            loggedInUserProfilePicUrl: '',
            touched: {
                content: false,
            }
        };

        this.handleBlur = this.handleBlur.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    changeUserData = (userdata) => {
        this.setState({ loggedInUserProfilePicUrl: userdata.profilePicUrl })
    }


    onSubmitHandler(event) {
        event.preventDefault();

        if (!this.canBeSubmitted()) {
            return;
        }
        const postId = this.props.postId;
        const timelineUserId = this.props.timelineUserId;
        const { loggedInUserId, content, imageUrl } = this.state;

        debugger;
        console.log('this.state: ', this.state);
        debugger;
        requester.post('/comment/create', { postId, loggedInUserId, timelineUserId, content, imageUrl }, (response) => {
            console.log('comment create response: ', response);
            debugger;
            if (response.success === true) {
                this.props.getAllPosts(timelineUserId);
                this.setState({ content: '' })
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
        })
    }

    onChangeHandler(event) {
        debugger;
        console.log(event.target.name + ' => ' + event.target.value);
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

        const imageClass = userService.getImageSize(this.props.imageUrl);
        const loggedInUserProfilePicUrl = userService.getProfilePicUrl();
        // const loggedInUserProfilePicUrl = this.props.loggedInUserProfilePicUrl;
        const loggedInUserFirstName = userService.getFirstName();
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
