import React, { Fragment, Component } from 'react';
import { requester, userService } from '../../infrastructure/'
import { toast } from 'react-toastify';
import { ToastComponent } from '../common'
import './css/MainSharedContent.css'
// import './css/TimeLine.css';

import benderPic from '../..//assets/images/Bender/Bender_1.jpeg';
import fryPic from '../..//assets/images/Friends/PhilipJFry.jpg';
import leelaPic from '../..//assets/images/Friends/Leela.jpg';
import futuramaPic from '../..//assets/images/Futurama.jpg';

class MainSharedContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: '',
            username:'',
            firstName: '',
            lastName: '',
            postId: '',
            userprofilePicUrl: '',
            likeCount: 0,
            time: null,
            content: '',
            imageUrl: null,
            touched: {
                content: false,
            }
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.autoGrow = this.autoGrow.bind(this);
    }

    componentDidMount = () => {
        const userId = this.props.match.params.id;
        
        this.props.getUserToShowId(userId);

        this.setState({ userId: userId})

        console.log("current User id: ", userId);
        console.log("this.state.id: ", this.state.id);
        console.log("this.props.id: ", this.props.id);

        debugger;
    }

    onChangeHandler(event) {
        console.log('name: ', event.target.name)
        console.log('value: ', event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmitHandler(event) {
        event.preventDefault();
        console.log('event: ', event);

        if (!this.canBeSubmitted()) {
            return;
        }

        console.log('Submit this.state: ', this.state);

        const { userId, content, imageUrl } = this.state;

        debugger;


        requester.post('/post/create', { userId, content, imageUrl }, (response) => {
            console.log('response: ', response)

            debugger;
            if (response.success === true) {
                this.setState({
                   ...response['payload']
                })

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


    render() {
        const { content } = this.state;

        const errors = this.validate(content);
        const isEnabled = !Object.keys(errors).some(x => errors[x])

        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];

            return hasError ? shouldShow : false;
        }

        const imageClass = userService.getImageSize(this.props.imageUrl);

        console.log('this.state: ', this.state);
        debugger;

        return (


            <Fragment >
                {/* <textarea name="text" style={{ 'overflow': 'hidden', 'border': 'none', 'resize': 'none' }} onInput={(e) => { e.currentTarget.style.height = ''; e.currentTarget.style.height = e.currentTarget.scrollHeight + "px" }}></textarea> */}
                <article className="main-article-shared-content">
                    <section className="posts-section">
                        <div className="write-post">
                            <div className="post">
                                <div className="post-image">
                                    <img className={imageClass} src={this.props.profilePicUrl} alt="" />
                                </div>
                                <div className="post-area-container">

                                    <form className="" onSubmit={this.onSubmitHandler}>

                                        <div className="form-group post-textarea-form-group">
                                            <textarea
                                                name="content"
                                                id="content"
                                                className="post-textarea"
                                                // style={{ 'overflow': 'hidden', 'border': 'none', 'resize': 'none' , 'width': '100%'}}
                                                onInput={(e) => { e.currentTarget.style.height = ''; e.currentTarget.style.height = e.currentTarget.scrollHeight + "px" }}
                                                value={this.state.content}
                                                onChange={this.onChangeHandler}
                                                onBlur={this.handleBlur('content')}
                                                aria-describedby="contentHelp"
                                                placeholder={`What's on your mind, ${this.props.firstName}?`}
                                            >
                                            </textarea>
                                            {/* {shouldMarkError('post') && <small id="contentHelp" className="form-text alert alert-danger">Post content is required!</small>} */}
                                        </div>

                                        <div className="text-center">
                                            <button disabled={!isEnabled} type="submit" className="btn App-button-primary btn-lg m-3">Post</button>
                                        </div>
                                        


                                    </form>

                                </div>

                            </div>
                        </div>
                    </section>

                    {/* <section className="main-article-content-section">
                        <div className="main-article-shared-content-header">
                            <div className="main-article-shared-content-image">
                                <img src={benderPic} alt="bender" />
                            </div>
                            <div className="main-article-shared-content-description">
                                <p className="user-info">Bender Rodrigez <span className="user-info-span">shared a</span> link</p>
                                <p className="description">Feb 27 18:40 PM &bull; via Instagram</p>
                            </div>
                        </div>
                        <div className="main-article-shared-media">
                            <img src={futuramaPic} alt="Futurama" />
                        </div>
                        <div className="main-article-shared-content-footer">
                            <div className="main-article-left-side-icons-container">
                                <ul>
                                    <li>
                                        <i className="fas fa-thumbs-up"></i>
                                    </li>
                                    <li>
                                        <i className="fas fa-share"></i>
                                    </li>
                                </ul>
                            </div>
                            <div className="main-article-right-side-icons-container">
                                <div className="comment-icon">
                                    <i className="fas fa-comments"></i>
                                </div>
                                <p>2</p>
                            </div>
                        </div>
                    </section>

                    <section className="main-article-comments-section">
                        <div className="main-article-comments-container">
                            <div className="main-article-shared-content-image">
                                <img src={fryPic} alt="" />
                            </div>
                            <div className="main-article-shared-content-description">
                                <div className="comment-info">
                                    <p className="user-info"> Philip J. Fry</p>
                                    <p className="description"> 18:25 PM</p>
                                </div>
                                <p className="content">Philip J. Fry, commonly known simply by his surname Fry, is a fictional
                                    character and the protagonist of the animated sitcom Futurama. He is voiced by Billy
                                    West using a version of his own voice as he sounded when he was 25.[1][2] He is a
                                    slacker delivery boy from the 20th century who becomes cryogenically frozen and
                                    reawakens in the 30th century to become a delivery boy there with an intergalactic
                                delivery company run by his 30th great nephew, Professor Hubert J. Farnsworth. </p>
                            </div>
                        </div>
                        <div className="main-article-comments-container">
                            <div className="main-article-shared-content-image">
                                <img className="l" src={leelaPic} alt="" />
                            </div>
                            <div className="main-article-shared-content-description">
                                <div className="comment-info">
                                    <p className="user-info"> Turanga Leela</p>
                                    <p className="description"> 11:25 AM</p>
                                </div>
                                <p className="content">Leela (full name Turanga Leela) is a fictional character from the
                                    animated television series Futurama. Leela is spaceship captain, pilot, and head of all
                                    aviation services on board the Planet Express Ship. Throughout the series, she has an
                                    on-again, off-again relationship with and eventually marries Philip J. Fry, the central
                                    character in the series and becomes the mother to Kif's offspring and in the comics
                                 only, Elena Fry.</p>
                            </div>
                        </div>
                        <div className="write-comment">
                            <div className="comment">
                                <div className="main-article-shared-content-image">
                                    <img src={benderPic} alt="" />
                                </div>
                                <div className="comment-input">
                                    <input type="text" placeholder="Write a comment..." />
                                </div>
                            </div>
                        </div>
                    </section> */}
                </article>
            </Fragment>
        )
    }

}

export default MainSharedContent;