import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

function ForgetPasswordScreen({navigation}) {
  Icon.loadFont();
  const [phoneNumber, setPhoneNumber] = useState('');
  const handleButtonPress = () => {
    if (phoneNumber != '' && phoneNumber.length == 8) {
      var first = phoneNumber.substring(0, 1);
      if (first == '8' || first == '9') {
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
      } else {
        Alert.alert('Invalid', 'Please input a valid phone number', [
          {text: 'Got It'},
        ]);
      }
    } else {
      Alert.alert('Invalid', 'Please input a valid phone number', [
        {text: 'Got It'},
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Icon name="mobile-phone" size={300} />
      <Text style={styles.textStyle}>
        Input your phone number and your login credentials will be sent to you
        via sms
      </Text>
      <View style={[styles.formContainer, styles.shadow]}>
        <TextInput
          style={styles.inputBox}
          placeholder="Phone Number"
          placeholderTextColor="#a1a3a0"
          onChangeText={(value) => {
            var cleanNumber = value.replace(/[^0-9]/g, '');
            setPhoneNumber(cleanNumber);
            console.log('Cleaning phone number:' + phoneNumber);
          }}
          keyboardType="number-pad"
          maxLength={8}
        />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Recover Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  textStyle: {
    margin: '5%',
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
  },
  buttonStyle: {
    backgroundColor: '#AAD326',
    width: 300,
    height: 40,
    borderRadius: 20,
    alignSelf: 'center',
    padding: '2%',
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
