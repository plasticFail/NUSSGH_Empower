import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
//components
import DateSelectionBlock from './dateSelectionBlock';
import {checkWeightText} from '../../commonFunctions/logFunctions';
import globalStyles from '../../styles/globalStyles';

const WeightLogBlock = (props) => {
  return (
    <View style={{flexDirection: 'column'}}>
      <DateSelectionBlock date={props.date} setDate={props.setDate} />
      <Text style={[styles.inputHeader, {marginTop: '5%'}]}>Weight: (kg)</Text>
      <TextInput
        style={styles.inputBox}
        keyboardType="decimal-pad"
        placeholderTextColor="#a1a3a0"
        value={props.weight}
        onChangeText={(value) => {
          props.setWeight(value);
        }}
      />
        {(checkWeightText(props.weight) !== '') && (
            <View style={globalStyles.cardContainer}>
                <Text style={globalStyles.alertText}>{checkWeightText(props.weight)}</Text>
            </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    fontSize: 19,
    backgroundColor: '#EEF3BD',
    paddingStart: 20, //position placeholder text
    marginVertical: 10,
    paddingBottom: '2%',
  },
  inputHeader: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default WeightLogBlock;
