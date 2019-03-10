// import React, { Component, Fragment } from 'react';
// import { NavLink } from 'react-router-dom';
// import { requester, userService } from '../../infrastructure';
// import { toast } from 'react-toastify';
// import { ToastComponent } from '../common';
// import default_background_image from '../../assets/images/default-background-image.jpg';
// import placeholder_user_image from '../../assets/images/placeholder-profile-male.jpg';

// export default class FriendRequest extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             id: '',
//             firstName: '',
//             lastName: '',
//             username: '',
//             profilePicUrl: '',
//             backgroundImageUrl: '',
//             firstButtonText: '',
//             secondButtonText: '',
//             firstButtonLink: '',
//             secondButtonLink: '',
//             firstButtonOnClick: '',
//             secondButtonOnClick: '',
//             status: '',
//             actionUser: '',
//             ready: false,
//         }

//         this.confirmRequest = this.confirmRequest.bind(this);
//         this.rejectRequest = this.rejectRequest.bind(this);
//     }

//     componentDidMount() {
//         // this.setState({ ...this.props, ready: true })

//         const userId = this.props.match.params.id;
//         debugger;
//         requester.get(`/relationship/findFriends/${userId}`, (response) => {
//             debugger;
//             console.log('friends all: ', response);

//             this.setState({
//                 userWaitingForAcceptingRequest: response.filter(user => user.status === 0 && user.starterOfAction === true),
//             })

//             console.log('response: ', response)
//             console.log('userWaitingForAcceptingRequest: ', this.state.userWaitingForAcceptingRequest)
//             debugger;
//         }).catch(err => {
//             console.error('deatils err:', err)
//             toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
//                 // toast.error(<ToastComponent.errorToast text={`${error.name}: ${error.message}`} />, {
//                 position: toast.POSITION.TOP_RIGHT
//             });

//             if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
//                 localStorage.clear();
//                 this.props.history.push('/login');
//             }
//         })

//     }

//     confirmRequest = (event) => {
//         console.log('event: ', event)
//         console.log('friendToAcceptId: ', this.state.id)

//         event.preventDefault();

//         // const id = this.state.id;
//         const requestBody = { loggedInUserId: userService.getUserId(), friendToAcceptId: this.state.id }

//         console.log('requestBody: ', requestBody)

//         requester.post('/relationship/acceptFriend', requestBody, (response) => {
//             console.log('AcceptFriend response: ', response)
//             debugger;
//             if (response.success) {
//                 toast.success(<ToastComponent.successToast text={response.message} />, {
//                     position: toast.POSITION.TOP_RIGHT
//                 });

//                 this.props.history.push("/home/findFriends/" + userService.getUserId())

//             } else {
//                 debugger;
//                 console.log('error message: ', response.message);
//                 toast.error(<ToastComponent.errorToast text={response.message} />, {
//                     position: toast.POSITION.TOP_RIGHT
//                 });
//             }
//         }).catch(err => {
//             debugger;
//             console.error('Remove Friend err:', err)
//             toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
//                 position: toast.POSITION.TOP_RIGHT
//             });

//             if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
//                 localStorage.clear();
//                 this.props.history.push('/login');
//             }
//         })
//     }

//     rejectRequest = (event) => {
//         console.log('event: ', event)
//         console.log('friendToRejectId: ', this.state.id)

//         event.preventDefault();

//         // const id = this.state.id;
//         const requestBody = { loggedInUserId: userService.getUserId(), friendToRejectId: this.state.id }

//         console.log('requestBody: ', requestBody)

//         requester.post('/relationship/cancelRequest', requestBody, (response) => {
//             console.log('RejectFriend response: ', response)
//             debugger;
//             if (response.success) {
//                 toast.success(<ToastComponent.successToast text={response.message} />, {
//                     position: toast.POSITION.TOP_RIGHT
//                 });

//                 this.props.history.push("/home/findFriends/" + userService.getUserId())

//             } else {
//                 debugger;
//                 console.log('error message: ', response.message);
//                 toast.error(<ToastComponent.errorToast text={response.message} />, {
//                     position: toast.POSITION.TOP_RIGHT
//                 });
//             }
//         }).catch(err => {
//             debugger;
//             console.error('Remove Friend err:', err)
//             toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
//                 position: toast.POSITION.TOP_RIGHT
//             });

//             if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
//                 localStorage.clear();
//                 this.props.history.push('/login');
//             }
//         })
//     }

//     render = () => {
//         if (!this.state.ready) {
//             return null;
//         }

//         const { id, firstName, lastName, firstButtonText, secondButtonText, firstButtonLink, secondButtonLink,
//             firstButtonOnClick, secondButtonOnClick, thirdButtonText, thirdButtonLink, thirdButtonOnClick } = this.state;

//         const backgroundImageUrl = this.state.backgroundImageUrl || default_background_image
//         const profilePicUrl = this.state.profilePicUrl || placeholder_user_image

//         let imgClassName = '';
//         if (profilePicUrl) {
//             imgClassName = userService.getImageSize(profilePicUrl);
//         }
//         const requestLength = this.state.userWaitingForAcceptingRequest.length;
//         let requests = '';

//         if (requestLength > 0) {
//             requests = (
//                 <Fragment>
//                     <h3>Respond to Your Friend Requests</h3>
//                     <hr className="my-2 mb-5 mt-2 col-md-8 mx-auto" />
//                     {/* <FriendRequestList userArr={this.state.userWaitingForAcceptingRequest}   /> */}
//                     {this.state.userWaitingForAcceptingRequest.map((friend) =>
//                         <FriendRequest
//                             key={friend.id}
//                             {...friend}
//                             {...this.props}
//                             // firstButtonText={'CONFIRM'}
//                             // secondButtonText={'REJECT'}
//                             // thirdButtonText={'VIEW PROFILE'}
//                             firstButtonOnClick={this.confirmRequest}
//                             secondButtonOnClick={this.rejectRequest}
//                             thirdButtonLink={`/home/profile/${friend.id}`}
//                         />)}
//                     <hr className="my-2 mb-5 mt-3 col-md-12 mx-auto" />
//                 </Fragment>
//             )
//         }

//         return (
//             <Fragment>
//                 <h3>Respond to Your Friend Requests</h3>
//                 <hr className="my-2 mb-5 mt-2 col-md-8 mx-auto" />
//                 {this.state.userWaitingForAcceptingRequest.map((friend) =>
//                     <div className="friend-container" style={{ 'backgroundImage': `url(${backgroundImageUrl})` }}>
//                         <span className="friend-img-container">
//                             <img className={imgClassName} src={profilePicUrl} alt="Profile pic" />
//                         </span>
//                         <div className="friend-content">
//                             <h2 className="friend-text-shadow" >{`${friend.firstName} ${friend.lastName}`}</h2>
//                             <div className="friend-button-container">
//                                 {!firstButtonOnClick
//                                     ? <button className="button update-info" >
//                                         <NavLink to={firstButtonLink}>CONFIRM</NavLink>
//                                     </button>

//                                     : <button
//                                         className="button update-info"
//                                         onClick={this.confirmRequest} >
//                                         CONFIRM
//                                     </button>
//                                 }

//                                 {!secondButtonOnClick
//                                     ?
//                                     <button className="button update-info">
//                                         <NavLink to={secondButtonLink}>REJECT</NavLink>
//                                     </button>

//                                     : <button
//                                         className="button update-info"
//                                         onClick={this.rejectRequest} >
//                                         REJECT
//                                     </button>
//                                 }

//                                 {!thirdButtonOnClick
//                                     ?
//                                     <button className="button update-info">
//                                         <NavLink to={`/home/profile/${friend.id}`}>VIEW PROFILE</NavLink>
//                                     </button>

//                                     : <button
//                                         className="button update-info"
//                                         onClick={thirdButtonOnClick.bind(this, id)} >
//                                         VIEW PROFILE
//                                     </button>
//                                 }
//                             </div>
//                         </div>
//                     </div>

//                 )

//                 }
//             </Fragment>
//         )

//     }
// }

