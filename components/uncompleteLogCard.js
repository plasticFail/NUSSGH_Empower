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
import {adjustSize} from '../commonFunctions/autoResizeFuncs';

const UncompleteLogCard = (props) => {
  const {uncompleteLogs, color, hideChevron} = props;
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        margin: '4%',
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
              key={item}
              onPress={() => navigation.navigate('AddLog', {type: item})}>
              <View style={{alignSelf: 'center'}}>{renderLogIcon(item)}</View>
            </TouchableOpacity>
          ))}

      <View style={{flex: 1}} />
      {!hideChevron && (
        <Icon name="chevron-right" size={adjustSize(20)} style={styles.chevron} />
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
    borderRadius: adjustSize(9),
    marginEnd: '6%',
  },
});
