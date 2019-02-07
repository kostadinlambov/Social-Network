
const token = localStorage.getItem('token')

let payload;

if(token !== null && token !== undefined){
     payload = JSON.parse(atob(token.split('.')[1]));
}


export default {
    getPayload: () => {
        return payload;
    },

    getUsername: () => {
        
        return payload['sub'];
    },

    getUserId: () => {
        return payload['id'];
    },

    getRole: () => {
        return payload['role'];
    }
}