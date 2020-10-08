import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {TextInput, ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {sendOTPRequest} from '../../netcalls/requestsPasswordReset';
import globalStyles from '../../styles/globalStyles';
import LeftArrowBtn from '../../components/logs/leftArrowBtn';
import InputOTPScreen from './inputOTPScreen';

function ForgetPasswordScreen({navigation}) {
  Icon.loadFont();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOTP, setShowOtp] = useState(false);

  const checkPhoneNo = () => {
    if (phoneNumber) {
      if (phoneNumber != '') {
        let first = phoneNumber.substring(0, 1);
        if (first == '8' || first == '9') {
          if (phoneNumber.length === 8) {
            return '';
          }
        } else {
          return 'Please input a valid mobile number';
        }
      }
    }
  };

  const showSubmit = () => {
    if (checkPhoneNo() === '' && phoneNumber.length == 8) {
      return true;
    }
    return false;
  };

  const handleButtonPress = () => {
    sendOTPRequest(phoneNumber).then((response) => {
      if (response.message === 'OTP sent.') {
        Alert.alert(
          'Success',
          'OTP has been sent to you via SMS',
          [
            {
              text: 'Got It',
              onPress: () => setShowOtp(true),
            },
          ],
          {cancelable: false},
        );
      } else {
        Alert.alert(
          'Error',
          'Phone number is not registered.',
          [
            {
              text: 'Got It',
            },
          ],
          {cancelable: false},
        );
      }
    });
  };

  return (
    <View style={globalStyles.editPageContainer}>
      <View style={globalStyles.menuBarContainer}>
        <LeftArrowBtn close={() => navigation.goBack()} />
      </View>
      <Text style={globalStyles.pageHeader}>Forget Password</Text>
      <Text style={globalStyles.pageDetails}>Verficiation Required</Text>
      <Text style={[globalStyles.pageSubDetails, {fontSize: 18}]}>
        For security measures, to reset password, we will send you a One Time
        Password (OTP).
      </Text>

      <TextInput
        style={globalStyles.editInputBox}
        placeholder="Phone Number"
        placeholderTextColor="#a1a3a0"
        onChangeText={(value) => {
          var cleanNumber = value.replace(/[^0-9]/g, '');
          setPhoneNumber(cleanNumber);
          console.log('Cleaning phone number:' + phoneNumber);
        }}
        keyboardType="number-pad"
        returnKeyType="done"
        maxLength={8}
      />
      <Text style={[globalStyles.alertText, {marginStart: '4%'}]}>
        {checkPhoneNo()}
      </Text>

      <View style={{flex: 1}} />
      <View style={globalStyles.buttonContainer}>
        {showSubmit() ? (
          <TouchableOpacity
            style={globalStyles.submitButtonStyle}
            onPress={handleButtonPress}>
            <Text style={globalStyles.actionButtonText}>Get OTP</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={globalStyles.skipButtonStyle}>
            <Text style={globalStyles.actionButtonText}>Get OTP</Text>
          </TouchableOpacity>
        )}
      </View>
      <InputOTPScreen
        visible={showOTP}
        close={() => setShowOtp(false)}
        phoneNumber={phoneNumber}
        parent={'forgetPassword'}
      />
    </View>
  );
}

export default ForgetPasswordScreen;
