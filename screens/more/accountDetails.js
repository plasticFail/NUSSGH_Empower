import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


const AccountDetailScreen = props => {
    return <View style={{...styles.accountDetailScreen, ...props.style}}>
        <Text>Account Detail</Text>
    </View>
};

const styles = StyleSheet.create({
    accountDetailScreen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default AccountDetailScreen;
