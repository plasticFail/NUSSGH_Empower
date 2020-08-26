import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
//third party libaray
import Modal from 'react-native-modal';

const DeleteConfirmation = (props) => {
  const {visible, closeModal} = props;
  return (
    <Modal isVisible={visible}>
      <View>
        <Text>hi</Text>
      </View>
    </Modal>
  );
};

export default DeleteConfirmation;
