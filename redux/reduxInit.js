import {createStore} from 'redux';

const initialState = {
  isLogin: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {isLogin: true};
    case 'LOGOUT':
      return {isLogin: false};
  }
  return state;
};

const store = createStore(reducer);

export {store};
