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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
//components
import Header from './header';
//function
import {getTime} from '../../../commonFunctions/diaryFunctions';

const images = {
  run: require('../../../resources/images/activity/type_RUN.png'),
  walk: require('../../../resources/images/activity/type_WALK.png'),
  outdoor_bike: require('../../../resources/images/activity/type_OUTDOORBIKE.png'),
  elliptical: require('../../../resources/images/activity/type_ELLIPTICAL.png'),
  sports: require('../../../resources/images/activity/type_AEROBICWORKOUT.png'),
  caloriesBurnt: require('../../../resources/images/activity/calories.png'),
  distance: require('../../../resources/images/activity/distance.png'),
  steps_taken: require('../../../resources/images/activity/steps_taken.png'),
};

Icon.loadFont();
AntDesign.loadFont();

const ActivityBlock = (props) => {
  const {activity} = props;
  //format date
  let dateString = String(activity.record_date);
  let time = getTime(dateString);

  const img = require('../../../resources/images/activity.jpg');
  const [modalVisible, setModalVisible] = useState(false);
  const [activityName, setActivityName] = useState('');

  useEffect(() => {
    setActivityName(String(activity.name).toUpperCase().replace(/\s/g, ''));
  }, []);

  //close itself
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{flexBasis: '33.3%'}}>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => setModalVisible(true)}>
        {renderIcon(activityName, false)}
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
          <View style={{flexDirection: 'row', paddingTop: '3%'}}>
            {renderIcon(activityName, true)}
            <Text style={styles.details}>
              {String(activity.name).charAt(0).toUpperCase() +
                String(activity.name).slice(1)}
            </Text>
            <View style={{flexDirection: 'row', flex: 3}}>
              <Image
                source={images.caloriesBurnt}
                style={{marginStart: '10%'}}
              />
              <Text style={styles.details}>
                {activity.calories} calories burnt
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image source={images.steps_taken} />
            <Text style={styles.details}>{activity.steps}</Text>
            <View style={{flexDirection: 'row', flex: 2}}>
              <AntDesign name="clockcircle" color="#3ec1c1" size={40} />
              <Text style={styles.details}>{activity.duration} mins</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

function renderIcon(activityName, bool) {
  if (bool === true) {
    return (
      <View style={{marginBottom: '20%'}}>
        {activityName === 'RUN' ? (
          <Image source={images.run} style={styles.iconImg2} />
        ) : activityName === 'WALK' ? (
          <Image source={images.walk} style={styles.iconImg2} />
        ) : activityName === 'OUTDOORBIKE' ? (
          <Image source={images.outdoor_bike} style={styles.iconImg2} />
        ) : activityName === 'ELLIPTICAL' ? (
          <Image source={images.elliptical} style={styles.iconImg2} />
        ) : activityName === 'SPORTS' ? (
          <Image source={images.sports} style={styles.iconImg2} />
        ) : (
          <Icon name="swim" style={styles.iconImg2} size={60} color="#3ec1c1" />
        )}
      </View>
    );
  } else {
    return (
      <>
        {activityName === 'RUN' ? (
          <Image source={images.run} style={styles.iconImg} />
        ) : activityName === 'WALK' ? (
          <Image source={images.walk} style={styles.iconImg} />
        ) : activityName === 'OUTDOORBIKE' ? (
          <Image source={images.outdoor_bike} style={styles.iconImg} />
        ) : activityName === 'ELLIPTICAL' ? (
          <Image source={images.elliptical} style={styles.iconImg} />
        ) : activityName === 'SPORTS' ? (
          <Image source={images.sports} style={styles.iconImg} />
        ) : (
          <Icon name="swim" style={styles.iconImg} size={33} color="#3ec1c1" />
        )}
      </>
    );
  }
}

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
  iconImg2: {
    height: 50,
    width: 50,
  },
  backgroundImg: {
    width: '100%',
    height: 120,
    opacity: 0.2,
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
    width: '100%',
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
  details: {flex: 1, margin: '3%', fontSize: 20},
});

//comment
