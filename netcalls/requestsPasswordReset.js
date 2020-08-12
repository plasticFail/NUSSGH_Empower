import {requestOTP} from './urls';
import {Alert} from 'react-native';

const sendOTPRequest = async (phoneNumber) => {
  try {
    let response = await fetch(requestOTP, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
      }),
    });
    let responseJson = await response.json();
    msg = JSON.parse(responseJson).message;
    Alert.alert(
      'Success',
      'OTP has been sent to you via SMS',
      [
        {
          text: 'Got It',
          onPress: () => navigation.navigate('InputOTP'),
        },
      ],
      {cancelable: false},
    );
  } catch (error) {
    Alert.alert(
      'Error',
      'Phone number not registered',
      [
        {
          text: 'Got It',
        },
      ],
      {cancelable: false},
    );
    return false;
  }
};

export {sendOTPRequest};
