import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
} from 'react-native';
//component
import SetPassword from './setPassword';
import Header from '../diary/blocks/header';
//third party library
import Modal from 'react-native-modal';
//function
import {
  getPassword,
  getToken,
  storePassword,
} from '../../storage/asyncStorageFunctions';
import {resetPassword} from '../../netcalls/requestsPasswordReset';

const EditPasswordModal = (props) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [inputCurrent, setInputCurrent] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [strong, setStrong] = useState(false);

  useEffect(() => {
    setInputCurrent('');
    setNewPassword('');
    setConfirmPassword('');

    getToken().then((value) => {
      setToken(value);
    });

    getPassword().then((data) => {
      setCurrentPassword(data);
    });
  }, []);

  const setPassword = (password, score) => {
    setNewPassword(password);
    if (Number(score) >= 2) {
      setStrong(true);
    } else {
      setStrong(false);
    }
  };

  const handleSubmit = () => {
    if (inputCurrent != currentPassword) {
      Alert.alert(
        'Invalid Password',
        'Please make sure you enter your current password correctly.',
        [
          {
            text: 'Got It',
          },
        ],
        {cancelable: false},
      );
    }
    if (
      inputCurrent === currentPassword &&
      newPassword != '' &&
      confirmPassword != '' &&
      confirmPassword === newPassword &&
      strong
    ) {
      resetPassword(newPassword, token).then((result) => {
        Alert.alert(
          'Password Change Success',
          '',
          [
            {
              text: 'Got It',
              onPress: () => props.close(),
            },
          ],
          {cancelable: false},
        );
        storePassword(newPassword);
      });
    }
    if (!strong) {
      Alert.alert(
        'Weak Password',
        'Please make sure new password is of at least strength fair',
        [
          {
            text: 'Got It',
          },
        ],
        {cancelable: false},
      );
    }

    if (newPassword != confirmPassword) {
      Alert.alert(
        'Wrong password',
        'Please make sure your new password inputs are correct.',
        [
          {
            text: 'Got It',
          },
        ],
        {cancelable: false},
      );
    }

    if (
      confirmPassword === '' ||
      newPassword === '' ||
      currentPassword === ''
    ) {
      Alert.alert(
        'Invalid Inputs',
        'Please make sure all fields are filled in.',
        [
          {
            text: 'Got It',
          },
        ],
        {cancelable: false},
      );
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
          <Header title={'Change Password'} closeModal={props.close} />
          <TextInput
            style={styles.inputBox}
            placeholder="Current Password"
            placeholderTextColor="#a1a3a0"
            secureTextEntry={true}
            onChangeText={setInputCurrent}
          />
          <SetPassword
            setPassword={setPassword}
            setPassword2={setConfirmPassword}
            checkPassword={handleSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditPasswordModal;

const styles = StyleSheet.create({
  inputBox: {
    width: Dimensions.get('window').width - 60,
    borderRadius: 20,
    backgroundColor: '#EEF3BD',
    paddingStart: 30, //position placeholder text
    marginVertical: 10,
    alignSelf: 'center',
    padding: '3%',
    marginTop: '7%',
  },
});
