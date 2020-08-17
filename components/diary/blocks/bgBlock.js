import React, {useState, useEffect} from 'react';
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
import BloodGlucoseLogBlock from '../../logs/bloodGlucoseLogBlock';
import DataField from './dataField';
import moment from 'moment';

const BgBlock = (props) => {
  const {bloodGlucose} = props;

  //format date
  let dateString = String(bloodGlucose.record_date);
  const time = dateString.substring(
    dateString.indexOf('2020') + 4,
    dateString.length - 3,
  );
  let dateMomentObject = moment(dateString, 'DD/MM/YYYY HH:mm:ss');
  let dateObject = dateMomentObject.toDate();

  const img = require('../../../resources/images/bloodglucose.jpg');
  const logo = require('../../../resources/images/bloodglucose_logo.png');
  const initialBg = String(bloodGlucose.bg_reading);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(dateObject);
  const [bg, setBg] = useState(initialBg);
  const [disable, setDisabled] = useState(true);

  //close itself
  const closeModal = () => {
    setModalVisible(false);
  };

  //handle edit

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
  const handleDelete = () => {};

  return (
    <View>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => setModalVisible(true)}>
        <Image source={logo} style={styles.iconImg} />
        <Text style={styles.buttonText1}>Blood Glucose</Text>
        <ImageBackground source={img} style={styles.backgroundImg} />
      </TouchableOpacity>
      <Modal
        isVisible={modalVisible}
        animationIn="slideInUp"
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        style={{justifyContent: 'flex-end'}}>
        <Header title={'Blood Glucose:' + time} closeModal={closeModal} />
        <View style={styles.modalContainer}>
          <BloodGlucoseLogBlock
            date={date}
            setDate={setDate}
            bloodGlucose={bg}
            setBloodGlucose={setBgValue}
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

export default BgBlock;

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
