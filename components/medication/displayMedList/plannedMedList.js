import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
//component
import MedicationPlanItem from './medicationPlanItem';
//third party
import AntDesign from 'react-native-vector-icons/AntDesign';

const PlannedMedList = (props) => {
  const {medList} = props;
  const {openAddModal, editMed} = props;
  return (
    <>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {medList.map((item, index) => (
          <MedicationPlanItem
            item={item}
            editItem={() => editMed(item)}
            key={index}
          />
        ))}
        <TouchableOpacity
          onPress={() => openAddModal()}
          style={styles.addButtonWText}>
          <AntDesign name="pluscircleo" color={'#aad326'} size={25} />
          <Text style={styles.addButtonText}>Add Medication</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default PlannedMedList;

const styles = StyleSheet.create({
  addButton: {
    alignSelf: 'center',
    marginTop: '15%',
  },
  addButtonText: {
    marginStart: '3%',
    color: '#aad326',
    fontSize: 20,
  },
  addButtonWText: {
    flexDirection: 'row',
    marginTop: '3%',
    marginStart: '5%',
  },
});
