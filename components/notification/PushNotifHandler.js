import React from 'react';
import {Linking} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {notificationPathMapping} from "../../config/AppConfig";

export const defaultRoute = React.createRef(null);

// This is the notification handler for android devices. To modify the handling of ios notifications, modify the
// AuthorisePusherNotif.js file in ./commonFunctions/. Whenever there is a new notifcation behaviour you want to make,
// both this file and AuthorisePusherNotif needs to make changes because the way ios and android handles notifications
// are different.
// Also note that only the android portion of react-native-push-notification is setup. The ios version is not set up
// because we're using pusher's default react-native package (b8ne) for handling ios notification.
class NotificationHandler {
    // All notification attributes will be present in notification.
    // Access notification data using notification.data
    // This function is called only when the application is running in the background or closed.
    onNotification(notification) {
        console.log('NotificationHandler: notification is: ', notification);
        let redirect = null;
        if (notification.data) {
            redirect = notification.data.redirect;
        }

        if (redirect && notificationPathMapping[redirect]) {
            defaultRoute.current = notificationPathMapping[redirect];
        }

        if (typeof this._onNotification === 'function') {
            this._onNotification(notification);
        }
    }

    onRegister(token) {
        // console.log('NotificationHandler:', token);

        if (typeof this._onRegister === 'function') {
            this._onRegister(token);
        }
    }

    onAction(notification) {
        console.log ('Notification action received:');
        console.log(notification.action);
        console.log(notification);

        if(notification.action === 'Yes') {
            PushNotification.invokeApp(notification);
        }
    }

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError(err) {
        console.log(err);
    }

    attachRegister(handler) {
        this._onRegister = handler;
    }

    attachNotification(handler) {
        this._onNotification = handler;
    }
}

const handler = new NotificationHandler();

PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: handler.onRegister.bind(handler),

    // (required) Called when a remote or local notification is opened or received
    onNotification: handler.onNotification.bind(handler),

    // (optional) Called when Action is pressed (Android)
    onAction: handler.onAction.bind(handler),

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: handler.onRegistrationError.bind(handler),

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true,
});

/*
PushNotification.localNotificationSchedule({
    title: 'Notification with my name',
    message: 'hello!', // (required)
    date: new Date(Date.now()) // in 60 secs
});
 */

export {handler};
