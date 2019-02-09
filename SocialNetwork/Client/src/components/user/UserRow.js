import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {userService} from '../../infrastructure'



const UserRow = (props) => {
    debugger;
    
    return (
        <tr className="row" >
            <td className="col-md-1" >
                <h5>{props.index}</h5>
            </td>
            <td className="col-md-3" >
                <h5>{props.username}</h5>
            </td>
            <td className="col-md-3" >
                <h5>{props.role}</h5>
            </td>
            <td className="col-md-5 d-flex justify-content-center" >
               {(!userService.checkIfIsRoot(props.role) && !userService.isLoggedInUser(props.username)) &&
                 <h5>
                    <button className="btn App-button-primary btn-lg m-1" onClick={props.promote} >Promote</button>
                </h5>} 
                {(!userService.checkIfIsRoot(props.role) && !userService.isLoggedInUser(props.username)) &&
                <h5>
                    <button className="btn App-button-primary btn-lg m-1" onClick={props.demote} >Demote</button>
                </h5>}
                <h5>
                <NavLink className="btn App-button-primary btn-lg m-1" to={`/profile/${props.id}`} role="button">Profile</NavLink>
                </h5>
            </td>
        </tr>
    )

}


export default UserRow;