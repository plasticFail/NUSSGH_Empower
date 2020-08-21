import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {resetPassword} from '../../netcalls/requestsPasswordReset';
import SetPassword from '../../components/account/setPassword';

const ResetPasswordScreen = (props) => {
  const {token} = props.route.params; //rememberundo
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

  const checkPassword = () => {
    if (strong) {
      if (pass1 == pass2) {
        resetPassword(pass1, token).then((response) => {
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
        Alert.alert('Error', 'Passwords does not match', [{text: 'Got It'}]);
      }
    } else {
      Alert.alert(
        'Error',
        'Please input a password that has a strength of at least fair',
        [{text: 'Got It'}],
      );
    }
  };

  Icon.loadFont();
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.inner}>
          <Icon name="account-lock" size={200} style={{alignSelf: 'center'}} />
          <Text style={styles.headerText}>
            Set a password that is not easily guessable which can be a mix of :
          </Text>
          <Text style={styles.subText}>{'\u2713'} Alphabets</Text>
          <Text style={styles.subText}>{'\u2713'} Numbers</Text>
          <Text style={styles.subText}>{'\u2713'} Special Characters</Text>
          <SetPassword
            setPassword={setPassword}
            setPassword2={setPass2}
            checkPassword={checkPassword}
          />
          <View style={{flex: 1}} />
        </View>
      </SafeAreaView>
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
    marginTop: '1%',
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
