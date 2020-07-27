import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const InputOTPScreen = (props) => {
  return (
    <View style={{...styles.otpScreen, ...props.style}}>
      <Text>Ask pop up?</Text>
      <Text>Countdown to resend otp?</Text>
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
});

export default InputOTPScreen;
