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
    <View style={[styles.formContainer, styles.shadow, {marginTop: '3%'}]}>
      <PasswordStrengthMeter setPassword={props.setPassword} />
      <TextInput
        style={styles.inputBox}
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
    </View>
  );
};

export default SetPassword;

const styles = StyleSheet.create({
  formContainer: {
    width: Dimensions.get('window').width - 20,
    backgroundColor: 'white',
    borderRadius: 25,
    paddingTop: '5%',
    paddingBottom: '3%',
  },
  inputBox: {
    width: Dimensions.get('window').width - 30,
    borderRadius: 20,
    backgroundColor: '#EEF3BD',
    paddingStart: 30, //position placeholder text
    marginVertical: 10,
    alignSelf: 'center',
    padding: '3%',
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
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
});
