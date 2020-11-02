import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {resetPassword} from '../../netcalls/requestsPasswordReset';
import SetPassword from '../../components/account/setPassword';
import LeftArrowBtn from '../../components/logs/leftArrowBtn';
import globalStyles from '../../styles/globalStyles';
import PasswordStrengthMeter from '../../components/passwordStrengthMeter';

const ResetPasswordScreen = (props) => {
  const {token, selection} = props.route.params; //rememberundo
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [strong, setStrong] = useState(false);

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
    if (checkInput() == '' && strong) {
      return true;
    }
    return false;
  };

  const submitPassword = () => {
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
  };

  return (
    <View style={globalStyles.editPageContainer}>
      <View style={globalStyles.menuBarContainer}>
        <LeftArrowBtn close={() => props.navigation.goBack()} />
      </View>
      <Text style={globalStyles.pageHeader}>Reset Password</Text>
      <Text style={[globalStyles.pageSubDetails, {fontSize: 18}]}>
        Set a password that is not easily guessable.
      </Text>
      <PasswordStrengthMeter setPassword={setPassword} />
      <TextInput
        style={globalStyles.editInputBox}
        placeholder="Confirm New Password"
        placeholderTextColor="#a1a3a0"
        secureTextEntry={true}
        onChangeText={setPass2}
      />
      <Text style={[globalStyles.alertText, {marginStart: '3%'}]}>
        {checkInput()}
      </Text>
      <View style={{flex: 1}} />
      <View style={globalStyles.buttonContainer}>
        {showSubmit() ? (
          <TouchableOpacity
            style={globalStyles.submitButtonStyle}
            onPress={submitPassword}>
            <Text style={globalStyles.actionButtonText}>Change Password</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={globalStyles.skipButtonStyle}>
            <Text style={globalStyles.actionButtonText}>Change Password</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resetPasswordScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    padding: 10,
    flex: 1,
    justifyContent: 'flex-end',
  },
  text: {
    fontWeight: '500',
    marginTop: '2%',
    fontSize: 20,
    textAlign: 'center',
    marginStart: '2%',
    marginEnd: '2%',
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 18,
  },
  subText: {
    fontSize: 18,
    marginStart: '3%',
    marginTop: '2%',
  },
  formContainer: {
    width: Dimensions.get('window').width - 20,
    backgroundColor: 'white',
    borderRadius: 25,
    paddingTop: '5%',
    paddingBottom: '3%',
  },
  inputBox: {
    width: Dimensions.get('window').width - 30,
    borderRadius: 20,
    backgroundColor: '#EEF3BD',
    paddingStart: 30, //position placeholder text
    marginVertical: 10,
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
    borderRadius: 20,
    alignSelf: 'center',
    padding: '3%',
    marginTop: ' 2%',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default ResetPasswordScreen;
