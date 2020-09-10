import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
//component
import LeftArrowBtn from '../../logs/leftArrowBtn';
//third party library
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
//styles
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import diaryStyles from '../../../styles/diaryStyles';
import TimeSection from '../timeSection';
import {morningObj} from '../../../commonFunctions/common';
import ProgressBar from '../../progressbar';
import ProgressContent from './progressContent';

const images = {
  run: require('../../../resources/images/activity/type_RUN.png'),
  walk: require('../../../resources/images/activity/type_WALK.png'),
  outdoor_bike: require('../../../resources/images/activity/type_OUTDOORBIKE.png'),
  elliptical: require('../../../resources/images/activity/type_ELLIPTICAL.png'),
  sports: require('../../../resources/images/activity/type_AEROBICWORKOUT.png'),
  caloriesBurnt: require('../../../resources/images/activity/calories.png'),
  distance: require('../../../resources/images/activity/distance.png'),
  heart_rate: require('../../../resources/images/activity/heart_rate.png'),
  steps_taken: require('../../../resources/images/activity/steps_taken.png'),
};

const maxCalBurnt = 500;
const maxSteps = 2000;
const steps_taken = 'Steps Taken';
const exercise = 'Exercise';

const ActivityBlock = (props) => {
  const {visible, pass, summary, miss, day} = props;
  const {closeModal} = props;
  const distance = summary.distance + ' KM';

  return (
    <Modal
      isVisible={visible}
      coverScreen={true}
      backdropOpacity={1}
      onBackButtonPress={() => closeModal()}
      backdropColor={Colors.backgroundColor}
      style={{margin: 0}}>
      <ScrollView style={{flex: 1}}>
        <LeftArrowBtn close={closeModal} />
        <Text style={globalStyles.pageHeader}>Activity</Text>
        <Text style={globalStyles.pageDetails}>{day}</Text>
        <View
          style={{flexDirection: 'row', marginTop: '3%', marginBottom: '2%'}}>
          {miss ? (
            <Text style={globalStyles.pageDetails}>Missed</Text>
          ) : pass ? (
            <>
              <Text style={globalStyles.pageDetails}>
                {summary.duration} Mins Active
              </Text>
              <Ionicon
                name="checkmark"
                style={diaryStyles.passIcon}
                size={25}
              />
            </>
          ) : (
            <>
              <Text style={globalStyles.pageDetails}>
                {summary.duration} Mins Active
              </Text>
              <Ionicon
                name="alert-circle-outline"
                style={diaryStyles.failIcon}
                size={25}
              />
            </>
          )}
        </View>
        {renderProgress(summary)}
        <Text style={styles.header}>Summary</Text>
        <View style={styles.border} />
        {renderSummaryContent(images.distance, distance, 'Distance')}
      </ScrollView>
    </Modal>
  );
};

function renderSummaryContent(icon, content, detail) {
  return (
    <>
      <View style={{margin: '3%', flexDirection: 'row'}}>
        <Image source={icon} style={styles.iconImg2} />
        <View>
          <Text style={styles.content}>{content}</Text>
          <Text style={styles.contentDetail}>{detail}</Text>
        </View>
      </View>
      <View style={styles.detailBorder} />
    </>
  );
}

function renderProgress(summary) {
  return (
    <View
      style={{
        marginStart: '5%',
        flexDirection: 'row',
        alignItems: 'space-around',
      }}>
      <ProgressContent
        header={'Steps'}
        value={summary.steps}
        target={maxSteps}
      />
      <ProgressContent
        header={'Cal Burnt'}
        value={summary.calories}
        target={maxCalBurnt}
      />
    </View>
  );
}

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
  header: {
    fontFamily: 'SFProDisplay-Bold',
    color: Colors.lastLogValueColor,
    fontSize: 20,
    marginTop: '7%',
    marginStart: '5%',
  },
  content: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 18,
    marginTop: '7%',
    marginStart: '5%',
  },
  contentDetail: {
    fontFamily: 'SFProDisplay-Bold',
    color: Colors.lastLogValueColor,
    fontSize: 17,
    marginTop: '7%',
    marginStart: '5%',
  },
  border: {
    borderWidth: 0.4,
    borderColor: Colors.lastLogValueColor,
    margin: '3%',
  },
  detailBorder: {
    borderWidth: 0.2,
    borderColor: Colors.lastLogValueColor,
    margin: '3%',
  },
  iconImg2: {
    height: 50,
    width: 50,
  },
  iconImg: {
    position: 'absolute',
    top: '40%',
    left: '20%',
    width: 30,
    height: 30,
    resizeMode: 'contain', //resize image so dont cut off
  },
});
