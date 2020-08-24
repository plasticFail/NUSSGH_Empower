import EditPasswordModal from './editPasswordModal';

import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
//third party library
import Modal from 'react-native-modal';
//component
import Header from '../diary/blocks/header';

const emailRgx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const EditPhoneModal = (props) => {
  const [email, setEmail] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  const checkPhoneNumber = (phoneNum) => {
    let first = phoneNum.substring(0, 1);
    if (first === '8' || first === '9') {
      if (String(phoneNum).length == 8) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const submit = () => {
    if (email === '' || newPhoneNumber == '') {
      Alert.alert(
        'Invalid Inputs',
        'Please make sure all the inputs are filled.',
        [{text: 'Got It'}],
      );
    }
    if (emailRgx.test(email) && checkPhoneNumber(newPhoneNumber)) {
      Alert.alert(
        'Enquiry Sent successfully',
        'Please give your RC a few working days to get back to you!',
        [
          {
            text: 'Got It',
            onPress: () => {
              setEmail('');
              setNewPhoneNumber('');
              props.close();
            },
          },
        ],
      );
    } else if (!emailRgx.test(email)) {
      Alert.alert(
        'Invalid Email Address',
        'Please input a valid email address',
        [{text: 'Got It'}],
      );
    } else if (!checkPhoneNumber(newPhoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please input a valid phone number', [
        {text: 'Got It'},
      ]);
    }
  };
  return (
    <Modal
      isVisible={props.visible}
      animationIn="slideInUp"
      onBackdropPress={props.close}
      onBackButtonPress={props.close}
      style={{justifyContent: 'flex-end'}}>
      <KeyboardAvoidingView behavior="padding">
        <View style={{backgroundColor: 'white'}}>
          <Header title={'Change Phone Number'} closeModal={props.close} />
          <Text style={styles.header}>
            Send a phone number change request to your RC!
          </Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Email Address"
            placeholderTextColor="#a1a3a0"
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="New Phone Number"
            placeholderTextColor="#a1a3a0"
            secureTextEntry={true}
            onChangeText={setNewPhoneNumber}
            keyboardType="number-pad"
            maxLength={8}
          />
          <TouchableOpacity style={styles.button} onPress={submit}>
            <Text style={styles.buttonText}>Send Request</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditPhoneModal;

const styles = StyleSheet.create({
  inputBox: {
    width: Dimensions.get('window').width - 60,
    borderRadius: 20,
    backgroundColor: '#EEF3BD',
    paddingStart: 30, //position placeholder text
    marginVertical: 10,
    alignSelf: 'center',
    padding: '3%',
  },
  header: {
    fontSize: 18,
    margin: '3%',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#AAD326',
    width: 300,
    height: 40,
    borderRadius: 20,
    marginVertical: 10,
    paddingVertical: 6,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 23,
    fontWeight: '500',
    textAlign: 'center',
  },
});
