import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const DeleteConfirmation = (props) => {
  const {medication} = props;
  return (
    <>
      <Text style={styles.header}>Remove This Medication</Text>
      <Text style={styles.details}>{medication.drugName}</Text>
      <TouchableOpacity style={styles.deleteButton}>
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
    backgroundColor: '#ff4f64',
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
    fontWeight: '700',
    color: 'white',
  },
  deleteAllText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ff4f64',
    marginBottom: '3%',
  },
});
