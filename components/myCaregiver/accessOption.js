import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import USER_FEMALE from '../../resources/images/Patient-Icons/SVG/user-female.svg';
import USER_MALE from '../../resources/images/Patient-Icons/SVG/user-male.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import globalStyles from '../../styles/globalStyles';
import Tick from '../tick';

const AccessOption = (props) => {
  const {mainheader, subheader, selected} = props;
  const {onSelect} = props;

  return (
    <TouchableOpacity
      onPress={() => onSelect()}
      style={[globalStyles.row, {flexDirection: 'row', marginBottom: 0}]}>
      <View style={styles.rowMargin}>
        <Text style={styles.subField}>{subheader}</Text>
        <Text style={styles.mainField}>{mainheader}</Text>
      </View>
      <Tick selected={selected} />
    </TouchableOpacity>
  );
};

export default AccessOption;

const styles = StyleSheet.create({
  rowMargin: {
    marginStart: '2%',
    marginEnd: '2%',
    flex: 1,
  },
  subField: {
    fontFamily: 'SFProDisplay-Regular',
    opacity: 0.6,
    fontSize: 16,
  },
  mainField: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 20,
  },
});
