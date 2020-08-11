import {requestOTP, verifyOTP, postNewPassword} from './urls';
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

const resetPassword = async (password, token) => {
  try {
    let response = await fetch(postNewPassword, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        newPassword: password,
      }),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    return true;
  } catch (error) {
    return false;
  }
};

export {sendOTPRequest, verifyOTPRequest, resetPassword};
