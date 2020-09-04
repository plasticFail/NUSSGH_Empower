import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MenuBtn from '../../components/menuBtn';
import globalStyles from '../../styles/globalStyles';

const ChatScreen = (props) => {
  return (
    <View style={{...globalStyles.pageContainer, ...props.style}}>
      <View style={{flex: 1}} />
    </View>
  );
};

const styles = StyleSheet.create({
  chatScreen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatScreen;
