import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';

const ActivitySummary = (props) => {
  const {activitySummary} = props;
  return (
    <View style={[styles.container, styles.shadow]}>
      <Text style={styles.text}>
        Total Calories Burnt:{' '}
        <Text style={styles.data}>{activitySummary.calories} kCal</Text>
      </Text>
      <Text style={styles.text}>
        Total Distance:{' '}
        <Text style={styles.data}>{activitySummary.distance} km</Text>
      </Text>
      <Text style={styles.text}>
        Total Duration:{' '}
        <Text style={styles.data}>{activitySummary.duration} mins</Text>
      </Text>
      <Text style={styles.text}>
        Total Steps: <Text style={styles.data}>{activitySummary.steps} </Text>
      </Text>
      <Text style={{textAlign: 'right', fontSize: 13, marginTop: '3%'}}>
        Updated at: {activitySummary.record_date}
      </Text>
    </View>
  );
};

export default ActivitySummary;

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
  data: {
    fontSize: 17,
    fontWeight: '700',
    color: '#d22b55',
  },
  text: {
    fontSize: 17,
    fontWeight: '400',
  },
});
