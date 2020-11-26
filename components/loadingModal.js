import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import {adjustSize} from '../commonFunctions/autoResizeFuncs';

const LoadingModal = (props) => {
  const {visible} = props;
  const {message} = props;

  return (
    <Modal isVisible={visible}>
      <View style={styles.loadingContainer}>
        <Text style={styles.text}>{message}</Text>
        <ActivityIndicator
          size="large"
          color="#B3D14C"
          style={{justifyContent: 'center', flex: 1}}
        />
      </View>
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: adjustSize(20),
    width: '100%',
    flexBasis: '24%',
  },
  text: {
    fontSize: adjustSize(18),
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: '10%',
  },
});
