import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/reduxInit';
import {handler} from "./components/notification/PushNotifHandler";
//component
import AppRoot from './screens/appRoot';
import LoadingScreen from './components/account/initLoadingScreen';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finishLoading: false
    }
    handler.attachNotification(this.onNotification);
  }

  onNotification = (notification) => {
    //console.log(notification);
  }

  render() {
    const {finishLoading} = this.state;
    return (
        <Provider store={store}>
          {finishLoading ? (
              <AppRoot />
          ) : (
              <LoadingScreen finishHandler={() => this.setState({finishLoading: true})} />
          )}
        </Provider>
    );
  }
}
