import React from 'react';
import {View} from 'react-native';
//third party libs
import {connect} from 'react-redux';
//functions
import {mapStateToProps, mapDispatchToProps} from '../../redux/reduxMapping';
import {storeToken} from '../../storage/asyncStorageFunctions';


const Logout = props =>{
    storeToken('');
    props.logout();
    return (<View></View>);
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
