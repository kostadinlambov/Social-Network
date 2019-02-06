let subscriptions = {
    'loginUser': [],
    'notification': []
};

export default {
    events : {
        loginUser: 'loginUser',
        notification: 'notification'
    },

    subscribe: (eventName, fn) => {
        subscriptions[eventName].push(fn);
    },

    trigger: (eventName, data) => {
        subscriptions[eventName].forEach(fn => fn(data));
    }
};