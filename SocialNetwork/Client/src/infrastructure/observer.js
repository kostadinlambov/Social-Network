let subscriptions = {
    'loginUser': [],
    'notification': [],
    'loadMessages': []
};

export default {
    events : {
        loginUser: 'loginUser',
        notification: 'notification',
        loadMessages: 'loadMessages',
    },

    subscribe: (eventName, fn) => {
        subscriptions[eventName].push(fn);
    },

    trigger: (eventName, data) => {
        console.log('data', data)
        debugger;
        subscriptions[eventName].forEach(fn => fn(data));
    }
};