import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
//styles
import {Colors} from '../../styles/colors';

const SetDotStyles = (bingoPattern, pickState) => {
    if(bingoPattern === 1 && pickState === 1){
        return styles.dotShouldSpinDone;
    }
    else if(bingoPattern === 1 && pickState === 0){
        return styles.dotShouldSpin;
    }
    return styles.dotShouldNotSpin;
}

const SetDotTextStyles = (bingoPattern, pickState) => {
    if(bingoPattern === 0 && pickState === 1){
        return styles.dotTextWasted;
    }
    return styles.dotText;
}

const Dot = (props) => {
    return (
        <View style={[styles.container, SetDotStyles(props.bingoPattern, props.pickState)]}>
            <Text style={[styles.container, SetDotTextStyles(props.bingoPattern, props.pickState)]}>{props.number}</Text>
        </View>
    );
};

export default Dot;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin:5,
    },

    dotShouldSpin: {
        borderRadius: 20,
        width:40,
        height:40,
        borderWidth: 2,
        borderColor: Colors.gameColorGreen,
        backgroundColor: Colors.gameColorWhite,
    },

    dotShouldSpinDone: {
        borderRadius: 20,
        width:40,
        height:40,
        backgroundColor: Colors.gameColorGreen,
    },

    dotShouldNotSpin: {
        borderRadius: 20,
        width:40,
        height:40,
        backgroundColor: Colors.gameColorGrey,
    },

    dotText:{
        color:'black',
        fontSize: 20,
    },

    dotTextWasted:{
        color:Colors.gameColorWhite,
        fontSize: 20,
    },
});


