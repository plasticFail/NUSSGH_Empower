import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
//function
import {useNavigation} from '@react-navigation/native';

//calling removeObj from askAdd.js
const DeleteConfirmation = (props) => {
  const {medication, date, parent} = props;
  const {closeSelf, closeParent} = props;
  const navigation = useNavigation();

  const handleRemoveDate = () => {
    if (parent === 'fromExistingPlan') {
      console.log(
        'From: viewMed4Day: removing med from this date in existing plan',
      );
    } else {
      closeSelf();
      closeParent();
      navigation.navigate('MedicationPlan', {
        dateString: date.dateString,
        type: 'justThis',
        medication: medication,
        list: {},
        parent: 'deleteConfirmation',
      });
    }
  };

  const handleRemoveFromAll = () => {
    if (parent === 'fromExistingPlan') {
      console.log(
        'From: viewMed4Day: removing med from all dates in existing plan',
      );
    } else {
      closeSelf();
      closeParent();
      navigation.navigate('MedicationPlan', {
        type: 'forAll',
        medication: medication,
        parent: 'deleteConfirmation',
      });
    }
  };

  return (
    <>
      <Text style={styles.header}>Remove This Medication</Text>
      <Text style={styles.details}>{medication.drugName}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={handleRemoveDate}>
        <Text style={styles.deleteButtonText}>Remove for this Date</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRemoveFromAll}>
        <Text style={styles.deleteAllText}>Remove from All</Text>
      </TouchableOpacity>
    </>
  );
};

export default DeleteConfirmation;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontFamily: 'SFProDisplay-Bold',
    marginTop: '4%',
    marginStart: '4%',
  },
  details: {
    fontSize: 16,
    margin: '4%',
  },
  deleteButton: {
    backgroundColor: '#ff0844',
    height: 45,
    width: '70%',
    alignSelf: 'center',
    borderRadius: 15,
    margin: '4%',
  },
  deleteButtonText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: '3%',
    fontWeight: '500',
    color: 'white',
  },
  deleteAllText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ff0844',
    marginBottom: '3%',
  },
});
