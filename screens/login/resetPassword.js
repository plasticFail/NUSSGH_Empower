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

const ResetPasswordScreen = (props) => {
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');

  const checkPassword = () => {
    if (pass1.length > 8 && pass2.length > 8) {
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
      Alert.alert('Error', 'Please input a password of more than length 8', [
        {text: 'Got It'},
      ]);
    }
  };

  Icon.loadFont();
  return (
    <ScrollView contentContainerStyle={{paddingBottom: ' 4%'}}>
      <View style={{...styles.resetPasswordScreen, ...props.style}}>
        <Icon name="account-lock" size={270} />
        <Text style={styles.text}>
          Please ensure new password length is more than 8
        </Text>
        <View style={[styles.formContainer, styles.shadow]}>
          <TextInput
            style={styles.inputBox}
            placeholder="New Password"
            placeholderTextColor="#a1a3a0"
            secureTextEntry={true}
            onChangeText={(value) => {
              setPass1(value);
            }}
          />
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  resetPasswordScreen: {
    flex: 1,
    padding: 4,
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
    margin: '7%',
    padding: '4%',
    backgroundColor: 'white',
    borderRadius: 25,
  },
  inputBox: {
    width: Dimensions.get('window').width - 70,
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
