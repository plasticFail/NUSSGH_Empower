import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/reduxInit';

//component
import AppRoot from './screens/appRoot';
import LoadingScreen from './components/account/initLoadingScreen';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
import {defaultRoute} from './components/notification/PushNotifHandler';

export default function App() {
  const [finishLoading, setFinishLoading] = useState(false);

  return (
    <Provider store={store}>
      {finishLoading ? (
        <AppRoot />
      ) : (
        <LoadingScreen finishHandler={() => setFinishLoading(true)} />
      )}
    </Provider>
  );
}
