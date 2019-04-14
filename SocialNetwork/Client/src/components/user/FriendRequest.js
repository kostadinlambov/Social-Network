import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { userService } from '../../infrastructure';
import default_background_image from '../../assets/images/default-background-image.jpg';
import placeholder_user_image from '../../assets/images/placeholder.png';

export default class FriendRequest extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            username: '',
            profilePicUrl: '',
            backgroundImageUrl: '',
            firstButtonText: '',
            secondButtonText: '',
            firstButtonLink: '',
            secondButtonLink: '',
            firstButtonOnClick: '',
            secondButtonOnClick: '',
            status: '',
            actionUser: '',
            ready: false,
        }
    }

    componentDidMount() {
        this.setState({ ...this.props, ready: true })
    }

    render = () => {
        if (!this.state.ready) {
            return null;
        }

        const { id, firstName, lastName, firstButtonText, secondButtonText, firstButtonLink, secondButtonLink,
            firstButtonOnClick, secondButtonOnClick, thirdButtonText, thirdButtonLink, thirdButtonOnClick } = this.state;
        const backgroundImageUrl = this.state.backgroundImageUrl || default_background_image
        const profilePicUrl = this.state.profilePicUrl || placeholder_user_image
        const formattedName = userService.formatUsername(firstName, lastName, 18)

        let imgClassName = '';
        if (profilePicUrl) {
            imgClassName = userService.getImageSize(profilePicUrl);
        }

        return (
            <div className="friend-container" style={{ 'backgroundImage': `url(${backgroundImageUrl})` }}>
                <span className="friend-img-container">
                    <img className={imgClassName} src={profilePicUrl} alt="Profile pic" />
                </span>
                <div className="friend-content">
                    <h2 className="friend-text-shadow" >{`${formattedName}`}</h2>
                    <div className="friend-button-container">
                        {!firstButtonOnClick
                            ? <button className="button update-info" >
                                <NavLink to={firstButtonLink}>{firstButtonText}</NavLink>
                            </button>

                            : <button
                                className="button update-info"
                                onClick={firstButtonOnClick.bind(this, id)} >
                                {firstButtonText}
                            </button>
                        }

                        {!secondButtonOnClick
                            ?
                            <button className="button update-info">
                                <NavLink to={secondButtonLink}>{secondButtonText}</NavLink>
                            </button>

                            : <button
                                className="button update-info"
                                onClick={secondButtonOnClick.bind(this, id)} >
                                {secondButtonText}
                            </button>
                        }

                        {!thirdButtonOnClick
                            ?
                            <button className="button update-info">
                                <NavLink to={thirdButtonLink}>{thirdButtonText}</NavLink>
                            </button>

                            : <button
                                className="button update-info"
                                onClick={thirdButtonOnClick.bind(this, id)} >
                                {secondButtonText}
                            </button>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

