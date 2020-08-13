import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const GlucoseMonitorsScreen = (props) => {
  return (
    <View style={{...styles.screen, ...props.style}}>
      <Text>Glucose Monitors</Text>
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

export default GlucoseMonitorsScreen;
