import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import MenuBtn from '../../components/menuBtn';
import logStyles from '../../styles/logStyles';
import LeftArrowBtn from '../../components/logs/leftArrowBtn';

const GameCenter = (props) => {
  return (
    <View style={{...globalStyles.pageContainer, ...props.style}}>
      <View style={globalStyles.menuBarContainer}>
        <LeftArrowBtn close={() => props.navigation.navigate('Home')} />
      </View>
    </View>
  );
};

export default GameCenter;
