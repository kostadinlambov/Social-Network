import React from 'react';
import { toast } from 'react-toastify';
import { ToastComponent } from '../components/common'

const BASE_URL = 'http://localhost:8000';

export default {
    getBaseUrl: () => {
        return BASE_URL;
    },

    isAuthenticated: () => {
        return window.localStorage.getItem('token') !== null
    },

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

    getProfilePicUrl: () => {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload) {
                return payload['profilePicUrl'];
            }
        }
    },

    getFirstName: () => {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload) {
                return payload['firstName'];
            }
        }
    },

    isTheUserLoggedIn: () => {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const role = payload['role'];

                if (payload) {
                    if (role !== null || role !== undefined) {
                        return true;
                    }
                }
            } catch (err) {
                localStorage.clear();
                toast.error(<ToastComponent.errorToast text={'Unauthorized'} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
                // throw new Error("Unauthorized");
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

    formatUsername(firstName = '', lastName = '', nameLength = 18) {
        let name = firstName + ' ' + lastName;

        if (name.length >= nameLength) {
            return name.substring(0, nameLength) + '...';
        }
        return name;
    },

    getImageSize(profilePicUrl) {
        let img = new Image();
        img.src = profilePicUrl;

        if (img.width >= img.height) {
            return 'l'
        }

        return '';
    }
} 