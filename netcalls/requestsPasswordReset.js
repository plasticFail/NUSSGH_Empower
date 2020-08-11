import {requestOTP, verifyOTP} from './urls';
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
        phoneNumber: String(phoneNumber),
      }),
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return 'Unexpected Network Error';
  }
};

const verifyOTPRequest = async (phoneNumber, otp) => {
  try {
    let response = await fetch(verifyOTP, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: String(phoneNumber),
        code: otp,
      }),
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return 'Unexpected Network Error Occured.';
  }
};

export {sendOTPRequest, verifyOTPRequest};
