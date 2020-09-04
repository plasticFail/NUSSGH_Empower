import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';

const HeaderIcon = props => {
    return (
        <TouchableOpacity activeOpacity={0.3} onPress={props.clickFunc}>
            <View style={styles.container}>
                <Icon name={props.iconName} style={props.style} size={32} color={props.color || '#000'}/>
                { props.text && <Text>{props.text}</Text> }
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
