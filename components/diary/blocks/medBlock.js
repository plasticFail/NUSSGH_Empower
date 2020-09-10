import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
//third party library
import Modal from 'react-native-modal';
//component
import LeftArrowBtn from '../../logs/leftArrowBtn';
//style
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
//function
import {getMissedArr} from '../../../commonFunctions/diaryFunctions';
import MissedContent from './missedContent';
import {med_key} from '../../../commonFunctions/logFunctions';

const MedBlock = (props) => {
  const {
    visible,
    morningMedLogs,
    afternoonMedLogs,
    eveningMedLogs,
    nightMedLogs,
    pass,
    miss,
    day,
  } = props;
  const {closeModal} = props;
  const [missedArr, setMissedArr] = useState([]);

  const editLog = (item) => {
    console.log('selecting item to edit');
    setSelectedLog(item);
  };

  useEffect(() => {
    setMissedArr(
      getMissedArr(morningMedLogs, afternoonMedLogs, eveningMedLogs),
    );
  }, []);

  return (
    <Modal
      isVisible={visible}
      coverScreen={true}
      backdropOpacity={1}
      onBackButtonPress={() => closeModal()}
      backdropColor={Colors.backgroundColor}
      style={{margin: 0}}>
      <ScrollView style={{flex: 1}}>
        <LeftArrowBtn close={closeModal} />
        <Text style={globalStyles.pageHeader}>Medication</Text>
        <Text style={globalStyles.pageDetails}>{day}</Text>
        <MissedContent arr={missedArr} type={med_key} />
      </ScrollView>
    </Modal>
  );
};

export default MedBlock;

const styles = StyleSheet.create({});
