import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';

//function
import {getHour} from '../../commonFunctions/diaryFunctions';

const TimeSection = (props) => {
  const {data} = props;
  console.log('in time section');
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    //sort the array by ascending time.
    data[0].sort((a, b) => getHour(a.record_date) - getHour(b.record_date));
    console.log(data[0]);
  }, []);

  return (
    <View>
      <Text>hihi</Text>
    </View>
  );
};

export default TimeSection;
