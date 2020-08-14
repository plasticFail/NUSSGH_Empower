import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";

// Props: onPressBack: <Function> : Callback fired when the 'back' button is pressed.
// Props: onPressForward: <Function>: Callback fired when the 'next' button is pressed.
// Note: If onPressBack/onPressForward is not specified, the button is not rendered.
export function BackAndForwardButton({onPressBack, onPressForward, overrideForwardTitle, overrideBackwardTitle}) {
    return (
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <View style={styles.buttonContainer}>
                <View style={{flex: 1, alignItems: 'flex-start'}}>
                    {
                        onPressBack &&
                        <TouchableOpacity style={styles.button} onPress={onPressBack}>
                            <Text style={styles.buttonText}>{overrideBackwardTitle || "Back"}</Text>
                        </TouchableOpacity>
                    }
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                    {
                        onPressForward &&
                        <TouchableOpacity style={styles.button} onPress={onPressForward}>
                            <Text style={styles.buttonText}>{overrideForwardTitle || "Next"}</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        padding: 20,
        paddingTop: 50,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B3D14C',
        height: 45,
        borderRadius: 10,
        width: '95%'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
})