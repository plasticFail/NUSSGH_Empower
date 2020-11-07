import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//third party lib
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
//style
import {Colors} from '../styles/colors';
import globalStyles from '../styles/globalStyles';
import TICK from '../resources/images/Patient-Icons/SVG/icon-green-accept.svg';
import CROSS from '../resources/images/Caregiver-Additional-Icons/SVG/cg-icon-red-denied.svg';

const iconStyle = {
  width: 40,
  height: 40,
  marginTop: '5%',
  marginStart: '3%',
};

function AuthoriseSuccessMsg(props) {
  const {visible, type} = props;
  const {closeSuccess} = props;
  const navigation = useNavigation();

  const springAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setTimeout(() => {
        Animated.spring(springAnim, {
          toValue: 1,
          friction: 2,
          useNativeDriver: true,
        }).start();
      }, 500);
    }
    return () => {
      isMounted = false;
    };
  }, [visible, type]);

  return (
    <Modal isVisible={visible} animationIn="slideInUp">
      <View style={styles.modalContainer}>
        <Text
          style={{
            fontSize: 20,
            marginTop: '3%',
            fontFamily: 'SFProDisplay-Regular',
          }}>
          Authorization Success
        </Text>
        <Animated.View
          style={{
            height: 80,
            width: 80,
            transform: [{scale: springAnim}],
          }}>
          <Ionicon
            name="checkmark-circle-outline"
            color={Colors.backArrowColor}
            size={80}
          />
        </Animated.View>

        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#aad326'}]}
          onPress={() => closeSuccess()}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <View style={[styles.border, {marginTop: '3%'}]} />

        {/*Granted/ Denied */}
        <View style={styles.accessContainer}>
          <TICK {...iconStyle} />
          <View style={{marginTop: '5%', flex: 2}}>
            <Text style={[globalStyles.pageDetails, styles.accessText]}>
              Access Granted
            </Text>
            <Text style={globalStyles.pageDetails}>
              Name, Date of Birth, Weight
            </Text>
          </View>
        </View>
        <View style={[styles.border, {marginTop: '2%'}]} />

        <View style={styles.accessContainer}>
          <CROSS {...iconStyle} />
          <View style={{marginTop: '4%', flex: 2}}>
            <Text style={[globalStyles.pageDetails, styles.accessText]}>
              Access Denied
            </Text>
            <Text style={globalStyles.pageDetails}>ID</Text>
          </View>
        </View>
        <View style={[styles.border, {marginTop: '2%'}]} />
        <Text style={styles.pdpaText}>
          Learn more about{' '}
          <Text style={{color: '#aad326', fontFamily: 'SFProDisplay-Bold'}}>
            PDPA
          </Text>
          .
        </Text>
      </View>
    </Modal>
  );
}

export default AuthoriseSuccessMsg;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 20,
    width: '100%',
    paddingBottom: '4%',
  },
  button: {
    backgroundColor: '#EEF3BD',
    borderRadius: 9.5,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    width: Dimensions.get('window').width - 90,
  },
  buttonText: {
    fontSize: 23,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'SFProDisplay-Bold',
  },
  border: {
    borderWidth: 0.5,
    borderColor: '#e2e8ee',
    width: '100%',
  },
  accessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginStart: '3%',
    marginEnd: '3%',
  },
  accessText: {
    color: Colors.lastLogValueColor,
    marginBottom: 0,
  },
  pdpaText: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 15,
    marginTop: '4%',
  },
});
