import {Platform} from 'react-native';
import RNPusherPushNotifications from 'react-native-pusher-push-notifications';

const donutsInterest = 'debug-donuts';

async function initPusherNotif(username, pusherToken) {
    // Init interests after registration
    RNPusherPushNotifications.setInstanceId("c7a6e2ea-9db6-4035-ad44-cbf8e6f23bd8");
    RNPusherPushNotifications.on('registered', () => {
        subscribe(donutsInterest);
    });
    RNPusherPushNotifications.setUserId(username, pusherToken, (statusCode, resp) => console.log('Error oh boy'), () => console.log('Registration success!'));
    RNPusherPushNotifications.on("notification", handleNotification);
}

// Handle notifications received
const handleNotification = notification => {
    console.log(notification);

    // iOS app specific handling
    if (Platform.OS === 'ios') {
        switch (notification.appState) {
            case 'inactive':
            // inactive: App came in foreground by clicking on notification.
            //           Use notification.userInfo for redirecting to specific view controller
            case 'background':
            // background: App is in background and notification is received.
            //             You can fetch required data here don't do anything with UI
            case 'active':
            // App is foreground and notification is received. Show a alert or something.
                alert("hello world!");
            default:
                break;
        }
    } else {
        console.log("android handled notification...");
    }
};

// Subscribe to an interest
const subscribe = interest => {
    // Note that only Android devices will respond to success/error callbacks
    RNPusherPushNotifications.subscribe(
        interest,
        (statusCode, response) => {
            console.error(statusCode, response);
        },
        () => {
            console.log('Success');
        }
    );
};

// Unsubscribe from an interest
const unsubscribe = interest => {
    RNPusherPushNotifications.unsubscribe(
        interest,
        (statusCode, response) => {
            console.tron.logImportant(statusCode, response);
        },
        () => {
            console.tron.logImportant('Success');
        }
    );
};

export {initPusherNotif};
