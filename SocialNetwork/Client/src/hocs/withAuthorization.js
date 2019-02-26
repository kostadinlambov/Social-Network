import React, { Component } from 'react';
import userService from '../infrastructure/userService'
import ErrorPage from '../components/common/ErrorPage';
import { Redirect } from 'react-router-dom'


function withAuthorization(WrapperComponent, roles) {
    return class WithAuthorization extends Component {
        constructor(props) {
            super(props);

            this.state = {
                userRoles: [],
                ready: false
            }
        }

        componentDidMount = () => {
            let currentUserRoles = userService.getRole();
            debugger;
            if(currentUserRoles){
                this.setState({
                    userRoles: currentUserRoles.split(','),
                    ready: true 
                })
            }
        }

        render = () => {
            debugger;
            if(!this.state.ready){
                return <h1 className="pt-5">Loading...</h1>
            }
            let userHasAccess = false;
            debugger;
            for (let role of roles){
                userHasAccess = userHasAccess || this.state.userRoles.indexOf(role) !== -1;
            }
            debugger;
            if(userHasAccess){
                debugger
                return <WrapperComponent {...this.props} /> 
            }else{
                debugger;
                // this.props.history.push('/error');
                // return null;

                // return <ErrorPage {...this.props}/>
                return <Redirect to="/error" {...this.props} />
            }

        }
    }
}

export function withUserAuthorization(Component) {
    return withAuthorization(Component, ['USER', 'ADMIN', 'ROOT'])
}

export function withAdminAuthorization(Component) {
    return withAuthorization(Component, ['ADMIN', 'ROOT'])
}

export function withRootAuthorization(Component) {
    return withAuthorization(Component, ['ROOT'])
}
