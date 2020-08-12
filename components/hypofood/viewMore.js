import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

const ViewMore = (props) => {
  const {category} = props;

  return (
    <View style={styles.screen}>
      <Text>hihi</Text>
    </View>
  );
};

export default ViewMore;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
});
