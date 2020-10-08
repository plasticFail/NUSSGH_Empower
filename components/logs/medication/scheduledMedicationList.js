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
    let todayValue = moment(new Date()).day();
    let arr = [];
    getMedication4Day(today).then((data) => {
      for (var x of data[today]) {
        for (y of x.days) {
          if (y === todayValue) {
            arr.push(x);
          }
        }
      }
      setMedList4Day(arr);
    });
    //filter out medications for date.
  }, []);

  return (
    <>
      {medList4Day.map((item, index) => (
        <Med4Day
          medication={item}
          key={index}
          addMed={addMed}
          deleteMed={deleteMed}
        />
      ))}
    </>
  );
};

export default ScheduledMedicationList;
