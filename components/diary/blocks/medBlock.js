import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';
//third party library
import Modal from 'react-native-modal';
//component
import Header from './header';
import MedicationLogBlock from '../../logs/medicationLogBlock';
//function
import {getTime, getDateObj} from '../../../commonFunctions/diaryFunctions';

const MedBlock = (props) => {
  const {medicationList} = props;
  //format date string
  let dateString = String(medicationList[0].recordDate);
  let time = getTime(dateString);
  let initalList = medicationList;
  const img = require('../../../resources/images/medication.jpeg');
  const logo = require('../../../resources/images/medication_logo.png');
  const [modalVisible, setModalVisible] = useState(false);
  const [list, setList] = useState(medicationList);
  const [date, setDate] = useState(getDateObj(dateString));
  const [disable, setDisabled] = useState(true);

  //close itself
  const closeModal = () => {
    setModalVisible(false);
  };

  //open edit modal

  //handle delete of log
  const handleDelete = () => {};

  const onListChange = (list) => {
    setList([...list]);
    if (JSON.stringify(list) === JSON.stringify(initalList)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  return (
    <View style={{flexBasis: '33.3%'}}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}>
        <Image source={logo} style={styles.iconImg} />
        <Text style={styles.buttonText1}>Medication</Text>
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
        <Header title={'Medication:' + time} closeModal={closeModal} />
        <View style={styles.modalContainer}>
          <MedicationLogBlock
            date={date}
            setDate={setDate}
            selectedMedicationList={list}
            onListChange={onListChange}
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

export default MedBlock;

const styles = StyleSheet.create({
  container: {
    width: '100%', // This should be the same size as backgroundImg height
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
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
    flex: 1,
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
  medicationAddedText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
