import React from 'react';
import {StyleSheet, Text, View} from 'react-native';


const WeightLogDisplay = (props) => {
    return (
        <View>
            <View style={[styles.container, styles.shadow]}>
                <Text style={styles.textStyle}>
                    Your most recent weight log is{' '}
                    <Text style={styles.bold}>{props.data.value}</Text> kg at{' '}
                    <Text style={styles.bold}>{props.data.time}</Text> today.
                </Text>
            </View>
        </View>
    );
};

export default WeightLogDisplay;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        width: '100%',
        paddingBottom: '5%',
        borderRadius: 20,
        padding: '4%',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textStyle: {
        fontSize: 17,
    },
    bold: {
        fontWeight: '700',
        color: '#d22b55',
    },
});
