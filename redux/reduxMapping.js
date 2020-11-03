import {setRole} from './reduxInit';

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    role: state.role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch({type: 'LOGIN'}),
    logout: () => dispatch({type: 'LOGOUT'}),
    setUserRole: (role) => dispatch(setRole(role)),
  };
};

export {mapStateToProps, mapDispatchToProps};
