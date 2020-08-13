import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const GameCenterScreen = (props) => {
  return (
    <View style={{...styles.screen, ...props.style}}>
      <Text>Game Center</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GameCenterScreen;
