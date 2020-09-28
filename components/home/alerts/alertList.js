import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Modal from 'react-native-modal';
import {Colors} from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';
import LeftArrowBtn from '../logs/leftArrowBtn';
import InProgress from '../inProgress';

const AlertList = (props) => {
  const {visible} = props;
  const {closeModal} = props;
  return (
    <Modal
      isVisible={visible}
      coverScreen={true}
      backdropOpacity={1}
      onBackButtonPress={() => closeModal()}
      backdropColor={Colors.backgroundColor}
      style={{margin: 0}}>
      <View
        style={{
          backgroundColor: Colors.backgroundColor,
          borderRadius: 20,
          flex: 1,
        }}>
        <View style={globalStyles.menuBarContainer}>
          <LeftArrowBtn close={closeModal} />
        </View>
        <Text style={globalStyles.pageHeader}>Notifications</Text>
        <InProgress />
      </View>
    </Modal>
  );
};

export default AlertList;
