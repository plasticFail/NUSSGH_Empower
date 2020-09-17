import React from 'react';
import { ActivityIndicator, StyleSheet,  View } from "react-native";
import {getToken} from '../../storage/asyncStorageFunctions';
import {isTokenValidRequest} from '../../netcalls/requestsAuth';
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from '../../redux/reduxMapping';


const init = async(props, finishHandler) => {
    const token = await getToken();
    if (token !== null && token !== '') {
        console.log('token : ' + token);
        let tokenIsValid = await isTokenValidRequest(token);
        if (tokenIsValid) {
            props.login();
        }
    }
    console.log('token : ' + token);
    finishHandler();
}

const LoadingScreen = props => {
    init(props, props.finishHandler);
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#00ff00"/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#0D8b43',
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
