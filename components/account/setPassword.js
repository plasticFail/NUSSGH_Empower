import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import PasswordStrengthMeter from '../passwordStrengthMeter';

const SetPassword = (props) => {
  return (
    <>
      <PasswordStrengthMeter setPassword={props.setPassword} />
      <TextInput
        style={styles.inputbox}
        placeholder="Confirm New Password"
        placeholderTextColor="#a1a3a0"
        secureTextEntry={true}
        onChangeText={props.setPassword2}
      />
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={props.checkPassword}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </>
  );
};

export default SetPassword;

const styles = StyleSheet.create({
  inputbox: {
    marginBottom: '2%',
    backgroundColor: '#e2e8ee',
    padding: '3%',
    marginStart: '2%',
    marginEnd: '2%',
    borderRadius: 9.5,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonStyle: {
    backgroundColor: '#AAD326',
    borderRadius: 20,
    alignSelf: 'center',
    padding: '3%',
    marginTop: ' 2%',
    marginBottom: '2%',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
});
