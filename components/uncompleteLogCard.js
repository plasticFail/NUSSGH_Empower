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
import {TouchableOpacity} from 'react-native-gesture-handler';

import {useNavigation} from '@react-navigation/native';

const UncompleteLogCard = (props) => {
  const {uncompleteLogs, color, hideChevron} = props;
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        padding: '2%',
      }}>
      {color === navy_color
        ? uncompleteLogs.map((item, index) => (
            <TouchableOpacity key={item}>
              {renderLogIconNavy(item)}
            </TouchableOpacity>
          ))
        : uncompleteLogs.map((item, index) => (
            <TouchableOpacity
              style={styles.container}
              onPress={() => navigation.navigate('AddLog', {type: item})}>
              <View key={item}>{renderLogIcon(item)}</View>
            </TouchableOpacity>
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
  container: {
    backgroundColor: 'white',
    paddingTop: '5%',
    paddingBottom: '5%',
    borderRadius: 10,
    marginEnd: '2%',
  },
});
