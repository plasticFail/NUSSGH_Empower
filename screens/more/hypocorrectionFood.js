import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';

const HypocorrectionFood = (props) => {
  return (
    <View style={styles.screen}>
      <ScrollView horizontal contentContainerStyle={styles.itemRow}>
        <Text>Child 1</Text>
        <Text>Child 2</Text>
        <Text>Child 3</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '2%',
  },
});

export default HypocorrectionFood;
