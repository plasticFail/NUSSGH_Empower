import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


const ChatScreen = props => {
    return <View style={{...styles.chatScreen, ...props.style}}>
        <Text>Chat</Text>
    </View>
};

const styles = StyleSheet.create({
    chatScreen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default ChatScreen;
