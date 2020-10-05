import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
//third party
import Modal from 'react-native-modal';
//component
import DeleteBin from '../deleteBin';
import diaryStyles from '../../styles/diaryStyles';
import DeleteConfirmation from './deleteConfirmation';

const MedicationDeleteBin = (props) => {
  const {medication, deleteMethod} = props;
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <DeleteBin
        style={diaryStyles.binIcon}
        method={() => setShowConfirm(true)}
      />
      <Modal
        isVisible={showConfirm}
        onBackdropPress={() => setShowConfirm(false)}
        onBackButtonPress={() => setShowConfirm(false)}>
        <View style={styles.deleteContainer}>
          <DeleteConfirmation
            medication={medication}
            deleteMethod={() => deleteMethod(medication)}
          />
        </View>
      </Modal>
    </>
  );
};

export default MedicationDeleteBin;

const styles = StyleSheet.create({
  deleteContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
  },
});
