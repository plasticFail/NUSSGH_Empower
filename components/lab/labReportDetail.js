import React, {useState, useRef} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
//third party lib
import Modal from 'react-native-modal';
//styles
import {Colors} from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';
//component
import LeftArrowBtn from '../logs/leftArrowBtn';
import Collapsible from './collapsible';
//third part lib
import moment from 'moment';
import {getDateObj} from '../../commonFunctions/diaryFunctions';

const LabReportDetail = (props) => {
  const {visible, date, diabeticArr, lipidArr, cardiacArr} = props;
  const {close} = props;

  console.log(diabeticArr);

  return (
    <Modal
      isVisible={visible}
      coverScreen={true}
      backdropOpacity={1}
      onBackButtonPress={() => closeModal()}
      backdropColor={Colors.backgroundColor}
      style={{margin: 0}}
      onBackdropPress={() => close()}
      onBackButtonPress={() => close()}>
      <View style={globalStyles.pageContainer}>
        <View style={globalStyles.menuBarContainer}>
          <LeftArrowBtn close={() => close()} />
        </View>
        <Text style={globalStyles.pageHeader}>
          {moment(getDateObj(date)).format('DD MMM YYYY')}
        </Text>
        <Text style={globalStyles.pageDetails}>Medical Report</Text>
        <Collapsible title="Diabetic Profile" detailArr={diabeticArr} />
        <Collapsible title="Lipid Profile" detailArr={lipidArr} />
      </View>
    </Modal>
  );
};
export default LabReportDetail;
