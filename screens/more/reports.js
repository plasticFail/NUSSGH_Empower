import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const ReportsScreen = (props) => {
  return (
    <View style={{...styles.screen, ...props.style}}>
      <Text>Reports</Text>
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

export default ReportsScreen;
