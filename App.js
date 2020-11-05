import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/reduxInit';
//component
import AppRoot from './screens/appRoot';
import LoadingScreen from './components/account/initLoadingScreen';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finishLoading: false
    }
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
