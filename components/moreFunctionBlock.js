import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {adjustSize} from '../commonFunctions/autoResizeFuncs';

Icon.loadFont();

const MoreFunctionBlock = props => {
    return (
        <TouchableOpacity activeOpacity={0.3} onPress={() => props.clickFunc(props.id)}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Text style={styles.functionText}>{props.text}</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Icon style={styles.icon} name='chevron-right' size={adjustSize(22)} color={'#D1D1D6'} />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-between',
        padding:adjustSize(10),
    },
    functionText: {
        fontSize: adjustSize(20),
        alignItems:'center',
        justifyContent:'center',
    },
    icon: {
        alignItems:'center',
        justifyContent:'center',
    },
    leftContainer:{
        flex:1,
        alignItems:'flex-start',
        justifyContent:'center',
        height:adjustSize(30),
    },
    rightContainer:{
        flex:0,
        alignItems:'center',
        justifyContent:'center',
        height:adjustSize(30),
    },
})

export default MoreFunctionBlock;
