import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
//third party library
import Ionicon from 'react-native-vector-icons/Ionicons';
import Moment from 'moment';

import CHEVRON_RIGHT from '../../resources/images/Patient-Icons/SVG/icon-grey-chevron-right.svg';

Ionicon.loadFont();

//clean the medicine item passed back*
const SearchResult = (props) => {
  const {medicationList} = props;
  const {setSelectedMedicine, closeModal} = props;

  const handleSelect = (item) => {
    let medicineObj = {
      medication: item.drug_name,
      dosage: 0,
      dosage_unit: 'unit',
      per_day: 0,
    };
    setSelectedMedicine(medicineObj);
    closeModal();
  };

  return (
    <>
      <FlatList
        data={medicationList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.resultContainer}
            key={index}
            onPress={() => handleSelect(item)}>
            <Text style={styles.medicineName}>{item.drug_name}</Text>
            <CHEVRON_RIGHT height={20} width={20} marginStart={'2%'} />
          </TouchableOpacity>
        )}
      />
    </>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  resultContainer: {
    borderBottomWidth: 1,
    borderColor: '#e2e8ee',
    padding: '3%',
    flexDirection: 'row',
  },
  medicineName: {
    fontSize: 18,
    flex: 1,
  },
});
