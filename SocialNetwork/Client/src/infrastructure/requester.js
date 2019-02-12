import React from 'react';
import observer from './observer';
import { toast } from 'react-toastify';
import { ToastComponent } from '../components/common';

const BASE_URL = 'http://localhost:8000';

export default {
    get: (endpoint, callback) => {
        fetch(BASE_URL + endpoint)
            .then(data => data.json())
            .then(callback)
            .catch(error => {
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(callback)
            .catch(error => {
                toast.error(<ToastComponent.errorToast text={`Internal Server Error: ${error.message}`} />, {
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
                'Content-Type': 'application/json'
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
                'Content-Type': 'application/json'
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
                'Content-Type': 'application/json'
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
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}