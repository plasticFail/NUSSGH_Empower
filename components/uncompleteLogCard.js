import React from 'react';
import {View, StyleSheet} from 'react-native';
//function
import {
  renderLogIcon,
  renderLogIconNavy,
} from '../commonFunctions/logFunctions';
//third party lib
import Icon from 'react-native-vector-icons/FontAwesome5';
import {navy_color} from '../commonFunctions/common';
import {Colors} from '../styles/colors';

const UncompleteLogCard = (props) => {
  const {uncompleteLogs, color, hideChevron} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: '2%',
        marginStart: '2%',
      }}>
      {color === navy_color
        ? uncompleteLogs.map((item, index) => (
            <View key={item}>{renderLogIconNavy(item)}</View>
          ))
        : uncompleteLogs.map((item, index) => (
            <View key={item}>{renderLogIcon(item)}</View>
          ))}

      <View style={{flex: 1}} />
      {!hideChevron && (
        <Icon name="chevron-right" size={20} style={styles.chevron} />
      )}
    </View>
  );
};

export default UncompleteLogCard;

const styles = StyleSheet.create({
  chevron: {
    marginTop: '5%',
    color: Colors.lastLogValueColor,
  },
});
