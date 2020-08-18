import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
//component
import Result from './result';

const Summary = (props) => {
  const {
    date,
    bgPass,
    avgBg,
    weightPass,
    bgLogs,
    foodLogs,
    medLogs,
    activityLogs,
    weightLogs,
  } = props;
  console.log('In Summary Component: ');

  return (
    <>
      <View style={[styles.container, styles.shadow]}>
        {renderBloodGlucoseResult(bgPass, bgLogs, avgBg)}
        {renderActivityResult(activityLogs)}
        {renderWeightResult(weightPass, weightLogs)}
      </View>
    </>
  );
};

function renderWeightResult(weightPass, weightLogs) {
  if (weightLogs.length === 0) {
    return <Result success={false} message={'Missing weight log.'} />;
  } else {
    return <Result success={true} message={'Weight log completed.'} />;
  }
}

function renderActivityResult(activityLogs) {
  if (activityLogs.length === 0) {
    return <Result success={false} message={'Missing activity log.'} />;
  } else {
    return <Result success={true} message={'Activity log completed.'} />;
  }
}

//take in the duration, check
function renderBloodGlucoseResult(bgPass, bgLogs, avgBg) {
  if (bgLogs.length === 0) {
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
});
