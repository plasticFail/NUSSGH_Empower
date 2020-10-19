import React, {useEffect} from 'react';
import { ActivityIndicator, StyleSheet,  View } from "react-native";
import {getToken, getUsername} from '../../storage/asyncStorageFunctions';
import {isTokenValidRequest} from '../../netcalls/requestsAuth';
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from '../../redux/reduxMapping';
import {getPusherToken} from "../../netcalls/notif/requestsPusher";
import {initPusherNotif} from "../../commonFunctions/AuthorisePusherNotif";

const init = async(props, finishHandler) => {
    const token = await getToken();
    if (token !== null && token !== '') {
        console.log('token : ' + token);
        let tokenIsValid = await isTokenValidRequest(token);
        if (tokenIsValid) {
            const pusherToken = await getPusherToken(token);
            const username = await getUsername();
            initPusherNotif(username.toLowerCase(), pusherToken.token);
            props.login();
        }
    }
    console.log('token : ' + token);
    finishHandler();
}

const LoadingScreen = props => {
    useEffect(() => {
        init(props, props.finishHandler);
    });

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
