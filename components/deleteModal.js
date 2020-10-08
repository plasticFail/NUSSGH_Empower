import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
//third party lib
import Modal from 'react-native-modal';
import globalStyles from '../styles/globalStyles';

const DeleteModal = (props) => {
  const {visible, item} = props;
  const {close, confirmMethod} = props;

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => close()}
      onBackButtonPress={() => close()}>
      <View style={styles.deleteContainer}>
        <Text
          style={[
            globalStyles.deleteDetails,
            {fontFamily: 'SFProDisplay-Bold', fontSize: 18},
          ]}>
          Are you sure you want to delete
        </Text>
        <Text style={globalStyles.deleteDetails}>{item}</Text>
        <TouchableOpacity
          style={globalStyles.deleteButton}
          onPress={() => confirmMethod()}>
          <Text style={globalStyles.deleteButtonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => close()}>
          <Text style={globalStyles.subOptionText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
export default DeleteModal;

const styles = StyleSheet.create({
  deleteContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
  },
});
