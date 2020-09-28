import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../styles/colors';

const InProgress = () => {
  return (
    <View
      style={{
        marginTop: '30%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon
        name="progress-clock"
        size={150}
        color={Colors.lastLogButtonColor}
      />
      <Text style={styles.text}>Work in progress, check back soon!</Text>
    </View>
  );
};

export default InProgress;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 20,
    margin: '3%',
  },
});
