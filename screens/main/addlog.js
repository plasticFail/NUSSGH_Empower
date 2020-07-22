import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


const AddLogScreen = props => {
    return <View style={{...styles.addLogScreen, ...props.style}}>
        <Text>Add Log</Text>
    </View>
};

const styles = StyleSheet.create({
    addLogScreen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default AddLogScreen;
