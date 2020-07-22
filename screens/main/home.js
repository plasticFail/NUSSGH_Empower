import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import HeaderIcon from '../../components/headerBtnIcon';


const HomeScreen = props => {
    const btnHandler = () => {
        console.log("click xxx");
        alert('test');
    }

    const clickHandler = () => {
        props.navigation.navigate('Alerts');
    };

    return <View style={{...styles.homeScreen, ...props.style}}>
        <Text>Home</Text>
    </View>
};

const styles = StyleSheet.create({
    homeScreen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default HomeScreen;
