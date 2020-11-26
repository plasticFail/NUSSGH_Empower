import React from 'react';
import {Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
//third party library
import Ionicon from 'react-native-vector-icons/Ionicons';
import CHEVRON_RIGHT from '../../resources/images/Patient-Icons/SVG/icon-grey-chevron-right.svg';
import {adjustSize} from '../../commonFunctions/autoResizeFuncs';

Ionicon.loadFont();

//clean the medicine item passed back*
const SearchResult = (props) => {
  const {medicationList} = props;
  const {setSelectedMedicine, closeModal} = props;

  const handleSelect = (item) => {
    let units =
      String(item.unit).substr(0, 1).toUpperCase() +
      String(item.unit).substr(1, item.unit.length);
    let medicineObj = {
      medication: item.drug_name,
      dosage: 0,
      dosage_unit: units,
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
            <CHEVRON_RIGHT height={adjustSize(20)} width={adjustSize(20)} marginStart={'2%'} />
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
    fontSize: adjustSize(18),
    flex: 1,
  },
});
