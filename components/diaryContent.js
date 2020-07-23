import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const DiaryContent = (props) => {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <Text>Data</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconImg2: {
    width: 25,
    height: 25,
    resizeMode: 'contain', //resize image so dont cut off
  },
});

export default DiaryContent;
