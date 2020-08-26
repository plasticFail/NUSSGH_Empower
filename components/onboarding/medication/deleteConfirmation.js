import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

//calling removeMethod from askAdd.js
const DeleteConfirmation = (props) => {
  const {medication, removeMethod} = props;
  return (
    <>
      <Text style={styles.header}>Remove This Medication</Text>
      <Text style={styles.details}>{medication.drugName}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeMethod()}>
        <Text style={styles.deleteButtonText}>Remove for this Date</Text>
      </TouchableOpacity>
      <Text style={styles.deleteAllText}>Remove from All</Text>
    </>
  );
};

export default DeleteConfirmation;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: '700',
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
