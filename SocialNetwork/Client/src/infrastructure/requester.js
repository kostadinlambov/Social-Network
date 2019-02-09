import observer from './observer'

const BASE_URL = 'http://localhost:8000';

export default {
    get: (endpoint, callback) => {
        fetch(BASE_URL + endpoint)
            .then(data => data.json())
            .then(callback)
            .catch(err => {
                observer.trigger(observer.events.notification, { type: 'success', message: err })

                console.log('Fetch Error (GET): ', err)
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

                // observer.trigger(observer.events.notification, { type: 'success', message: error })
                console.log('Fetch Error (POST): ', error)
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

                // observer.trigger(observer.events.notification, { type: 'success', message: error })
                console.log('Fetch Error (PUT): ', error)
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

                // observer.trigger(observer.events.notification, { type: 'success', message: error })
                console.log('Fetch Error (DELETE): ', error)
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
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}