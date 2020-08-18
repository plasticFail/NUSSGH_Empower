import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Summary from '../../../components/diary/summary';

//see if class or functional component
const DiaryDetail = (props) => {
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
  } = props.route.params;
  return (
    <View style={styles.screen}>
      <Text style={styles.summaryText}>Summary: </Text>
      <View style={{padding: '2%'}}>
        <Summary
          date={date}
          bgPass={bgPass}
          avgBg={avgBg}
          weightPass={weightPass}
          bgLogs={bgLogs}
          foodLogs={foodLogs}
          medLogs={medLogs}
          activityLogs={activityLogs}
          weightLogs={weightLogs}
        />
      </View>
    </View>
  );
};

export default DiaryDetail;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    width: '100%',
  },
  summaryText: {
    fontSize: 20,
    margin: '2%',
    color: '#47685A',
    fontWeight: '700',
  },
});
