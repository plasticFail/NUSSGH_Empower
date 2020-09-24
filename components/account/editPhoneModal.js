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
  Platform,
} from 'react-native';
//third party library
import Modal from 'react-native-modal';
//component
import Header from '../diary/blocks/header';
import globalStyles from '../../styles/globalStyles';
import LeftArrowBtn from '../logs/leftArrowBtn';
import InputOTPScreen from '../../screens/login/inputOTPScreen';

const emailRgx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const EditPhoneModal = (props) => {
  const [inputOTPShow, setInputOTPShow] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const {number} = props;

  return (
    <Modal
      isVisible={props.visible}
      animationIn="slideInUp"
      onBackdropPress={props.close}
      onBackButtonPress={props.close}
      style={{margin: 0}}>
      <View style={globalStyles.editPageContainer}>
        <View style={globalStyles.menuBarContainer}>
          <LeftArrowBtn close={props.close} />
        </View>
        <Text style={globalStyles.pageHeader}>Edit Mobile No.</Text>
        <Text style={globalStyles.pageDetails}>Verficiation Required</Text>
        <Text style={[globalStyles.pageSubDetails, {fontSize: 18}]}>
          For security purposes, we will send you a One Time Password (OTP) to:
        </Text>
        <Text style={[globalStyles.pageDetails, {marginTop: '2%'}]}>
          {number}
        </Text>
      </View>
      <View style={globalStyles.buttonContainer}>
        <TouchableOpacity
          style={globalStyles.nextButtonStyle}
          onPress={() => setInputOTPShow(true)}>
          <Text style={globalStyles.actionButtonText}>Get OTP</Text>
        </TouchableOpacity>
      </View>
      {inputOTPShow ? (
        <InputOTPScreen
          visible={inputOTPShow}
          close={() => setInputOTPShow(false)}
          phoneNumber={number}
          closeParent={() => props.close()}
        />
      ) : null}
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
