import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';

import {getMedication4Day} from '../../../netcalls/requestsLog';

import moment from 'moment';

const ScheduledMedicationList = (props) => {
  let today = moment(new Date()).format('YYYY-MM-DD');
  const [medList4Day, setMedList4Day] = useState([]);

  useEffect(() => {
    getMedication4Day(today).then((data) => console.log(data));
  }, []);

  return <View></View>;
};

export default ScheduledMedicationList;
