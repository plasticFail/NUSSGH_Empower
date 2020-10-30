import React from 'react';
import {Platform} from 'react-native';
import RNPusherPushNotifications from 'react-native-pusher-push-notifications';
import {getToken} from '../storage/asyncStorageFunctions';
import {appRootNavigation} from "../screens/appRoot";
import {notificationPathMapping} from "../config/AppConfig";

const donutsInterest = 'debug-donuts';

function initPusherNotif(username, pusherToken) {
  // Disable notification for 0.1.1

  const PUSHER_INSTANCE_ID = 'c7a6e2ea-9db6-4035-ad44-cbf8e6f23bd8';

  RNPusherPushNotifications.setInstanceId(PUSHER_INSTANCE_ID);

  RNPusherPushNotifications.setUserId(
    username,
    pusherToken,
    (statusCode, resp) => console.log('Error oh boy'),
    () => console.log('Registration success!'),
  );

  subscribe(donutsInterest);
  RNPusherPushNotifications.on('notification', handleNotification);
  /*
  RNPusherPushNotifications.getSubscriptions(
    (sub) => console.log('Get sub', sub),
    (e) => console.log(e),
  );*/
}

// Handle notifications received
const handleNotification = (notification) => {
  console.log(notification);

  // iOS app specific handling
  if (Platform.OS === 'ios') {
    switch (notification.appState) {
      case 'inactive':
      // inactive: App came in foreground by clicking on notification.
      //           Use notification.userInfo for redirecting to specific view controller
      if (notification.redirect) {
        appRootNavigation.current.navigate(notificationPathMapping[notification.redirect]);
      }
      case 'background':
      // background: App is in background and notification is received.
      //             You can fetch required data here don't do anything with UI
      case 'active':
        // App is foreground and notification is received. Show a alert or something.

      default:
        break;
    }
  } else {
    console.log('android handled notification...');
  }
};

// Subscribe to an interest
const subscribe = (interest) => {
  // Note that only Android devices will respond to success/error callbacks
  RNPusherPushNotifications.subscribe(
    interest,
    (statusCode, response) => {
      console.error(statusCode, response);
    },
    () => {
      console.log('Success subscribing interest');
    },
  );
};

// Unsubscribe from an interest
const unsubscribe = (interest) => {
  RNPusherPushNotifications.unsubscribe(
    interest,
    (statusCode, response) => {
      console.tron.logImportant(statusCode, response);
    },
    () => {
      console.tron.logImportant('Success');
    },
  );
};

export {initPusherNotif};
