const mapStateToProps = state => {
    return {
        isLogin: state.isLogin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login : () => dispatch({type:'LOGIN'}),
        logout : () => dispatch({type:'LOGOUT'}),
    }
}

export {mapStateToProps, mapDispatchToProps};
