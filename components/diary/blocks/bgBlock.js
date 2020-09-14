import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
//third party library
import Modal from 'react-native-modal';
//component
import Header from './header';
import BloodGlucoseLogBlock from '../../logs/bg/bloodGlucoseLogBlock';
import ActionButton from './actionBtn';
//function
import {getTime, getDateObj} from '../../../commonFunctions/diaryFunctions';

const BgBlock = (props) => {
  const {bloodGlucose} = props;
  //format date
  let dateString = String(bloodGlucose.record_date);
  let time = getTime(dateString);

  const img = require('../../../resources/images/bloodglucose.jpg');
  const logo = require('../../../resources/images/bloodglucose_logo.png');
  const initialBg = String(bloodGlucose.bg_reading);
  const initialDate = getDateObj(dateString);
  const [modalVisible, setModalVisible] = useState(false);
  const [dateValue, setDateValue] = useState(initialDate);
  const [bg, setBg] = useState(initialBg);
  const [disable, setDisabled] = useState(true);

  //close itself
  const closeModal = () => {
    setModalVisible(false);
    setBgValue(initialBg);
    setDateValue(initialDate);
  };

  const setDate = (value) => {
    setDateValue(value);
    if (value != initialDate) {
      setDisabled(false);
    } else if (value == initialDate) {
      setDisabled(true);
    }
  };

  //enable edit button
  const setBgValue = (value) => {
    setBg(value);
    if (value != initialBg) {
      setDisabled(false);
    } else if (value == initialBg) {
      setDisabled(true);
    }
  };

  //handle delete of log
  const handleDelete = () => {
    console.log('delete blood glucose');
  };

  //handle edit
  const handleEdit = () => {
    console.log('edit blood glucose');
  };

  return (
    <View style={{flexBasis: '33.3%'}}>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => setModalVisible(true)}>
        <Image source={logo} style={styles.iconImg} />
        <Text style={styles.buttonText1}>Blood Glucose</Text>
        <ImageBackground source={img} style={styles.backgroundImg} />
      </TouchableOpacity>
      <Text style={{textAlign: 'center'}}>{time}</Text>
      <Modal
        isVisible={modalVisible}
        animationIn="slideInUp"
        onBackdropPress={() => closeModal()}
        onBackButtonPress={() => closeModal()}
        style={{flex: 1, justifyContent: 'flex-end'}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <Header title={'Blood Glucose:' + time} closeModal={closeModal} />
          <View style={styles.modalContainer}>
            <BloodGlucoseLogBlock
              date={dateValue}
              setDate={setDate}
              bloodGlucose={bg}
              setBloodGlucose={setBgValue}
            />
            <ActionButton
              disable={disable}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default BgBlock;

const styles = StyleSheet.create({
  buttonStyle: {
    width: '100%', // This should be the same size as backgroundImg height
    padding: 10,
  },
  iconImg: {
    position: 'absolute',
    top: '40%',
    left: '20%',
    width: 30,
    height: 30,
    resizeMode: 'contain', //resize image so dont cut off
  },
  backgroundImg: {
    width: '100%',
    height: 120,
    opacity: 0.3,
    borderWidth: 0.4,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#aad326',
  },
  buttonText1: {
    position: 'absolute',
    top: '70%',
    left: '19%',
    fontSize: 18,
    fontWeight: '700',
    color: '#072d08',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: '3%',
  },
});
