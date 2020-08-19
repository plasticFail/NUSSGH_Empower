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
//third party library
import Modal from 'react-native-modal';
import Moment from 'moment';
//components
import Header from './header';
import DataField from './dataField';
//function
import {getTime, getDateObj} from '../../../commonFunctions/diaryFunctions';

const ActivityBlock = (props) => {
  const {activity} = props;
  //format date
  let dateString = String(activity.record_date);
  let time = getTime(dateString);
  let date = Moment(getDateObj(dateString)).format('MMMM Do YYYY, h:mm a');
  let activityName =
    String(activity.name).charAt(0).toUpperCase() +
    String(activity.name).slice(1);

  const img = require('../../../resources/images/activity.jpg');
  const logo = require('../../../resources/images/activity_logo.png');

  const [modalVisible, setModalVisible] = useState(false);

  //close itself
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{flexBasis: '33.3%'}}>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => setModalVisible(true)}>
        <Image source={logo} style={styles.iconImg} />
        <Text style={styles.buttonText1}>Activity</Text>
        <ImageBackground source={img} style={styles.backgroundImg} />
      </TouchableOpacity>
      <Text style={{textAlign: 'center'}}>{time}</Text>
      <Modal
        isVisible={modalVisible}
        animationIn="slideInUp"
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        style={{justifyContent: 'flex-end'}}>
        <Header title={'Activity:' + time} closeModal={closeModal} />
        <View style={styles.modalContainer}>
          <DataField fieldName="Activity Name" value={activityName} />
          <DataField fieldName="Record Date Time" value={date} />
          <DataField fieldName="Duration (mins)" value={activity.duration} />
          <DataField fieldName="Steps" value={activity.steps} />
          <DataField
            fieldName="Calories Burnt (kCal)"
            value={activity.calories}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ActivityBlock;

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
    left: '18%',
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
