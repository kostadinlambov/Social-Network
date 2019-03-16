// import React, { Fragment } from 'react';
// import FriendRequest from './../user/FriendRequest';

// const FriendRequestList = (props) => {


//     return (


//         <Fragment>
//             <h3>Respond to Your Friend Requests</h3>
//             <hr className="my-2 mb-5 mt-2 col-md-8 mx-auto" />
//             {this.state.userWaitingForAcceptingRequest.map((friend) =>
//                 <FriendRequest
//                     key={friend.id}
//                     {...friend}
//                     {...this.props}
//                     firstButtonText={'CONFIRM'}
//                     secondButtonText={'REJECT'}
//                     thirdButtonText={'VIEW PROFILE'}
//                     firstButtonOnClick={this.confirmRequest}
//                     secondButtonOnClick={this.rejectRequest}
//                     thirdButtonLink={`/home/profile/${friend.id}`}
//                 />)}
//             <hr className="my-2 mb-5 mt-3 col-md-12 mx-auto" />
//         </Fragment>
//     )

// }

// export default FriendRequestList;