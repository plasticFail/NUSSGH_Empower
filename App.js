import React, {Component} from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import AppRoot from './screens/appRoot';


const initialState = {
    isLogin: false
}

const reducer = (state = initialState,action) => {
    switch (action.type) {
        case 'LOGIN':
            return {isLogin:true}
        case 'LOGOUT':
            return {isLogin:false}
    }
    return state;
}

const store = createStore(reducer);

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <Provider store={store}>
                <AppRoot/>
            </Provider>
        );
    }
}

export default App;
