import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
//third party library
import Ionicon from 'react-native-vector-icons/Ionicons';
import logStyles from '../../../styles/logStyles';
import {Colors} from '../../../styles/colors';

Ionicon.loadFont();

//clean the medicine item passed back*
//for search result when creating med log
const SearchResult2 = (props) => {
  const {medicationList} = props;
  const {setSelectedMedicine, closeModal} = props;

  const handleSelect = (item) => {
    let medicineObj = {
      drugName: item.medication,
      dosage: item.dosage,
      recordDate: '',
      unit: item.dosage_unit,
    };
    setSelectedMedicine(medicineObj);
    closeModal();
  };

  return (
    <>
      <Text style={styles.medicineHeader}>Medication for Today</Text>
      <FlatList
        data={medicationList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.resultContainer}
            key={index}
            onPress={() => handleSelect(item)}>
            <Text style={styles.medicineName}>{item.medication}</Text>
            <Ionicon name="chevron-forward" size={20} color="#aad326" />
          </TouchableOpacity>
        )}
      />
    </>
  );
};

export default SearchResult2;

const styles = StyleSheet.create({
  resultContainer: {
    borderBottomWidth: 0.2,
    borderColor: 'black',
    padding: '3%',
    flexDirection: 'row',
  },
  medicineName: {
    fontSize: 20,
    flex: 1,
  },
  medicineHeader: {
    fontSize: 18,
    marginStart: '2%',
    fontFamily: 'SFProDisplay-Bold',
    color: Colors.logFieldColor,
    marginTop: '3%',
    marginBottom: '2%',
  },
});
