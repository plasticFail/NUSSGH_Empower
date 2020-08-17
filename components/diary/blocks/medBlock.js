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
import Modal from 'react-native-modal';
import Header from './header';
import DataField from './dataField';
import MedicationItem from '../../medicationItem';

const MedBlock = (props) => {
  const {medicationList} = props;

  const img = require('../../../resources/images/medication.jpeg');
  const logo = require('../../../resources/images/medication_logo.png');
  const [modalVisible, setModalVisible] = useState(false);

  //format date string
  let dateString = String(medicationList[0].recordDate);
  const time = dateString.substring(
    dateString.indexOf('2020') + 4,
    dateString.length - 3,
  );

  //close itself
  const closeModal = () => {
    setModalVisible(false);
  };

  //open edit modal

  //handle delete of log
  const handleDelete = () => {};

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}>
        <Image source={logo} style={styles.iconImg} />
        <Text style={styles.buttonText1}>Medication</Text>
        <ImageBackground source={img} style={styles.backgroundImg} />
      </TouchableOpacity>
      {/* Open details of log*/}
      <Modal
        isVisible={modalVisible}
        animationIn="slideInUp"
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        style={{justifyContent: 'flex-end'}}>
        <Header title={'Medication:' + time} closeModal={closeModal} />
        <View style={styles.modalContainer}>
          <DataField fieldName="Record Date Time" value={dateString} />
          <Text style={styles.medicationAddedText}>Medications Added:</Text>
          <FlatList
            data={medicationList}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <MedicationItem medication={item} />}
          />
        </View>
      </Modal>
    </View>
  );
};

export default MedBlock;

const styles = StyleSheet.create({
  container: {
    width: '40%', // This should be the same size as backgroundImg height
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  iconImg: {
    position: 'absolute',
    top: '40%',
    left: '7%',
    width: 40,
    height: 40,
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
    left: '6%',
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
  medicationAddedText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
