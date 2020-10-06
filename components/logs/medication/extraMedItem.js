import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
//component
import DeleteBin from '../../deleteBin';
//styles
import globalStyles from '../../../styles/globalStyles';

//for the extra medication addded to log (not in med plan)
function ExtraMedItem({medication, handleDelete}) {
  return (
    <View style={globalStyles.medContainer}>
      <View style={{flex: 1}}>
        <Text style={globalStyles.pageSubDetails}>{medication.drugName}</Text>
        <Text style={[globalStyles.pageSubDetails, {color: '#8a8a8e'}]}>
          {medication.dosage} Unit(s)
        </Text>
      </View>
      <DeleteBin
        style={styles.deleteMedication}
        method={() => handleDelete(medication)}
      />
    </View>
  );
}
export default ExtraMedItem;

const styles = StyleSheet.create({
  deleteMedication: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    margin: '1%',
  },
});
