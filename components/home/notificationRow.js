import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

import LOGO from '../../resources/images/Patient-Icons/SVG/icon-green-success.svg';
import {bg_key} from '../../commonFunctions/logFunctions';

const NotificationRow = (props) => {
  const {type, text} = props;

  const logoStyle = {
    width: 35,
    height: 35,
    marginEnd: '5%',
  };

  return (
    <View style={styles.container}>
      {type === bg_key && <LOGO {...logoStyle} />}
      <Text>{text}</Text>
    </View>
  );
};

export default NotificationRow;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: '3%',
    flexDirection: 'row',
    padding: '2%',
  },
});
