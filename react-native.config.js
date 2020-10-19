module.exports = {
  assets: ['./assets/fonts'],
  dependencies: {
    "react-native-pusher-push-notifications": {
      platforms: {
        android: null // this skips autolink for android
      }
    }
  }
};
