import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
//third party
import Modal from 'react-native-modal';
//component
import DeleteBin from '../deleteBin';
import diaryStyles from '../../styles/diaryStyles';
import DeleteConfirmation from './deleteConfirmation';
import {adjustSize} from '../../commonFunctions/autoResizeFuncs';

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
            deleteMethod={() => {
              deleteMethod(medication);
              setShowConfirm(false);
            }}
            closeModal={() => setShowConfirm(false)}
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
    borderRadius: adjustSize(20),
  },
});
