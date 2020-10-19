import Pusher from 'pusher-js/react-native';

const APP_KEY = "ABC";
const APP_CLUSTER = "ABC_CLUSTER"
const authEndpoint = "ABC/pusher/auth";
const pusher = new Pusher(APP_KEY, {
    cluster: APP_CLUSTER,
    authEndpoint: authEndpoint
});
