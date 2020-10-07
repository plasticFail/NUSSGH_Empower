import React from 'react';
import {View, StyleSheet} from 'react-native';
import Ant from 'react-native-vector-icons/AntDesign';

const Tick = (props) => {
  const {selected} = props;
  return selected ? (
    <Ant name={'checksquare'} size={35} color={'#aad326'} />
  ) : (
    <Ant name={'checksquare'} size={35} color={'#e1e7ed'} />
  );
};

export default Tick;

const styles = StyleSheet.create({});
