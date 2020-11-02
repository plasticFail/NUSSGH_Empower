import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/reduxInit';

//component
import AppRoot from './screens/appRoot';
import LoadingScreen from './components/account/initLoadingScreen';
import {defaultRoute} from "./components/notification/PushNotifHandler";

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
