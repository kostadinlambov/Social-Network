import React, { Component, Fragment } from 'react';
import LogsRow from './LogsRow';
import { userService, requester } from '../../infrastructure';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import './css/UserLogsPage.css';

export default class UserLogsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            logsArr: [],
            search: '',
            selected: '',
            id: '',
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.loadAllLogs = this.loadAllLogs.bind(this);
        this.searchLogs = this.searchLogs.bind(this);
        this.clearAllLogs = this.clearAllLogs.bind(this);
        this.clearSelectedLogs = this.clearSelectedLogs.bind(this);
    }

    componentDidMount() {
        const userId = this.props.match.params.id;
        this.loadAllLogs();
        this.setState({
            id: userId
        })
    }

    onChangeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    loadAllLogs = () => {
        requester.get('/logs/all', (response) => {
            if (response) {
                this.setState({
                    logsArr: response,
                    selected: '',
                    search: '',
                })
            } else {
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }).catch(err => {
            toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
                this.props.history.push('/login');
            }
        })
    }

    searchLogs = () => {
        const search = this.state.search;
        if (!search) {
            this.loadAllLogs();
        } else {
            requester.get('/logs/findByUserName/' + search, (response) => {
                if (response.error) {
                    toast.error(<ToastComponent.errorToast text={response.message} />, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                } else {
                    toast.success(<ToastComponent.successToast text={`Successfully loaded logs for "${this.state.search}".`} />, {
                        position: toast.POSITION.TOP_RIGHT
                    });

                    this.setState({
                        logsArr: response,
                        selected: search,
                    })
                }
            }).catch(err => {
                console.error('search logs err:', err)
                toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                    localStorage.clear();
                    this.props.history.push('/login');
                }
            })
        }
    }

    clearAllLogs = () => {
        debugger;
        requester.delete('/logs/clear', {}, (response) => {
            if (response.success) {
                this.setState({
                    logsArr: [],
                    selected: '',
                    search: '',
                })
                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }).catch(err => {
            toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
                this.props.history.push('/login');
            }
        })
    }

    clearSelectedLogs = () => {
        const selected = this.state.selected;
        if (!selected) {
            return;
        }
        requester.delete('/logs/clearByName/' + selected, {}, (response) => {
            if (response.success) {
                this.setState({
                    logsArr: [],
                }, this.loadAllLogs())

                toast.success(<ToastComponent.successToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {
                toast.error(<ToastComponent.errorToast text={response.message} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }).catch(err => {
            toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${err.message}`} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
                this.props.history.push('/login');
            }
        })
    }

    render() {
        if (this.props.match.params.id !== this.props.id) {
            this.props.getUserToShowId(this.props.match.params.id);
        }

        const selected = this.state.selected;

        return (
            <Fragment >
                <article className="main-article-shared-content">
                    <section className="logs-content-section">
                        <div className="container col-md-11 text-center mx-auto mb-4">
                            <h1 className="text-center font-weight-bold mt-4" style={{ 'margin': '1rem auto' }}>Server Logs History</h1>
                            <div className="hr-styles"></div>

                            {/* <form className="form-inline my-2 my-lg-0" onSubmit={this.searchFriend}> */}
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
                            {/* </form> */}

                            <div className="col-md-5 d-flex justify-content-center mx-auto mb-5" >
                                <h5>
                                    <button className="btn update-info m-1" onClick={this.searchLogs} >SEARCH</button>
                                </h5>

                                <h5>
                                    <button className="btn update-info m-1" onClick={this.loadAllLogs} >ALL LOGS</button>
                                </h5>
                                {userService.isRoot() &&
                                    <h5>
                                        <button className="btn update-info m-1" onClick={this.clearAllLogs} >CLEAR ALL</button>
                                    </h5>}

                                {userService.isRoot() && selected &&
                                    <h5>
                                        <button className="btn update-info m-1" onClick={this.clearSelectedLogs} >CLEAR SELECTED</button>
                                    </h5>}
                            </div>

                            {this.state.logsArr.length > 0
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
                                        {this.state.logsArr.map((log, i) => <LogsRow key={log.id} index={i + 1} {...this.props} {...log} />)}
                                    </tbody>
                                </table>
                                :
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