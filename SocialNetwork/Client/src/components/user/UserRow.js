import React from 'react';
import { userService } from '../../infrastructure'

const UserRow = (props) => {
    return (
        <tr className="row" >
            <td className="col-md-1 font-weight-bold" >
                {props.index}
            </td>
            <td className="col-md-2 username-color" >
                {props.username}
            </td>
            <td className="col-md-2" >
                {props.role}
            </td>
            <td className="col-md-7 d-flex justify-content-center" >
                {(!userService.checkIfIsRoot(props.role) && !userService.isLoggedInUser(props.username)) &&
                    <h5>
                        <button className="btn App-button-primary  m-1" onClick={props.promote.bind(this, props.id)} >Promote</button>
                    </h5>}
                {(!userService.checkIfIsRoot(props.role) && !userService.isLoggedInUser(props.username)) &&
                    <h5>
                        <button className="btn App-button-primary  m-1" onClick={props.demote.bind(this, props.id)} >Demote</button>
                    </h5>}
                <h5>
                    <button className="btn App-button-primary  m-1" onClick={props.changeTimeLineUser.bind(this, props.id)} >Profile</button>
                </h5>
            </td>
        </tr>
    )
}

export default UserRow;


