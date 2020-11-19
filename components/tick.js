import React from 'react';
import {StyleSheet} from 'react-native';
import Ant from 'react-native-vector-icons/AntDesign';
import {adjustSize} from '../commonFunctions/autoResizeFuncs';


const Tick = (props) => {
  const {selected} = props;
  return selected ? (
    <Ant name={'checksquare'} size={adjustSize(35)} color={'#aad326'} />
  ) : (
    <Ant name={'checksquare'} size={adjustSize(35)} color={'#e1e7ed'} />
  );
};

export default Tick;

const styles = StyleSheet.create({});
