import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OTPInputView from '@twotalltotems/react-native-otp-input';

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
        <OTPInputView
          pinCount={6}
          style={{
            width: '100%',
            height: 100,
            alignSelf: 'center',
            fontWeight: '1000',
          }}
          placeholderTextColor="#000000"
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
        />
        <View style={{flexDirection: 'row', alignItems: 'space-between'}}>
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
  underlineStyleBase: {
    width: 40,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 3,
    color: 'black',
  },

  underlineStyleHighLighted: {
    borderColor: '#aad326',
  },
});

export default InputOTPScreen;
