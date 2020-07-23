import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

Icon.loadFont();

const HeaderIcon = props => {
    return (
        <TouchableOpacity activeOpacity={0.3} onPress={props.clickFunc}>
            <View style={styles.container}>
                <Icon name={props.iconName} size={25} color={'#000'}/>
                <Text>{props.text}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:10,
        paddingTop:5,
    },
})

export default HeaderIcon;
