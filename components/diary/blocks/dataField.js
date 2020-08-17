import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';

const DataField = (props) => {
  const {fieldName, value} = props;
  return (
    <>
      <Text style={[styles.inputHeader, {marginTop: 20}]}>{fieldName} : </Text>
      <TextInput
        style={styles.inputBox}
        placeholderTextColor="black"
        keyboardType="decimal-pad"
        placeholder={value}
        editable={false}
      />
    </>
  );
};

export default DataField;

const styles = StyleSheet.create({
  inputBox: {
    fontSize: 19,
    backgroundColor: '#EEF3BD',
    paddingStart: 20, //position placeholder text
    marginVertical: 10,
    padding: '2%',
  },
  inputHeader: {
    fontSize: 18,
    fontWeight: '700',
  },
});
