const BASE_URL = 'http://localhost:8000';

const getAuthHeader = () => {
    const token = localStorage.getItem("token");

    return (token && token.length)
        ? { 'Authorization': `Bearer ${token}` }
        : {}

}

export default {
    get: (endpoint, callback) => {
        return fetch(BASE_URL + endpoint, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                ...getAuthHeader(),
            },
        }).then(checkStatus)
            // .then(data => data.json())
            .then(callback);
    },

    post: (endpoint, data, callback) => {
        return fetch(BASE_URL + endpoint, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },

            body: JSON.stringify(data)
        }).then(checkStatus)
            // .then(res => res.json())
            .then(callback);
    },

    put: (endpoint, data, callback) => {
        return fetch(BASE_URL + endpoint, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },
            body: JSON.stringify(data)
        }).then(checkStatus)
            .then(callback);
    },

    delete: (endpoint, data, callback) => {
        return fetch(BASE_URL + endpoint, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },
            body: JSON.stringify(data)
        }).then(checkStatus)
            .then(callback)
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
        }).then(checkStatus)
            .then(() => console.log('updated!!!'))
        // .catch(err => {
        //     console.log(err)
        // })

    }
}


function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response.json()
    } else {
        var error = new Error(response.statusText);
        if (response.status === 403 && response.url === 'http://localhost:8000/login') {
            error.message = 'Incorrect credentials!';
            error.response = response;
            throw error;
        } else if (response.status === 403 && response.type === 'cors') {
            console.log('err response: ', response)
            error.message = 'Your JWT token is expired. Please log in!'
            error.status = 403;
            error.type = 'cors'
            throw error;
        } else if (response.status === 400) {
            console.log('err response: ', response)
            error.message = 'Internal Server Error: Bad request'
            error.status = 400;
            error.type = 'cors'
            throw error;
        }
        // else if (response.status === 500) {
        //     console.log('err response: ', response)
        //     error.message = 'Something went wrong'
        //     error.status = 403;
        //     error.type = 'cors'
        //     throw error;
        // }
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
