import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
//components
import DateSelectionBlock from './dateSelectionBlock';

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
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    fontSize: 19,
    backgroundColor: '#EEF3BD',
    paddingStart: 20, //position placeholder text
    marginVertical: 10,
  },
});

export default WeightLogBlock;
