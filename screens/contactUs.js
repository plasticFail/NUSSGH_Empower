import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
//third party
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
//component
import RadioButton from '../components/radioButton';
import FormFieldBlock from '../components/formFieldBlock';

SimpleLineIcons.loadFont();

const forget_login = 'ForgetLogin';
const phone_change = 'PhoneChange';
const lost = 'LostPhone';
const emailRgx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ContactUs = (props) => {
  const [forgetLogin, setForgetLogin] = useState(true);
  const [phoneNoChange, setPhoneNoChange] = useState(false);
  const [lostPhone, setLostPhone] = useState(false);
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');

  const makeSelection = (type) => {
    if (type === 'ForgetLogin') {
      setForgetLogin(true);
      setPhoneNoChange(false);
      setLostPhone(false);
    }
    if (type === 'PhoneChange') {
      setForgetLogin(false);
      setPhoneNoChange(true);
      setLostPhone(false);
    }
    if (type === 'LostPhone') {
      setForgetLogin(false);
      setPhoneNoChange(false);
      setLostPhone(true);
    }
  };

  const submit = () => {
    if (description === '' || email === '') {
      Alert.alert(
        'Invalid Input',
        'Please make sure to fill in all the relevant fields',
        [{text: 'Got It'}],
      );
    } else if (!emailRgx.test(email)) {
      Alert.alert(
        'Invalid Email Address',
        'Please input a valid email address',
        [{text: 'Got It'}],
      );
    } else {
      Alert.alert(
        'Enquiry Sent successfully',
        'Please give us a few working days to get back to you!',
        [{text: 'Got It', onPress: () => props.navigation.navigate('Login')}],
      );
    }
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <View style={styles.container}>
        <View style={styles.inner}>
          <SimpleLineIcons
            name="question"
            size={130}
            style={{alignSelf: 'center'}}
          />
          <View style={{margin: '3%'}}>
            <Text style={styles.formHeader}>
              Please select the reason for enquiry:
            </Text>
            <TouchableOpacity onPress={() => makeSelection(forget_login)}>
              <RadioButton
                btnText={'Forget Login Credential'}
                color={'black'}
                selected={forgetLogin}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => makeSelection(phone_change)}>
              <RadioButton
                btnText={'Request Phone Number Change'}
                color={'black'}
                selected={phoneNoChange}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => makeSelection(lost)}>
              <RadioButton
                btnText={'Lost Phone'}
                color={'black'}
                selected={lostPhone}
              />
            </TouchableOpacity>
          </View>
          <FormFieldBlock
            title="Description"
            expandable={true}
            setText={setDescription}
          />
          <FormFieldBlock
            title="Email Address"
            expandable={false}
            setText={setEmail}
          />
          <View style={{flex: 2}} />
          <TouchableOpacity style={styles.button} onPress={submit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  headingText: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'center',
    width: '100%',
    marginBottom: '6%',
  },
  inner: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  questionHeader: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
    marginTop: '5%',
    marginStart: '2%',
  },
  formHeader: {
    fontWeight: '500',
    fontSize: 20,
    marginTop: '3%',
    marginBottom: '3%',
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
