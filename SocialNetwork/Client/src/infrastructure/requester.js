import observer from './observer'

const BASE_URL = 'http://localhost:8000';

export default {

    get: (endpoint, callback) => {
        fetch(BASE_URL + endpoint)
        .then(data => data.json)
        .then(callback)
        .catch(err => {
            observer.trigger(observer.events.notification, {type: 'success', message: err})

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

    }



}