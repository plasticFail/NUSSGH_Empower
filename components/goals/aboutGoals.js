import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
//third party lib
import Modal from 'react-native-modal';
import globalStyles from '../../styles/globalStyles';

const AboutGoals = (props) => {
  const {visible, closeModal} = props;

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => closeModal()}
      onBackButtonPress={() => closeModal()}>
      <View style={styles.container}>
        <Text style={styles.text}>About Goal Setting</Text>
        <Text style={styles.textDetail}>
          Create and make edits to your goals every monday!
        </Text>
        <TouchableOpacity
          onPress={() => closeModal()}
          style={[globalStyles.nextButtonStyle, {marginBottom: '2%'}]}>
          <Text style={globalStyles.actionButtonText}>Got It</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AboutGoals;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 9.5,
    alignSelf: 'center',
    padding: '3%',
  },
  text: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
  textDetail: {
    marginTop: '2%',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 18,
    textAlign: 'center',
  },
});
