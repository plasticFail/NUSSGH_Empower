import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';

import {getMedication4Day} from '../../../netcalls/requestsLog';

import moment from 'moment';
import Med4Day from './med4Day';

const ScheduledMedicationList = (props) => {
  let today = moment(new Date()).format('YYYY-MM-DD');
  const [medList4Day, setMedList4Day] = useState([]);
  const {addMed, deleteMed} = props;

  useEffect(() => {
    getMedication4Day(today).then((data) => setMedList4Day(data[today]));
  }, []);

  return (
    <>
      {medList4Day.map((item, index) => (
        <Med4Day medication={item} key={index} addMed={addMed} />
      ))}
    </>
  );
};

export default ScheduledMedicationList;
