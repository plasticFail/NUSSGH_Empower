import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


const MedicationScreen = props => {
    return <View style={{...styles.medicationScreen, ...props.style}}>
        <Text>Medication</Text>
    </View>
};

const styles = StyleSheet.create({
    medicationScreen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default MedicationScreen;
