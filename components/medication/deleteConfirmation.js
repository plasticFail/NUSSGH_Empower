import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

import globalStyles from '../../styles/globalStyles';
import {adjustSize} from '../../commonFunctions/autoResizeFuncs';

//calling removeObj from askAdd.js
const DeleteConfirmation = (props) => {
  const {medication} = props;
  const {closeModal, deleteMethod} = props;

  return (
    <>
      <Text style={styles.header}>Remove This Medication</Text>
      <Text style={globalStyles.deleteDetails}>{medication.medication}</Text>
      <TouchableOpacity
        style={globalStyles.deleteButton}
        onPress={() => {
          deleteMethod();
        }}>
        <Text style={globalStyles.deleteButtonText}>Remove</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => closeModal()}>
        <Text style={globalStyles.subOptionText}>Cancel</Text>
      </TouchableOpacity>
    </>
  );
};

export default DeleteConfirmation;

const styles = StyleSheet.create({
  header: {
    fontSize: adjustSize(20),
    fontFamily: 'SFProDisplay-Bold',
    marginTop: '4%',
    marginStart: '4%',
  },
});
