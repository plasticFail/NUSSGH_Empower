import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
//component
import Result from './result';

const Summary = (props) => {
  const {
    bgPass,
    bgMiss,
    avgBg,
    weightMiss,
    weightPassCount,
    weightFailCount,
    activityMiss,
    activityPassCount,
    activityFailCount,
  } = props;
  console.log('In Summary Component: ');
  console.log(activityFailCount);

  return (
    <>
      <View style={[styles.container, styles.shadow]}>
        {renderBloodGlucoseResult(bgPass, bgMiss, avgBg)}
        {renderActivityResult(
          activityPassCount,
          activityFailCount,
          activityMiss,
        )}
        {renderWeightResult(weightPassCount, weightFailCount, weightMiss)}
      </View>
    </>
  );
};

function getPercentage(passcount, failcount) {
  return Math.floor((passcount / (failcount + passcount)) * 100);
}

function renderWeightResult(weightPassCount, weightFailCount, weightMiss) {
  if (weightMiss) {
    return <Result success={false} message={'Missing weight log.'} />;
  } else {
    let percentage = getPercentage(weightPassCount, weightFailCount);
    return (
      <>
        <Result success={true} message={'Weight log completed.'} />
        <Text style={styles.percentStyle}>
          {percentage} % of your weight logs are above 40 kg and below 200 kg
        </Text>
      </>
    );
  }
}

function renderActivityResult(
  activityPassCount,
  activityFailCount,
  activityMiss,
) {
  if (activityMiss) {
    return <Result success={false} message={'Missing activity log.'} />;
  } else {
    let percentage = getPercentage(activityPassCount, activityFailCount);
    return (
      <>
        <Result success={true} message={'Activity log completed.'} />
        <Text style={styles.percentStyle}>
          {percentage} % of your activity logs have at least 6000 steps
        </Text>
      </>
    );
  }
}

//take in the duration, check
function renderBloodGlucoseResult(bgPass, bgMiss, avgBg) {
  if (bgMiss) {
    return <Result success={false} message={'Missing Blood Glucose Log'} />;
  } else if (bgPass == true) {
    return (
      <Result
        success={true}
        message={'Average blood sugar: ' + avgBg + ' mmol/L.'}
      />
    );
  } else {
    return (
      <Result
        success={false}
        message={'Average blood sugar: ' + avgBg + ' mmol/L.'}
      />
    );
  }
}

export default Summary;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    padding: '2%',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  percentStyle: {
    marginStart: ' 10%',
    fontSize: 13,
    color: 'green',
  },
});
