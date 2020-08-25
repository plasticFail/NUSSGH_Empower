import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

const ScheduledMedicationModal = (props) => {
  const {isVisible, closeModal} = props;
  const {medicationList} = props;
  console.log(medicationList);

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}>
      <View>
        <Text>hi</Text>
      </View>
    </Modal>
  );
};

export default ScheduledMedicationModal;
