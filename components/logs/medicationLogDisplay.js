import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {getLastMedicationLog} from '../../storage/asyncStorageFunctions';

const MedicationLogDisplay = (props) => {
  const [medicationList, setMedicationList] = useState([]);
  const [date, setDate] = useState('');

  useEffect(() => {
    getLastMedicationLog().then((response) => {
      let data = JSON.parse(response);
      setDate(data.time);
      setMedicationList(data.value);
      console.log(data);
    });
  }, []);

  return (
    <FlatList
      data={medicationList}
      renderItem={({item}) => <Text>{item.drugName}</Text>}
    />
  );
};

export default MedicationLogDisplay;
