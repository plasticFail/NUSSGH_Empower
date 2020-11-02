import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Animated} from 'react-native';
import {Colors} from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import LoadingModal from '../loadingModal';
import {storeAuthorisedStatusCaregiver} from '../../storage/asyncStorageFunctions';

const AuthorisationCaregiver = (props) => {
  const {setAuthorise} = props;
  const [open, setOpen] = useState(true);
  const [otp, setOtp] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    if (otp.length === 6) {
      //assuming otp is correct.
      setLoading(true);
      setTimeout(() => {
        storeAuthorisedStatusCaregiver(true).then((rsp) => {
          setAuthorise(true);
        });
      }, 2000);
    }
  }, [otp]);

  return (
    <View style={{backgroundColor: Colors.backgroundColor}}>
      <View style={styles.cardTab}>
        <View style={styles.headerTab}>
          <Text style={[styles.headerText, {flex: 1}]}>Authorisation</Text>
        </View>
      </View>
      {/*Content */}
      <View
        style={{
          backgroundColor: '#e1e7ed',
          height: '100%',
        }}>
        <View style={{marginBottom: '2%'}}>
          <Text
            style={[
              globalStyles.field,
              {marginStart: '5%', alignSelf: 'flex-start'},
            ]}>
            To manage a Patient, an authorization code is required from the
            Patient:
          </Text>
          <OTPInputView
            pinCount={6}
            style={{
              width: '90%',
              height: 100,
              fontWeight: '1000',
              padding: '5%',
              alignSelf: 'center',
            }}
            placeholderTextColor="black"
            autoFocusOnLoad
            codeInputFieldStyle={styles.otpInput}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeChanged={(value) => {
              setOtp(value);
            }}
          />
        </View>
      </View>
      <LoadingModal visible={loading} message={'Validating OTP'} />
    </View>
  );
};

export default AuthorisationCaregiver;

const styles = StyleSheet.create({
  cardTab: {
    backgroundColor: '#e1e7ed',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  headerTab: {
    padding: '3%',
    flexDirection: 'row',
  },
  headerText: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 18,
    marginStart: '3%',
    color: '#3c3c43',
    opacity: 0.6,
  },
  //otp
  otpInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 20,
    color: 'black',
  },
});
