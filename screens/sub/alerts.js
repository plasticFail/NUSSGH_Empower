import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


const AlertsScreen = props => {
    return <View style={{...styles.alertsScreen, ...props.style}}>
        <Text>Alerts</Text>
    </View>
};

const styles = StyleSheet.create({
    alertsScreen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default AlertsScreen;
