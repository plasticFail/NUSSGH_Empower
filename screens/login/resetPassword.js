import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {resetPassword} from '../../netcalls/requestsPasswordReset';
import globalStyles from '../../styles/globalStyles';
import PasswordStrengthMeter from '../../components/passwordStrengthMeter';
import {adjustSize} from '../../commonFunctions/autoResizeFuncs';
import loginStyles, {loginLogoStyle} from '../../styles/loginStyles';

import Logo from '../../resources/images/Patient-Icons/SVG/icon-color-empower.svg';
import {Colors} from '../../styles/colors';

const ResetPasswordScreen = (props) => {
  const {token, selection} = props.route.params; //rememberundo
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [strong, setStrong] = useState(false);

  console.log(token);
  console.log(selection);

  const setPassword = (password, score) => {
    setPass1(password);
    console.log(score);
    if (Number(score) >= 2) {
      setStrong(true);
    } else {
      setStrong(false);
    }
  };

  const checkInput = () => {
    if (pass1.length > 0 && pass2.length > 0) {
      if (pass1 != pass2) {
        return 'Passwords does not match';
      }
    }
    if (pass1 && !strong) {
      return 'Please input a password of at least strength fair';
    }

    return '';
  };

  const showSubmit = () => {
    if (checkInput() === '' && strong) {
      return true;
    }
    return false;
  };

  const submitPassword = () => {
    if (showSubmit()) {
      resetPassword(pass1, token, selection).then((response) => {
        if (response) {
          Alert.alert(
            'Success',
            'Password changed.',
            [
              {
                text: 'Got It',
                onPress: () => props.navigation.navigate('Login'),
              },
            ],
            {cancelable: false},
          );
        }
      });
    } else {
      Alert.alert(
        'Please make sure passwords match and is of at least strength fair',
        '',
        [{text: 'Got It'}],
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <View style={loginStyles.container}>
        <View style={{flex: 1}} />
        <Logo {...loginLogoStyle} />
        <Text style={loginStyles.headerText}>Change Password</Text>
        <Text style={loginStyles.subText}>
          Verification was a success, please enter the password that you wish to
          change to:
        </Text>
        <View style={{marginTop: '10%'}}>
          <PasswordStrengthMeter
            setPassword={setPassword}
            style={{...loginStyles.inputBox, ...{borderWidth: 0}}}
            notLogined={true}
            strengthContainerStyle={{
              borderWidth: 1,
              borderRadius: 20,
              borderColor: 'white',
            }}
          />
          <TextInput
            style={loginStyles.inputBox}
            placeholder="Confirm New Password"
            placeholderTextColor={Colors.loginPlaceholder}
            secureTextEntry={true}
            onChangeText={setPass2}
          />
          <TouchableOpacity
            style={[
              globalStyles.nextButtonStyle,
              {backgroundColor: 'white', marginBottom: 0},
            ]}
            onPress={submitPassword}>
            <Text style={globalStyles.actionButtonText}>Change Password</Text>
          </TouchableOpacity>
          <Text
            style={loginStyles.clickableText}
            onPress={() => props.navigation.navigate('Login')}>
            Cancel
          </Text>
        </View>
        <View style={{flex: 2}} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  resetPasswordScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    padding: adjustSize(10),
    flex: 1,
    justifyContent: 'flex-end',
  },
  text: {
    fontWeight: '500',
    marginTop: '2%',
    fontSize: adjustSize(20),
    textAlign: 'center',
    marginStart: '2%',
    marginEnd: '2%',
  },
  headerText: {
    alignSelf: 'center',
    fontSize: adjustSize(18),
  },
  subText: {
    fontSize: adjustSize(18),
    marginStart: '3%',
    marginTop: '2%',
  },
  formContainer: {
    width: Dimensions.get('window').width - adjustSize(20),
    backgroundColor: 'white',
    borderRadius: adjustSize(25),
    paddingTop: '5%',
    paddingBottom: '3%',
  },
  inputBox: {
    width: Dimensions.get('window').width - adjustSize(30),
    borderRadius: adjustSize(20),
    backgroundColor: '#EEF3BD',
    paddingStart: adjustSize(30), //position placeholder text
    marginVertical: adjustSize(10),
    alignSelf: 'center',
    padding: '3%',
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
  buttonStyle: {
    backgroundColor: '#AAD326',
    borderRadius: adjustSize(20),
    alignSelf: 'center',
    padding: '3%',
    marginTop: ' 2%',
  },
  buttonText: {
    fontSize: adjustSize(20),
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default ResetPasswordScreen;
