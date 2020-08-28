import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
//third party library
import Modal from 'react-native-modal';
//component
import Header from './header';
import WeightLogBlock from '../../logs/weightLogBlock';
import ActionButton from './actionBtn';
//function
import {getDateObj, getTime} from '../../../commonFunctions/diaryFunctions';

const WeightBlock = (props) => {
  const {weight} = props;
  let dateString = String(weight.record_date);
  let time = getTime(dateString);

  const img = require('../../../resources/images/weight.jpg');
  const logo = require('../../../resources/images/weight_logo.png');
  const initialWeight = String(weight.weight);
  const initialDate = getDateObj(dateString);
  const [modalVisible, setModalVisible] = useState(false);
  const [dateValue, setDateValue] = useState(initialDate);
  const [weightValue, setWeightValue] = useState(initialWeight);
  const [disable, setDisabled] = useState(true);

  //close itself
  const closeModal = () => {
    setModalVisible(false);
    setWeight(initialWeight);
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
  const setWeight = (value) => {
    setWeightValue(value);
    if (value != initialWeight) {
      setDisabled(false);
    } else if (value == initialWeight) {
      setDisabled(true);
    }
  };

  const handleEdit = () => {
    console.log('edit weight log');
  };

  const handleDelete = () => {
    console.log('delete weight log');
  };

  return (
    <View style={{flexBasis: '33.3%'}}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}>
        <Image source={logo} style={styles.iconImg} />
        <Text style={styles.buttonText1}>Weight</Text>
        <ImageBackground source={img} style={styles.backgroundImg} />
      </TouchableOpacity>
      <Text style={{textAlign: 'center'}}>{time}</Text>
      {/* Open details of log*/}
      <Modal
        isVisible={modalVisible}
        animationIn="slideInUp"
        onBackdropPress={() => closeModal()}
        onBackButtonPress={() => closeModal()}
        style={{justifyContent: 'flex-end'}}>
        <Header title={'Weight:' + time} closeModal={closeModal} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <View style={styles.modalContainer}>
            <WeightLogBlock
              date={dateValue}
              setDate={setDate}
              weight={weightValue}
              setWeight={setWeight}
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

export default WeightBlock;

const styles = StyleSheet.create({
  container: {
    width: '100%', // This should be the same size as backgroundImg height
    alignSelf: 'center',
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
    top: '75%',
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
