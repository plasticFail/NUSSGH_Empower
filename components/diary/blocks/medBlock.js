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
import Entypo from 'react-native-vector-icons/Entypo';
//component
import LeftArrowBtn from '../../logs/leftArrowBtn';
import MissedContent from './missedContent';
import TimeSection from '../timeSection';
import SelectMedicationModalContent from '../../logs/medication/selectMedicationModalContent';
//style
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import diaryStyles from '../../../styles/diaryStyles';
//function
import {
  getMissedArr,
  showEdit,
  getTime,
  getDateObj,
} from '../../../commonFunctions/diaryFunctions';
import {med_key} from '../../../commonFunctions/logFunctions';
import {
  morningObj,
  afternoonObj,
  eveningObj,
} from '../../../commonFunctions/common';
import EditMedicineBlock from './editMedicineBlock';

const MedBlock = (props) => {
  const {
    visible,
    morningMedLogs,
    afternoonMedLogs,
    eveningMedLogs,
    miss,
    day,
  } = props;
  const {closeModal} = props;
  const [selectedMed, setSelectedMed] = useState({});
  const [missedArr, setMissedArr] = useState([]);
  const [editModal, setEditModal] = useState(false);

  const editLog = (item) => {
    console.log('selecting medication item to edit');
    setSelectedMed(item);
    setEditModal(true);
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
      <LeftArrowBtn close={closeModal} />
      <Text style={globalStyles.pageHeader}>Medication</Text>
      <Text style={globalStyles.pageDetails}>{day}</Text>
      <MissedContent arr={missedArr} type={med_key} />
      <ScrollView style={{flex: 1}}>
        {/*Show time section and data for log*/}
        <TimeSection name={morningObj.name} />
        {renderMedLogs(morningMedLogs, editLog)}
        <TimeSection name={afternoonObj.name} />
        {renderMedLogs(afternoonMedLogs, editLog)}
        <TimeSection name={eveningObj.name} />
        {renderMedLogs(eveningMedLogs, editLog)}
      </ScrollView>
      {editModal ? (
        <EditMedicineBlock
          visible={editModal}
          closeModal={() => setEditModal(false)}
          medicineToEdit={selectedMed}
          initialDate={getDateObj(selectedMed.record_date)}
        />
      ) : null}
    </Modal>
  );
};

export default MedBlock;

function renderMedLogs(logs, editLog) {
  if (logs.length > 0) {
    return (
      <View style={{marginBottom: '3%'}}>
        <Text style={diaryStyles.recordedText}>Medication Recorded</Text>
        {logs.map((item, index) => (
          <View style={styles.logContent} key={index.toString()}>
            <Text style={diaryStyles.recordContent}>
              {getTime(item.record_date)}
            </Text>
            <View style={{width: '70%'}}>
              <Text style={diaryStyles.recordContent}>{item.medication}</Text>
              <Text style={diaryStyles.recordContent}>
                {item.dosage}{' '}
                {String(item.unit).substring(0, 1).toUpperCase() +
                  String(item.unit).substr(1, item.length)}{' '}
                (s)
              </Text>
            </View>
            {showEdit(item.record_date) ? (
              <>
                <View style={{flex: 1}} />
                <TouchableOpacity onPress={() => editLog(item)}>
                  <Entypo name="edit" style={diaryStyles.editIcon} size={20} />
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        ))}
      </View>
    );
  } else {
    return (
      <View style={styles.noRecordContainer}>
        <Text style={diaryStyles.noRecordText}>No Record Found </Text>
        <Text style={diaryStyles.recordContent}>-</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logContent: {
    flexDirection: 'row',
    marginTop: '1%',
    marginBottom: '2%',
  },
});
