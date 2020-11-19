import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import globalStyles from '../../styles/globalStyles';
import Tick from '../tick';
import {adjustSize} from '../../commonFunctions/autoResizeFuncs';

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
    fontSize: adjustSize(16),
  },
  mainField: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: adjustSize(20),
  },
});
