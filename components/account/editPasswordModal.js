import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Text,
  Alert,
  Platform,
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
import globalStyles from '../../styles/globalStyles';
import LeftArrowBtn from '../logs/leftArrowBtn';
import PasswordStrengthMeter from '../passwordStrengthMeter';

const EditPasswordModal = (props) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [inputCurrent, setInputCurrent] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [strong, setStrong] = useState(false);

  useEffect(() => {
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

  const showSubmit = () => {
    if (
      checkInput() === '' &&
      currentPassword &&
      strong &&
      newPassword &&
      confirmPassword
    ) {
      return true;
    }
    return false;
  };

  const checkInput = () => {
    if (inputCurrent) {
      if (inputCurrent != currentPassword) {
        return 'Please make sure you enter your current password correctly.';
      }
    }
    if (newPassword) {
      if (!strong) {
        return 'Please make sure new password is of at least strength fair';
      }
    }
    if (newPassword && confirmPassword) {
      if (newPassword != confirmPassword) {
        return 'New passwords does not match';
      }
    }
    return '';
  };

  const handleSubmit = () => {
    if (
      checkInput() === '' &&
      inputCurrent === currentPassword &&
      newPassword != '' &&
      confirmPassword != '' &&
      confirmPassword === newPassword &&
      strong
    ) {
      resetPassword(newPassword, token).then((result) => {
        Alert.alert(
          'Password Change Successfully',
          '',
          [
            {
              text: 'Got It',
              onPress: () => {
                setInputCurrent('');
                setNewPassword('');
                setConfirmPassword('');
                props.close();
              },
            },
          ],
          {cancelable: false},
        );
        storePassword(newPassword);
      });
    }
  };

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
        {props.parent === 'edit' ? (
          <Text style={globalStyles.pageHeader}>Edit Password</Text>
        ) : (
          <Text style={globalStyles.pageHeader}>Change Password</Text>
        )}
        <Text style={[globalStyles.pageSubDetails, {fontSize: 18}]}>
          Please enter the password that you wish to change to:
        </Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <TextInput
            style={globalStyles.editInputBox}
            placeholder="Current Password"
            placeholderTextColor="#a1a3a0"
            secureTextEntry={true}
            onChangeText={setInputCurrent}
          />
          <PasswordStrengthMeter setPassword={setPassword} />
          <TextInput
            style={globalStyles.editInputBox}
            placeholder="Confirm New Password"
            placeholderTextColor="#a1a3a0"
            secureTextEntry={true}
            onChangeText={setConfirmPassword}
          />
          <Text style={[globalStyles.alertText, {marginStart: '4%'}]}>
            {checkInput()}
          </Text>
        </KeyboardAvoidingView>
      </View>
      <View style={globalStyles.buttonContainer}>
        {showSubmit() ? (
          <TouchableOpacity
            style={globalStyles.submitButtonStyle}
            onPress={() => handleSubmit()}>
            <Text style={globalStyles.actionButtonText}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={globalStyles.skipButtonStyle}>
            <Text style={globalStyles.actionButtonText}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

export default EditPasswordModal;
