import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InputOTPScreen = (props) => {
  Icon.loadFont();
  return (
    <View style={{...styles.otpScreen, ...props.style}}>
      <Icon name="cellphone-message" size={300} />
      <Text style={{fontWeight: '500', marginTop: '2%'}}>
        Enter the 6-digit One-Time Password (OTP) sent to your mobile number
        (**** 9876).
      </Text>
      <View style={[styles.formContainer, styles.shadow]}>
        <TextInput
          style={styles.inputBox}
          placeholder="OTP"
          placeholderTextColor="#a1a3a0"
        />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              props.navigation.navigate('ResetPasswordScreen');
            }}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonStyle, {backgroundColor: '#cdd4e4'}]}>
            <Text style={styles.buttonText}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  otpScreen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    flex: 1,
    backgroundColor: '#AAD326',
    borderRadius: 20,
    alignSelf: 'center',
    padding: '2%',
    marginEnd: '2%',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  formContainer: {
    margin: '7%',
    padding: '4%',
    backgroundColor: 'white',
    borderRadius: 25,
  },
  inputBox: {
    width: 300,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF3BD',
    paddingStart: 30, //position placeholder text
    marginVertical: 10,
    alignSelf: 'center',
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
});

export default InputOTPScreen;
