import React from 'react';
import {Text, TouchableWithoutFeedback, View, StyleSheet} from "react-native";
import {adjustSize} from '../commonFunctions/autoResizeFuncs';

// Props: onPressBack: <Function> : Callback fired when the 'back' button is pressed.
// Props: onPressForward: <Function>: Callback fired when the 'next' button is pressed.
// Note: If onPressBack/onPressForward is not specified, the button is not rendered.
export function BackAndForwardButton({onPressBack, onPressForward, overrideForwardTitle, overrideBackwardTitle, enableForward, hideBackButton}) {
    return (
        <View style={{justifyContent: 'flex-end'}}>
            <View style={styles.buttonContainer}>
                {
                    onPressBack && !hideBackButton &&
                    <TouchableWithoutFeedback onPress={onPressBack}>
                        <View style={[styles.button, {backgroundColor: '#E1E7ED', marginRight: adjustSize(7)}]}>
                            <Text style={styles.buttonText}>{overrideBackwardTitle || "Back"}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
                {
                    onPressForward &&
                    <TouchableWithoutFeedback onPress={onPressForward} disabled={!enableForward()}>
                        <View style={[forwardStyles(enableForward()), {marginLeft: hideBackButton ? 0 : adjustSize(7)}]}>
                            <Text style={styles.buttonText}>{overrideForwardTitle || "Next"}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
            </View>
        </View>
    )
}

const forwardStyles = enableForward => {
    if(enableForward){
        return (styles.button);
    }
    return (styles.buttonDisabled);
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        padding: adjustSize(20),
        paddingTop: adjustSize(50),
        justifyContent: 'space-between'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B3D14C',
        height: adjustSize(45),
        borderRadius: adjustSize(10),
        flex: 1,
    },
    buttonText: {
        fontSize: adjustSize(20),
        fontWeight: 'bold'
    },
    buttonDisabled: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EAEAFF',
        height: adjustSize(45),
        borderRadius: adjustSize(10),
        width: '95%',
        opacity: 0.55
    },
})
