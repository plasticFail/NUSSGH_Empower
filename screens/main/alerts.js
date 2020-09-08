import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MenuBtn from '../../components/menuBtn';
import globalStyles from '../../styles/globalStyles';

const AlertsScreen = (props) => {
  return (
    <View style={{...globalStyles.pageContainer, ...props.style}}>
      <View style={{flex: 1}} />
      <MenuBtn />
    </View>
  );
};

const styles = StyleSheet.create({});

export default AlertsScreen;
