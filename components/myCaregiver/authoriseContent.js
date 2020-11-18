import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
//third party lib
import Modal from 'react-native-modal';
import LeftArrowBtn from '../logs/leftArrowBtn';
import {Colors} from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';
import CountdownTimer from '../countdownTimer';

const AuthoriseContent = (props) => {
  const {pinNum} = props;
  const [pinArr, setPinArr] = useState(pinNum?.split(''));

  return (
    <>
      <Text style={[globalStyles.pageSubDetails, {marginTop: '4%'}]}>
        To appoint a Caregiver, show the below authorization code to the
        Caregiver
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          margin: '10%',
          alignItems: 'center',
        }}>
        {pinArr?.map((item, index) => (
          <Text key={index} style={styles.pinNo}>
            {item}
          </Text>
        ))}
      </View>
      <Text style={styles.acknowledgeText}>
        By sharing the authorisation code, your First Name will also be shared
        with the Caregiver
      </Text>
    </>
  );
};

export default AuthoriseContent;

const styles = StyleSheet.create({
  pinNo: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 20,
  },
  acknowledgeText: {
    textAlign: 'center',
    margin: '6%',
    marginTop: '3%',
    opacity: 0.5,
    fontSize: 15,
  },
});
