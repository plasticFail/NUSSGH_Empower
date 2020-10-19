import {Platform} from 'react-native';
import RNPusherPushNotifications from 'react-native-pusher-push-notifications';

function initPusherNotif(username, pusherToken) {
    console.log(username, pusherToken);
    //RNPusherPushNotifications.clearAllState();
    RNPusherPushNotifications.setUserId(username, pusherToken, (e) => console.log(e, 'Error'), (s) => console.log(s, 'Success'));
    //RNPusherPushNotifications.on("notification", handleNotification);
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
            default:
                break;
        }
    } else {
        console.log("android handled notification...");
    }
};


export {initPusherNotif};
