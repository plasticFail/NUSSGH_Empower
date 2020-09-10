import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import MenuBtn from '../../components/menuBtn';

const GoalsScreen = (props) => {
  return (
    <View style={{...globalStyles.pageContainer, ...props.style}}>
      <Text style={{textAlign: 'center'}}>Goals</Text>
      <MenuBtn />
    </View>
  );
};

export default GoalsScreen;
