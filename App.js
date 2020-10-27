import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/reduxInit';

//component
import AppRoot from './screens/appRoot';
import LoadingScreen from './components/account/initLoadingScreen';

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
