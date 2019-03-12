
export default {
    getPayload: () => {
        const token = localStorage.getItem('token')

        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload) {
                return payload;
            }
        }
    },

    getUsername: () => {
        const token = localStorage.getItem('token')

        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));

            if (payload) {
                return payload['sub'];
            }
        }
    },

    getUserId: () => {

        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));

            if (payload) {
                return payload['id'];
            }
        }
    },

    getRole: () => {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload) {
                return payload['role'];
            }
        }
    },

    isTheUserLoggedIn: () => {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const role = payload['role'];

            if (payload) {
                if (role !== null || role !== undefined) {
                    return true;
                }
            }
        }

        return false;
    },

    isRoot: () => {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const role = payload['role'];

            if (payload) {
                if ((role !== null || role !== undefined) && role === 'ROOT') {
                    return true;
                }
            }
        }

        return false;
    },

    isAdmin: () => {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const role = payload['role'];
            if (payload) {
                if ((role !== null || role !== undefined) && (role === 'ADMIN' || role === 'ROOT')) {
                    return true;
                }
            }
        }

        return false;
    },


    isLoggedInUser(username) {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));

            if (payload) {
                const loggedInUserName = payload['sub'];
                if (username === loggedInUserName) {
                    return true;
                }
                return false;
            }
        }
    },

    checkIfIsRoot(role) {
        if (role === 'ROOT') {
            return true;
        }

        return false;
    },

    getImageSize(profilePicUrl, friendsGallery) {
        let img = new Image();
        img.src = profilePicUrl;
        console.log('this.width + x + this.height');
        console.log(img.width + 'x' + img.height);
        // alert('ImageSize: ' + img.width + 'x' + img.height)
        if (img.width >= img.height && !friendsGallery) {
            return 'l'
        }
        return '';

    }
}