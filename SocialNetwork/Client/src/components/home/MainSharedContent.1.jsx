import React, { Fragment, Component } from 'react';
import requester from '../../infrastructure/requester';
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
            username: '',
            password: '',
            post: '',
            touched: {
                username: false,
                password: false
            }
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.autoGrow = this.autoGrow.bind(this);
    }

    componentDidMount = () => {
        const userId = this.props.match.params.id;
        console.log("current User id: ", userId);

        this.props.getUserToShowId(userId);

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

        const { touched, ...otherProps } = this.state;

        requester.post('/login', { ...otherProps }, (response) => {
            console.log('response: ', response)

            if (response.error) {
                // observer.trigger(observer.events.notification, { type: 'error', message: 'Incorrect credentials!' });
                toast.error(<ToastComponent.errorToast text={' Incorrect credentials!'} />, {
                    position: toast.POSITION.TOP_RIGHT,
                });


            } else {
                const token = response.split(' ')[1];
                localStorage.setItem('token', token);

                // observer.trigger(observer.events.notification, { type: 'success', message: 'You have successfully logged in!' });
                toast.success(<ToastComponent.successToast text={' You have successfully logged in!'} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                this.props.history.push('/');
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
        const { username, password, post } = this.state;

        const errors = this.validate(username, password, post);
        const isDisabled = Object.keys(errors).some(x => errors[x])
        return !isDisabled;
    }

    handleBlur = (field) => (event) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });

    }

    validate = (username, password, post) => {
        return {
            username: username.length === 0,
            password: password.length === 0,
            post: post.length === 0,
        }
    }

    autoGrow = (oField) => {
        console.log('oField: ', oField);
        let scroll = oField.currentTarget;
        console.log('scroll: ', scroll);
        debugger;

        scroll.style.height = 0 + "px";
        scroll.style.height = scroll.scrollHeight + "px";

        //     if (scroll.scrollHeight > scroll.clientHeight) {
        //         scroll.style.height = scroll.scrollHeight + "px";
        //     } else {
        //         scroll.style.height = 0 + "px";
        //         scroll.style.height = scroll.scrollHeight + "px";
        //     }
    }


    render() {
        const { username, password, post } = this.state;

        const errors = this.validate(username, password, post);
        const isEnabled = !Object.keys(errors).some(x => errors[x])

        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];

            return hasError ? shouldShow : false;
        }

        return (
            <Fragment >

                
                <div className="main-article-shared-content-image">
                    <img src={benderPic} alt="" />
                </div>
                {/* <div className="comment-input"> */}
                <div className="comment-input textarea-container">
                    {/* <div className="comment-input textarea-container"> */}
                    <textarea
                    // type="text"
                    // id="post1"
                    // name="post"
                    // style={{ 'overflow': 'hidden', 'border': 'none', 'resize': 'none' }}
                    // onInput={(e) => { e.currentTarget.style.height = ''; e.currentTarget.style.height = e.currentTarget.scrollHeight + "px" }}
                    // value={this.state.post}
                    // onChange={this.onChangeHandler}
                    // onBlur={this.handleBlur('post')}
                    // aria-describedby="postHelp"
                    // placeholder="What's on your mind?"

                    > </textarea>
                    {/* {shouldMarkError('post') && <small id="postHelp" className="form-text alert alert-danger">Post content is required!</small>} */}
                    {/* <input type="text" placeholder="Write a comment..." /> */}
                </div>

                <div className="write-comment">
                    <div className="comment">
                        <div className="main-article-shared-content-image">
                            <img src={benderPic} alt="" />
                        </div>
                        <div className="comment-input">
                            <textarea name="text" style={{ 'overflow': 'hidden', 'border': 'none', 'resize': 'none' }} onInput={(e) => { e.currentTarget.style.height = ''; e.currentTarget.style.height = e.currentTarget.scrollHeight + "px" }}></textarea>
                            {/* <input type="text" placeholder="Write a comment..." /> */}
                        </div>
                    </div>
                </div>

                {/* <textarea name="text" style={{ 'overflow': 'hidden', 'border': 'none', 'resize': 'none' }} onInput={(e) => { e.currentTarget.style.height = ''; e.currentTarget.style.height = e.currentTarget.scrollHeight + "px" }}></textarea> */}
                {/* <input type="text" placeholder="Write a comment..." /> */}
                <article className="main-article-shared-content">

                    <section className="main-article-comments-section">

                        <div className="container pt-5">

                            <h1 className="mt-5 mb-5 text-center font-weight-bold ">Login</h1>
                            <form className="Login-form-container" onSubmit={this.onSubmitHandler}>

                                <div className="write-comment form-group">
                                        {/* <div className="comment"> */}
                                        <div className="">
                                            <div className="main-article-shared-content-image">
                                                <img src={benderPic} alt="" />
                                            </div>
                                            <div className="">
                                                <textarea
                                                    name="post"
                                                    id="post"
                                                    style={{ 'overflow': 'hidden', 'border': 'none', 'resize': 'none' }}
                                                    onInput={(e) => { e.currentTarget.style.height = ''; e.currentTarget.style.height = e.currentTarget.scrollHeight + "px" }}
                                                    value={this.state.post}
                                                    onChange={this.onChangeHandler}
                                                    onBlur={this.handleBlur('post')}
                                                    aria-describedby="postHelp"
                                                    placeholder="What's on your mind?"
                                                >
                                                </textarea>
                                                {shouldMarkError('post') && <small id="postHelp" className="form-text alert alert-danger">Post content is required!</small>}


                                                {/* <input type="text" placeholder="Write a comment..." /> */}
                                            </div>
                                        </div>

                                </div>
                                <div className="form-group">
                                    {/* <label htmlFor="username" className={(shouldMarkError('username') ? "error-text-label" : "")}>Username</label> */}
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        className={"form-control " + (shouldMarkError('username') ? "error" : "")}
                                        id="username"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChangeHandler}
                                        onBlur={this.handleBlur('username')}
                                        aria-describedby="usernameHelp"
                                        placeholder="Enter username"
                                    />
                                    {shouldMarkError('username') && <small id="usernameHelp" className="form-text alert alert-danger">Username is required!</small>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password" >Password</label>
                                    <input
                                        type="password"
                                        className={"form-control " + (shouldMarkError('password') ? "error" : "")}
                                        id="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangeHandler}
                                        onBlur={this.handleBlur('password')}
                                        aria-describedby="passwordHelp"
                                        placeholder="Enter password"
                                    />
                                    {shouldMarkError('password') && <small id="passwordHelp" className="form-text alert alert-danger">Password is required!</small>}
                                </div>

                                <div className="text-center">
                                    <button disabled={!isEnabled} type="submit" className="btn App-button-primary btn-lg m-3">Login</button>
                                </div>

                            </form>

                            {/* <p>{JSON.stringify(this.state, null, 2)}</p> */}

                        </div>



                    </section>

                    <section className="main-article-content-section">
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
                            {/* <!-- <div className="comment"> --> */}
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
                            {/* <!-- </div> --> */}
                        </div>
                        <div className="main-article-comments-container">
                            {/* <!-- <div className="comment"> --> */}
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
                            {/* <!-- </div> --> */}
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
                    </section>
                </article>
            </Fragment>
        )
    }

}

export default MainSharedContent;