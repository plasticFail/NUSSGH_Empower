import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {adjustSize} from '../../commonFunctions/autoResizeFuncs';


const RemindersScreen = (props) => {
  return (
    <View style={{...styles.screen, ...props.style}}>
      <Text>Reminders</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: adjustSize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RemindersScreen;
