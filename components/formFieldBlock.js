import React from 'react';
import {Text, StyleSheet, TextInput} from 'react-native';
import {adjustSize} from '../commonFunctions/autoResizeFuncs';

const FormFieldBlock = (props) => {
  const {title, expandable} = props;
  return (
    <>
      <Text style={styles.formHeader}>{title}:</Text>
      {expandable === true ? (
        <TextInput
          style={styles.inputBox}
          multiline
          onChangeText={(value) => props.setText(value)}
        />
      ) : (
        <TextInput
          style={styles.inputBox1}
          onChangeText={(value) => props.setText(value)}
        />
      )}
    </>
  );
};

export default FormFieldBlock;

const styles = StyleSheet.create({
  formHeader: {
    fontWeight: '700',
    fontSize: adjustSize(18),
    margin: '3%',
  },
  inputBox: {
    borderWidth: 0.5,
    margin: '2%',
    padding: '3%',
    fontSize: adjustSize(16),
  },
  inputBox1: {
    borderBottomWidth: 0.5,
    marginStart: '3%',
    marginEnd: '3%',
    marginBottom: ' 3%',
    fontSize: adjustSize(16),
  },
});
