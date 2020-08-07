import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PasswordStrengthMeter from '../../components/passwordStrengthMeter';

const ResetPasswordScreen = (props) => {
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
        Alert.alert(
          'Success',
          'Password changed successfully',
          [{text: 'Got It', onPress: () => props.navigation.navigate('Login')}],
          {cancelable: false},
        );
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
    <ScrollView contentContainerStyle={{paddingBottom: ' 8%'}}>
      <Icon name="account-lock" size={180} style={{alignSelf: 'center'}} />
      <Text style={{alignSelf: 'center', margin: '3%', fontSize: 20}}>
        Set a password that has a mixture of alphabets, special characters (!,-)
      </Text>
      <View style={[styles.formContainer, styles.shadow]}>
        <PasswordStrengthMeter setPassword={setPassword} />
        <TextInput
          style={styles.inputBox}
          placeholder="Confirm New Password"
          placeholderTextColor="#a1a3a0"
          secureTextEntry={true}
          onChangeText={(value) => {
            setPass2(value);
          }}
        />
        <TouchableOpacity style={styles.buttonStyle} onPress={checkPassword}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  resetPasswordScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '500',
    marginTop: '2%',
    fontSize: 20,
    textAlign: 'center',
    marginStart: '2%',
    marginEnd: '2%',
  },
  formContainer: {
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    borderRadius: 25,
    paddingTop: '3%',
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
