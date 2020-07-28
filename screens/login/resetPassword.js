import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ResetPasswordScreen = (props) => {
  Icon.loadFont();
  return (
    <View style={{...styles.resetPasswordScreen, ...props.style}}>
      <Icon name="account-lock" size={300} />
      <View style={[styles.formContainer, styles.shadow]}>
        <TextInput
          style={styles.inputBox}
          placeholder="New Password"
          placeholderTextColor="#a1a3a0"
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Confirm New Password"
          placeholderTextColor="#a1a3a0"
        />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            props.navigation.navigate('Login');
          }}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resetPasswordScreen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
