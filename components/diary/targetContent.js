import React, {Component} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

const bg = 'Blood Glucose';
const weight = 'Weight';
const activity = 'Activity';

//takes in an object with bgPass, bgMiss, weightPass, weightMiss... and displays the content
const TargetContent = (props) => {
  const {type} = props;
  const {bgPass, weightPass, activityPass} = props;
  const {bgPassCount, weightPassCount, activityPassCount} = props;
  const {bgMiss, weightMiss, activityMiss} = props;
  const {bgFailCount, weightFailCount} = props;

  return (
    <>
      {renderItem(
        type,
        bgPass,
        bgPassCount,
        weightPass,
        weightPassCount,
        activityPass,
        activityPassCount,
        bgMiss,
        weightMiss,
        activityMiss,
        bgFailCount,
        weightFailCount,
      )}
    </>
  );
};
export default TargetContent;

function renderItem(
  type,
  bgPass,
  bgPassCount,
  weightPass,
  weightPassCount,
  activityPass,
  activityPassCount,
  bgMiss,
  weightMiss,
  activityMiss,
  bgFailCount,
  weightFailCount,
) {
  if (type === 'Within Target') {
    return (
      <View>
        {bgPass === true && renderCountLogo(bgPassCount, type, bg)}
        {weightPass === true && renderCountLogo(weightPassCount, type, weight)}
        {activityPass === true &&
          renderCountLogo(activityPassCount, type, activity)}
      </View>
    );
  }
  if (type === 'Missed') {
    if (!bgMiss && !activityMiss && !weightMiss) {
      return (
        <View>
          <Text style={styles.empty}>-</Text>
        </View>
      );
    } else {
      return (
        <View>
          {bgMiss === true && renderCountLogo(0, type, bg)}
          {weightMiss === true && renderCountLogo(0, type, weight)}
          {activityMiss === true && renderCountLogo(0, type, activity)}
        </View>
      );
    }
  }

  if (type === 'Improve') {
    return (
      <View>
        {bgFailCount != 0 && renderCountLogo(bgFailCount, type, bg)}
        {weightFailCount != 0 && renderCountLogo(weightFailCount, type, weight)}
      </View>
    );
  }
}

function renderCountLogo(count, targetType, logType) {
  let image = setImage(logType);
  if (targetType === 'Within Target') {
    return (
      <View style={styles.targetContainer}>
        <Text style={styles.countTextWithinTarget}>x {count}</Text>
        <Image source={image} style={styles.iconImg} />
      </View>
    );
  }
  if (targetType === 'Missed') {
    return (
      <View style={styles.targetContainer}>
        <Text style={styles.countTextMissed}>x {count}</Text>
        <Image source={image} style={styles.iconImg} />
      </View>
    );
  }
  if (targetType === 'Improve') {
    return (
      <View style={styles.targetContainer}>
        <Text style={styles.countTextImprove}>x {count}</Text>
        <Image source={image} style={styles.iconImg} />
      </View>
    );
  }
}

function setImage(logType) {
  if (logType === 'Blood Glucose') {
    return require('../../resources/images/bloodglucose_logo.png');
  }
  if (logType === 'Weight') {
    return require('../../resources/images/weight_logo.png');
  }
  if (logType === 'Activity') {
    return require('../../resources/images/activity_logo.png');
  }
}

const styles = StyleSheet.create({
  targetContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '2%',
  },
  iconImg: {
    width: 25,
    height: 25,
    resizeMode: 'contain', //resize image so dont cut off
    padding: '2%',
  },
  countTextWithinTarget: {
    fontSize: 18,
    marginEnd: '5%',
    color: '#7d9a22',
    fontWeight: '600',
  },
  countTextMissed: {
    fontSize: 18,
    marginEnd: '5%',
    color: 'black',
    fontWeight: '600',
  },
  countTextImprove: {
    fontSize: 18,
    marginEnd: '5%',
    color: 'red',
    fontWeight: '600',
  },
  empty: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
});
