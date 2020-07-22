import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


const DiaryScreen = props => {
    return <View style={{...styles.diaryScreen, ...props.style}}>
        <Text>Diary</Text>
    </View>
};

const styles = StyleSheet.create({
    diaryScreen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default DiaryScreen;
