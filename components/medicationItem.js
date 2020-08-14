import React, {useState} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

const MedicationItem = (props) => {
  const {removable} = props.removable === undefined ? false : props.removable; //for future use
  const {medication} = props;

  if (medication != undefined) {
    return (
      <View style={[styles.container, styles.shadow]}>
        <Image
          source={{uri: medication.image_url}}
          style={styles.medicineImg}
        />
        <Text style={styles.medicationName}>{medication.drugName}</Text>
        <Text>
          Dosage:{' '}
          <Text style={styles.dosage}>{medication.dosage} Unit (s)</Text>
        </Text>
      </View>
    );
  } else {
    return <View></View>;
  }
};

export default MedicationItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    width: '40%',
    alignItems: 'center',
    padding: '2%',
    marginEnd: '5%',
  },
  medicineImg: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderWidth: 2,
    borderColor: '#aad326',
    alignSelf: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  medicationName: {
    margin: '2%',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
  dosage: {
    color: '#d22b55',
  },
});
