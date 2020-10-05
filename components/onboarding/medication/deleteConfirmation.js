import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
//function
import {useNavigation} from '@react-navigation/native';
import {
  removeMedAllFromExisting,
  removeMed4DateFromExisting,
} from '../../../commonFunctions/medicationFunction';
import LoadingModal from '../../loadingModal';
import globalStyles from '../../../styles/globalStyles';

//calling removeObj from askAdd.js
const DeleteConfirmation = (props) => {
  const {medication, date, parent} = props;
  const {closeSelf, closeParent} = props;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleRemoveDate = async () => {
    if (parent === 'fromExistingPlan') {
      console.log(
        'From: viewMed4Day: removing med from this date in existing plan',
      );
      setLoading(true);
      removeMed4DateFromExisting(date.dateString, medication).then(
        (response) => {
          if (response) {
            setLoading(false);
            closeSelf();
            closeParent();
            navigation.navigate('Medication', {});
          }
        },
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

  const handleRemoveFromAll = async () => {
    if (parent === 'fromExistingPlan') {
      console.log(
        'From: viewMed4Day: removing med from all dates in existing plan',
      );
      setLoading(true);
      removeMedAllFromExisting(medication).then((response) => {
        if (response) {
          setLoading(false);
          closeSelf();
          closeParent();
          navigation.navigate('Medication', {});
        }
      });
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
      <Text style={globalStyles.deleteDetails}>{medication.medication}</Text>
      <TouchableOpacity
        style={globalStyles.deleteButton}
        onPress={handleRemoveDate}>
        <Text style={globalStyles.deleteButtonText}>Remove for this Date</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRemoveFromAll}>
        <Text style={globalStyles.subOptionText}>Remove from All</Text>
      </TouchableOpacity>
      <LoadingModal
        visible={loading}
        message={'Updating your medication plan'}
      />
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
});
