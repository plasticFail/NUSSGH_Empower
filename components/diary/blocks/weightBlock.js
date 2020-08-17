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
import Modal from 'react-native-modal';
import Header from './header';
import DataField from './dataField';

const WeightBlock = (props) => {
  const {weight} = props;
  let dateString = String(weight.record_date);
  const time = dateString.substring(
    dateString.indexOf('2020') + 4,
    dateString.length - 3,
  );
  const img = require('../../../resources/images/weight.jpg');
  const logo = require('../../../resources/images/weight_logo.png');
  const [modalVisible, setModalVisible] = useState(false);

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
        style={styles.buttonStyle}
        onPress={() => setModalVisible(true)}>
        <Image source={logo} style={styles.iconImg} />
        <Text style={styles.buttonText1}>Weight</Text>
        <ImageBackground source={img} style={styles.backgroundImg} />
      </TouchableOpacity>
      <Modal
        isVisible={modalVisible}
        animationIn="slideInUp"
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        style={{justifyContent: 'flex-end'}}>
        <Header title={'Weight:' + time} closeModal={closeModal} />
        <View style={styles.modalContainer}>
          <DataField fieldName="Record Date Time" value={dateString} />
          <DataField fieldName="Weight" value={String(weight.weight)} />
        </View>
      </Modal>
    </View>
  );
};

export default WeightBlock;

const styles = StyleSheet.create({
  buttonStyle: {
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
    top: '70%',
    left: '6%',
    fontSize: 18,
    fontWeight: '700',
    color: '#072d08',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: '3%',
  },
});
