import React, {Component} from 'react';
import observer from './observer';
import { toast } from 'react-toastify';
import { ToastComponent } from '../components/common';
import {Redirect} from 'react-router-dom';

const BASE_URL = 'http://localhost:8000';

const getAuthHeader = () => {
    const token = localStorage.getItem("token");

    return (token && token.length)
        ? { 'Authorization': `Bearer ${token}` }
        : {}

}


export default {
    get: (endpoint, callback) => {
        debugger;
        fetch(BASE_URL + endpoint, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                ...getAuthHeader(),
            },
        })
            .then(checkStatus)
            // .then(data => data.json())
            .then(callback)
            .catch(error => {
                debugger;
                // observer.trigger(observer.events.notification, { type: 'success', message: err })
                toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${error.message}`} />, {
                    // toast.error(<ToastComponent.errorToast text={`${error.name}: ${error.message}`} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                console.log('Fetch Error (GET): ', error)
            })
    },


    post: (endpoint, data, callback) => {
        fetch(BASE_URL + endpoint, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },

            body: JSON.stringify(data)
        })
            .then(checkStatus)
            // .then(res => res.json())
            .then(callback)
            .catch(error => {
                debugger;
                toast.error(<ToastComponent.errorToast text={`${error.message}`} />, {
                    // toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${error.message}`} />, {
                    // toast.error(<ToastComponent.errorToast text={`${error.name}: ${error.message}`} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
                // observer.trigger(observer.events.notification, { type: 'success', message: error })
                console.log('Fetch Error (POST): ', error);

            })
    },

    put: (endpoint, data, callback) => {
        fetch(BASE_URL + endpoint, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },
            body: JSON.stringify(data)
        })

            .then(res => res.json())
            .then(callback)
            // .then(()=>console.log('updated!!!'))
            .catch(error => {

                toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${error.message}`} />, {
                    // toast.error(<ToastComponent.errorToast text={`${error.name}: ${error.message}`} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
                // observer.trigger(observer.events.notification, { type: 'success', message: error })
                console.log('Fetch Error (PUT): ', error);
            })
    },

    delete: (endpoint, data, callback) => {
        fetch(BASE_URL + endpoint, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },
            body: JSON.stringify(data)
        })

            .then(res => res.json())
            .then(callback)
            // .then(()=>console.log('updated!!!'))
            .catch(error => {

                toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${error.message}`} />, {
                    // toast.error(<ToastComponent.errorToast text={`${error.name}: ${error.message}`} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

                // observer.trigger(observer.events.notification, { type: 'success', message: error })
                console.log('Fetch Error (DELETE): ', error);
            })
    },

    update: (data) => {
        return fetch(BASE_URL + '/users/update', {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            }
        })
            .then(checkStatus)
            .then(() => console.log('updated!!!'))
            .catch(err => {
                console.log(err)
            })
    }
}


function checkStatus(response) {
    debugger;
    if (response.status >= 200 && response.status < 300) {
        return response.json()
    } else {
        var error = new Error(response.statusText);
        debugger;
        if (response.status === 403 && response.url === 'http://localhost:8000/login') {
            error.message = 'Incorrect credentials!';
            error.response = response;
            throw error;
        } else if (response.status === 403 && response.type === 'cors') {
            console.log('err response: ', response)
            error.message = 'Your JWT token is expired. Please log in!'
            error.status = 403;
            error.type = 'cors'
            // error.response = response;
            // <Redirect to='/login' /> 
            // this.props.history.push();
            throw error;

        }
        else {
            return response.json();
        }

    }
}

// switch (err.status) {

//     case 400:
//         console.log('err:', err);

//         if (err.error.errors) {
//             for (const e of Object.values(err.error.errors)) {
//                 this.toastrService.error(e.toString(), 'Error!');
//             }
//         }
//         // else {
//         //     this.toastrService.error(err['error']['message'], 'Error!');
//         // }
//         this.toastrService.error(err['error']['message'], 'Error!');

//         break;
//     case 401:
//         if (err.error.errors) {
//             for (const e of Object.values(err.error.errors)) {
//                 this.toastrService.error(e.toString(), 'Error!');
//             }
//         }
//         this.toastrService.error(err['error']['message'], 'Error!');
//         break;
//     case 403:
//         this.toastrService.error('Incorrect credentials.', 'Error!');
//         localStorage.clear();
//         this.router.navigate(['/home']);
//         break;
//     case 404:
//         this.toastrService.error(err['error']['message'], 'Error!');
//         this.router.navigate(['/page-not-found']);
//         break;

//     case 500:
//         this.toastrService.error(err['error']['message'], 'Error!');
//         // this.router.navigate(['/server-error']);
//         break;
//     default:
//         // this.toastrService.error('Server error.', 'Error!');
//         this.toastrService.error(err['error']['message'], 'Error!');
//         this.router.navigate(['/page-not-found']);
//         break;
// }

// function checkStatus(response) {
//     if (response.status >= 200 && response.status < 300) {
//         return response
//     } else {
//         var error = new Error(response.statusText);
//         error.response = response;
//         throw error;
//     }
// }
