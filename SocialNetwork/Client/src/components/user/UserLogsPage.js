import React, { Component, Fragment } from 'react';
import LogsRow from './LogsRow';
import { userService } from '../../infrastructure';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import './css/UserLogsPage.css';
import { css } from '@emotion/core';
import { CircleLoader } from 'react-spinners';

import { connect } from 'react-redux';
import { changeCurrentTimeLineUserAction, changeAllFriendsAction } from '../../store/actions/userActions';
import { changeAllPicturesAction } from '../../store/actions/pictureActions';
import { fetchAllLogsAction, findLogsByUserNameAction, clearLogsByUserNameAction, clearAllLogsAction } from '../../store/actions/logsActions';

const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
`;

class UserLogsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: '',
            selected: '',
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.loadAllLogs = this.loadAllLogs.bind(this);
        this.searchLogs = this.searchLogs.bind(this);
        this.clearAllLogs = this.clearAllLogs.bind(this);
        this.clearSelectedLogs = this.clearSelectedLogs.bind(this);
    }

    componentDidMount() {
        this.loadAllLogs();

        const loggedInUserId = userService.getUserId();
        if (loggedInUserId !== this.props.timeLineUserData.id) {
            this.props.changeTimeLineUser(loggedInUserId);
            this.props.changeAllPictures(loggedInUserId);
            this.props.changeAllFriends(loggedInUserId);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const errorMessage = this.getErrorMessage(prevProps);
        const successMessage = this.getSuccessMessage(prevProps)

        if (errorMessage) {
            toast.error(<ToastComponent.errorToast text={errorMessage} />, {
                position: toast.POSITION.TOP_RIGHT
            });
        } else if (successMessage) {
            console.log('this.state: ', this.state)
            toast.success(<ToastComponent.successToast text={successMessage} />, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    getSuccessMessage(prevProps) {
        if (!this.state.search && !this.props.fetchAllLogs.hasError && this.props.fetchAllLogs.message && this.props.fetchAllLogs !== prevProps.fetchAllLogs) {
            return this.props.fetchAllLogs.message;
        } else if (!this.props.findLogsByUserName.hasError && this.props.findLogsByUserName.message && this.props.findLogsByUserName !== prevProps.findLogsByUserName) {
            return this.props.findLogsByUserName.message;
        } else if (!this.props.clearLogsByUserName.hasError && this.props.clearLogsByUserName.message && this.props.clearLogsByUserName !== prevProps.clearLogsByUserName) {
            this.setState({
                selected: '',
                search: '',
            })
            return this.props.clearLogsByUserName.message;
        } else if (!this.props.clearAllLogs.hasError && this.props.clearAllLogs.message && this.props.clearAllLogs !== prevProps.clearAllLogs) {
            this.setState({
                selected: '',
                search: '',
            })

            return this.props.clearAllLogs.message;
        }

        return null;
    }

    getErrorMessage(prevProps) {
        if (this.props.fetchAllLogs.hasError && prevProps.fetchAllLogs.error !== this.props.fetchAllLogs.error) {
            return this.props.fetchAllLogs.message || 'Server Error';
        }
        else if (this.props.findLogsByUserName.hasError && prevProps.findLogsByUserName.error !== this.props.findLogsByUserName.error) {
            this.setState({
                selected: '',
            })
            return this.props.findLogsByUserName.message || 'Server Error';
        } else if (this.props.clearLogsByUserName.hasError && prevProps.clearLogsByUserName.error !== this.props.clearLogsByUserName.error) {
            return this.props.clearLogsByUserName.message || 'Server Error';
        } else if (this.props.clearAllLogs.hasError && prevProps.clearAllLogs.error !== this.props.clearAllLogs.error) {
            return this.props.clearAllLogs.message || 'Server Error';
        }

        return null;
    }

    onChangeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    loadAllLogs = () => {
        this.setState({
            selected: '',
            search: '',
        }, () => this.props.loadAllLogs())
    }

    searchLogs = () => {
        const search = this.state.search;
        if (!search) {
            this.props.loadAllLogs();
        } else {
            this.setState({
                selected: search,
            }, () => this.props.loadLogsByUserName(search))
        }
    }

    clearAllLogs = () => {
        this.props.deleteAllLogs();
    }

    clearSelectedLogs = () => {
        const selected = this.state.selected;
        if (!selected) {
            return;
        }

        this.props.deleteLogsByUserName(selected);
    }

    render() {
        const loading = this.props.fetchAllLogs.loading || this.props.findLogsByUserName.loading
            || this.props.clearLogsByUserName.loading || this.props.clearAllLogs.loading;

        if (loading) {
            // return <h1 className="text-center pt-5 mt-5">Loading...</h1>
        }

        const selected = this.state.selected;

        return (
            <Fragment >
                <article className="main-article-shared-content">
                    <section className="logs-content-section">
                        <div className="container col-md-11 text-center mx-auto mb-4">
                            <h1 className="text-center font-weight-bold mt-4" style={{ 'margin': '1rem auto' }}>Server Logs History</h1>
                            <div className="hr-styles"></div>

                            <div className="col-md-4 mx-auto mb-3" >
                                <label className="form-control-label font-weight-bold" htmlFor="search">Enter Username:</label>
                                <input
                                    className="form-control mx-auto"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    name="search"
                                    id="search"
                                    value={this.state.search}
                                    onChange={this.onChangeHandler}
                                    style={{ background: '#EEE' }}
                                />
                            </div>

                            <div className="col-md-5 d-flex justify-content-center mx-auto mb-5" >
                                <h5>
                                    <button className="btn update-info m-1" onClick={this.searchLogs} >SEARCH</button>
                                </h5>

                                <h5>
                                    <button className="btn update-info m-1" onClick={this.loadAllLogs} >ALL LOGS</button>
                                </h5>
                                {userService.isRoot() && this.props.logsArr.length > 0 &&
                                    <h5>
                                        <button className="btn update-info m-1" onClick={this.clearAllLogs} >CLEAR ALL</button>
                                    </h5>}

                                {userService.isRoot() && selected &&
                                    <h5>
                                        <button className="btn update-info m-1" onClick={this.clearSelectedLogs} >CLEAR SELECTED</button>
                                    </h5>}
                            </div>

                            {this.props.logsArr.length > 0
                                ?
                                <table className="table table-hover mt-3 w-80 mx-auto text-center">
                                    <thead>
                                        <tr className="row " >
                                            <th className="col-md-1 " scope="col">#</th>
                                            <th className="col-md-2" scope="col">Username</th>
                                            <th className="col-md-2 " scope="col">Method</th>

                                            <th className="col-md-2 " scope="col">Action</th>
                                            <th className="col-md-2" scope="col">Modified Table</th>

                                            <th className="col-md-3 " scope="col">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading
                                            ?
                                            <CircleLoader
                                                css={override}
                                                sizeUnit={"px"}
                                                size={150}
                                                color={'#61dafb'}
                                                loading={true}
                                            /> :

                                            this.props.logsArr.map((log, i) => <LogsRow key={log.id} index={i + 1} {...this.props} {...log} />)}
                                    </tbody>
                                </table>
                                :
                                loading ?
                                    <Fragment>
                                        <CircleLoader
                                            css={override}
                                            sizeUnit={"px"}
                                            size={150}
                                            color={'#61dafb'}
                                            loading={true}
                                        />
                                    </Fragment> :
                                    <Fragment>
                                        <div className="hr-styles"></div>
                                        <h3 className="mt-5 mb-5 mx-auto display-5 text-center App-secondary-color">Logs history is empty. </h3>
                                        <div className="hr-styles"></div>
                                    </Fragment>
                            }
                        </div>
                    </section>
                </article>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        timeLineUserData: state.timeLineUserData,
        loggedInUserData: state.loggedInUserData,

        fetchAllLogs: state.fetchAllLogs,
        logsArr: state.fetchAllLogs.logsArr,

        findLogsByUserName: state.findLogsByUserName,
        clearLogsByUserName: state.clearLogsByUserName,
        clearAllLogs: state.clearAllLogs,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTimeLineUser: (userId) => { dispatch(changeCurrentTimeLineUserAction(userId)) },
        changeAllFriends: (userId) => { dispatch(changeAllFriendsAction(userId)) },
        changeAllPictures: (userId) => { dispatch(changeAllPicturesAction(userId)) },

        loadAllLogs: () => { dispatch(fetchAllLogsAction()) },
        loadLogsByUserName: (search) => { dispatch(findLogsByUserNameAction(search)) },
        deleteLogsByUserName: (selected) => { dispatch(clearLogsByUserNameAction(selected)) },
        deleteAllLogs: () => { dispatch(clearAllLogsAction()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogsPage);