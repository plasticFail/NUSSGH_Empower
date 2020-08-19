import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
//component
import BgBlock from './blocks/bgBlock';
import ActivityBlock from './blocks/activityBlock';
import WeightBlock from './blocks/weightBlock';
//function
import {getHour, getTime} from '../../commonFunctions/diaryFunctions';

const TimeSection = (props) => {
  const {data} = props;
  console.log('in time section');
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    //sort the array by ascending time.
    data[0].sort((a, b) => getHour(a.record_date) - getHour(b.record_date));
  }, [data[0]]);

  const renderTimeSection = (data) => {
    if (data[0].length != 0) {
      let hour = getHour(data[0][0].record_date);
      if (hour > 0 && hour < 800) {
        return (
          <Text style={styles.timeText}>Early Morning (08:00 - 09:00)</Text>
        );
      } else if (hour >= 800 && hour < 1200) {
        return <Text style={styles.timeText}>Morning (08:00 - 12:00)</Text>;
      } else if (hour >= 1200 && hour < 1800) {
        return <Text style={styles.timeText}>Afternoon (12:00 - 18:00)</Text>;
      } else if (hour >= 1800 && hour < 2400) {
        return <Text style={styles.timeText}>Evening (18:00 - 24:00)</Text>;
      }
    }
  };

  return (
    <>
      <View>{renderTimeSection(data)}</View>
      <FlatList
        listKey={(item, index) => index.toString()}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          width: Dimensions.get('window').width - 20,
          paddingEnd: '2%',
        }}
        data={data[0]}
        numColumns={3}
        renderItem={({item}) => {
          let bg = Object.keys(item).includes('bg_reading');
          //include food, medication **
          let activity = Object.keys(item).includes('steps');
          let weight = Object.keys(item).includes('weight');
          if (bg) {
            return <BgBlock bloodGlucose={item} />;
          }
          if (activity) {
            return <ActivityBlock activity={item} />;
          }
          if (weight) {
            return <WeightBlock weight={item} />;
          }
        }}
      />
    </>
  );
};

export default TimeSection;

const styles = StyleSheet.create({
  timeText: {
    backgroundColor: '#f5f5f5',
    fontWeight: '700',
    margin: '2%',
    padding: '3%',
  },
});
