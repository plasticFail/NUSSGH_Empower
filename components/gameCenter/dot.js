import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
//styles
import {Colors} from '../../styles/colors';
import {adjustSize} from '../../commonFunctions/autoResizeFuncs';


const SetDotStyles = (bingoPattern) => {
    if(bingoPattern === 3){
        return styles.dotShouldSpinDone;
    }
    else if(bingoPattern === 2){
        return styles.dotShouldSpin;
    }
    return styles.dotShouldNotSpin;
}

const SetDotTextStyles = (bingoPattern) => {
    if(bingoPattern === 1){
        return styles.dotTextWasted;
    }
    return styles.dotText;
}

const Dot = (props) => {
    return (
        <View style={[styles.container, SetDotStyles(props.bingoPattern)]}>
            <Text style={[styles.container, SetDotTextStyles(props.bingoPattern)]}>{props.number}</Text>
        </View>
    );
};

export default Dot;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin:adjustSize(5),
    },

    dotShouldSpin: {
        borderRadius: adjustSize(20),
        width:adjustSize(40),
        height:adjustSize(40),
        borderWidth: 2,
        borderColor: Colors.gameColorGreen,
        backgroundColor: Colors.gameColorWhite,
    },

    dotShouldSpinDone: {
        borderRadius: adjustSize(20),
        width:adjustSize(40),
        height:adjustSize(40),
        backgroundColor: Colors.gameColorGreen,
    },

    dotShouldNotSpin: {
        borderRadius: adjustSize(20),
        width:adjustSize(40),
        height:adjustSize(40),
        backgroundColor: Colors.gameColorGrey,
    },

    dotText:{
        color:'black',
        fontSize: adjustSize(20),
    },

    dotTextWasted:{
        color:Colors.gameColorWhite,
        fontSize: adjustSize(20),
    },
});


