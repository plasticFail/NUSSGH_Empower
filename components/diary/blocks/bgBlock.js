import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
//function
import {
  morningObj,
  afternoonObj,
  eveningObj,
} from '../../../commonFunctions/common';
import {
  getTime,
  showEdit,
  getMissedArr,
} from '../../../commonFunctions/diaryFunctions';
//third party library
import Modal from 'react-native-modal';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
//styles
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import diaryStyles from '../../../styles/diaryStyles';
//component
import LeftArrowBtn from '../../logs/leftArrowBtn';
import TimeSection from '../timeSection';
import {ScrollView} from 'react-native-gesture-handler';
import MissedContent from './missedContent';
import {bg_key} from '../../../commonFunctions/logFunctions';

const BgBlock = (props) => {
  const {
    visible,
    morningBgLogs,
    afternoonBgLogs,
    eveningBgLogs,
    avgBg,
    pass,
    miss,
    day,
  } = props;
  const {closeModal} = props;
  const [selectedLog, setSelectedLog] = useState({});
  const [missedArr, setMissedArr] = useState([]);

  useEffect(() => {
    setMissedArr(getMissedArr(morningBgLogs, afternoonBgLogs, eveningBgLogs));
  }, []);

  const editLog = (item) => {
    console.log('selecting item to edit');
    setSelectedLog(item);
  };

  return (
    <Modal
      isVisible={visible}
      coverScreen={true}
      backdropOpacity={1}
      onBackButtonPress={() => closeModal()}
      backdropColor={Colors.backgroundColor}
      style={{margin: 0}}>
      <LeftArrowBtn close={closeModal} />
      <Text style={globalStyles.pageHeader}>Blood Glucose</Text>
      <Text style={globalStyles.pageDetails}>{day}</Text>
      <MissedContent arr={missedArr} type={bg_key} />
      <View style={{flexDirection: 'row', marginTop: '3%', marginBottom: '2%'}}>
        {pass ? (
          <>
            <Text style={globalStyles.pageDetails}>Average {avgBg} mmol/L</Text>

            <Ionicon name="checkmark" style={diaryStyles.passIcon} size={25} />
          </>
        ) : (
          <>
            <Text style={globalStyles.pageDetails}>Average {avgBg} mmol/L</Text>

            <Ionicon
              name="alert-circle-outline"
              style={diaryStyles.failIcon}
              size={25}
            />
          </>
        )}
      </View>
      <ScrollView style={{flex: 1}}>
        {/*Show time section and data for log*/}
        <TimeSection name={morningObj.name} />
        {renderLogs(morningBgLogs, editLog)}
        <TimeSection name={afternoonObj.name} />
        {renderLogs(afternoonBgLogs, editLog)}
        <TimeSection name={eveningObj.name} />
        {renderLogs(eveningBgLogs, editLog)}
      </ScrollView>
    </Modal>
  );
};

export default BgBlock;

function renderLogs(logs, editLog) {
  if (logs.length > 0) {
    return (
      <View style={{marginBottom: '3%'}}>
        <Text style={diaryStyles.recordedText}>Reading Recorded</Text>
        {logs.map((item, index) => (
          <View style={styles.logContent} key={index.toString()}>
            <Text style={diaryStyles.recordContent}>
              {getTime(item.record_date)}
            </Text>
            <Text style={diaryStyles.recordContent}>
              {item.bg_reading} mmol/L
            </Text>
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
  buttonStyle: {
    width: '100%', // This should be the same size as backgroundImg height
    padding: 10,
  },
  iconImg: {
    position: 'absolute',
    top: '40%',
    left: '20%',
    width: 30,
    height: 30,
    resizeMode: 'contain', //resize image so dont cut off
  },
  backgroundImg: {
    width: '100%',
    height: 120,
    opacity: 0.3,
    borderWidth: 0.4,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#aad326',
  },
  buttonText1: {
    position: 'absolute',
    top: '70%',
    left: '19%',
    fontSize: 18,
    fontWeight: '700',
    color: '#072d08',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: '3%',
  },
  noRecordContainer: {
    marginBottom: '2%',
  },
  logContent: {
    flexDirection: 'row',
    marginTop: '1%',
    marginBottom: '2%',
  },
});

//comment
