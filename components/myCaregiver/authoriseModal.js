import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
//third party lib
import Modal from 'react-native-modal';
import LeftArrowBtn from '../logs/leftArrowBtn';
import {Colors} from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';

const AuthoriseModal = (props) => {
  const {visible} = props;
  const {closeModal} = props;
  return (
    <Modal
      isVisible={visible}
      coverScreen={true}
      backdropOpacity={1}
      onBackButtonPress={() => closeModal()}
      style={{margin: 0}}
      backdropColor={Colors.backgroundColor}>
      <View style={globalStyles.pageContainer}>
        <View style={globalStyles.menuBarContainer}>
          <LeftArrowBtn close={() => closeModal()} />
        </View>
        <Text style={globalStyles.pageHeader}>Add Caregiver</Text>
      </View>
    </Modal>
  );
};

export default AuthoriseModal;
