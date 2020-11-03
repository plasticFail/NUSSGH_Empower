import {createStore} from 'redux';

export function setRole(payload) {
  return {type: 'SET_ROLE', payload};
}

const initialState = {
  isLogin: false,
  role: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {isLogin: true};
    case 'LOGOUT':
      return {isLogin: false};
    case 'SET_ROLE':
      return Object.assign({}, state, {
        role: action.payload,
      });
  }
  return state;
};

const store = createStore(reducer);

export {store};
