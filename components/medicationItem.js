import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
//third party lib
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import logStyles from '../styles/logStyles';

function MedicationItem({medication, handleDelete}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        paddingBottom: '2%',
      }}>
      <View style={[logStyles.componentMargin, {flex: 4}]}>
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
        <FontAwesome name="trash-o" size={40} color="#ff0844" />
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
    alignSelf: 'flex-end',
    justifyContent: 'center',
    margin: '1%',
  },
});
