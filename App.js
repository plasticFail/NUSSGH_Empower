import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/reduxInit';

import AppRoot from './screens/appRoot';


export default function App(){
    return (
        <Provider store={store}>
            <AppRoot/>
        </Provider>
    );
}

