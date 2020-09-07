import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
//third party lib
import Ionicon from 'react-native-vector-icons/Ionicons';

function MedicationItem({medication, handleDelete}) {
  return (
    <View style={{flexDirection: 'row', borderBottomWidth: 0.2}}>
      <View style={styles.medicationItem}>
        <Text style={styles.medicationName}>{medication.drugName}</Text>
        <Text style={styles.medicationDetail}>{medication.dosage} Unit(s)</Text>
        {medication.perDay != undefined ? (
          <Text style={styles.medicationDetail}>
            {medication.perDay} Times(s) Per Day
          </Text>
        ) : null}
      </View>
      <TouchableOpacity
        style={styles.deleteMedication}
        onPress={() => handleDelete(medication)}>
        <Ionicon name="ios-trash-bin" size={40} color="#ff0844" />
      </TouchableOpacity>
    </View>
  );
}
export default MedicationItem;

const styles = StyleSheet.create({
  medicationItem: {
    marginTop: '2%',
    marginStart: '4%',
    marginBottom: '4%',
    flex: 4,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: '700',
  },
  medicationDetail: {
    fontSize: 16,
    marginTop: '2%',
  },
  deleteMedication: {
    padding: '3%',
    flex: 1,
    justifyContent: 'center',
  },
});
