import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
//third party library
import Ionicon from 'react-native-vector-icons/Ionicons';
import Moment from 'moment';

Ionicon.loadFont();

//clean the medicine item passed back*
const SearchResult = (props) => {
  const {medicationList} = props;
  const {setSelectedMedicine, closeModal} = props;

  const handleSelect = (item) => {
    let medicineObj = {
      drugName: item.drug_name,
      imageUrl: item.image_url,
      dosage: 0,
      recordDate: Moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
      unit: 'unit',
      perDay: 0,
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
            <Ionicon name="chevron-forward" size={20} color="#aad326" />
          </TouchableOpacity>
        )}
      />
    </>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  resultContainer: {
    borderBottomWidth: 0.3,
    borderColor: 'black',
    padding: '3%',
    flexDirection: 'row',
  },
  medicineName: {
    fontSize: 20,
    flex: 1,
  },
});
