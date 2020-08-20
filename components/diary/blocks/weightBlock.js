import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
//third party library
import Modal from 'react-native-modal';
import moment from 'moment';
//component
import Header from './header';
import WeightLogBlock from '../../logs/weightLogBlock';
//function
import {getDateObj, getTime} from '../../../commonFunctions/diaryFunctions';

const WeightBlock = (props) => {
  const {weight} = props;
  let dateString = String(weight.record_date);
  let time = getTime(dateString);

  const img = require('../../../resources/images/weight.jpg');
  const logo = require('../../../resources/images/weight_logo.png');
  const initialWeight = String(weight.weight);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(getDateObj(dateString));
  const [weightValue, setWeightValue] = useState(initialWeight);
  const [disable, setDisabled] = useState(true);

  //close itself
  const closeModal = () => {
    setModalVisible(false);
    setWeight(initialWeight);
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

  //handle delete of log
  const handleDelete = () => {};

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
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        style={{justifyContent: 'flex-end'}}>
        <Header title={'Weight:' + time} closeModal={closeModal} />
        <View style={styles.modalContainer}>
          <WeightLogBlock
            date={date}
            setDate={setDate}
            weight={weightValue}
            setWeight={setWeight}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {disable == true ? (
              <TouchableOpacity
                disabled={disable}
                style={[styles.actionButton, {backgroundColor: '#cdd4e4'}]}>
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.actionButton, {backgroundColor: '#aad326'}]}>
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.actionButton, {backgroundColor: '#ffb7e7'}]}>
              <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  actionButton: {
    borderRadius: 20,
    margin: '2%',
    flexDirection: 'row',
    padding: '10%',
    alignSelf: 'center',
    marginVertical: 10,
    paddingHorizontal: 40,
    paddingVertical: 6,
  },
  actionText: {
    fontWeight: '700',
    fontSize: 17,
    textAlign: 'center',
  },
});
