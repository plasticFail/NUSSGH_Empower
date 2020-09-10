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
import Ionicon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
//component
import LeftArrowBtn from '../../logs/leftArrowBtn';
import TimeSection from '../timeSection';
import MissedContent from './missedContent';
//style
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import diaryStyles from '../../../styles/diaryStyles';
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
import {weight_key} from '../../../commonFunctions/logFunctions';

const WeightBlock = (props) => {
  const {
    visible,
    morningWeightLogs,
    afternoonWeightLogs,
    eveningWeightLogs,
    pass,
    miss,
    day,
  } = props;
  const {closeModal} = props;
  const [selectedLog, setSelectedLog] = useState({});
  const [missedArr, setMissedArr] = useState([]);

  useEffect(() => {
    setMissedArr(
      getMissedArr(morningWeightLogs, afternoonWeightLogs, eveningWeightLogs),
    );
  }, []);

  const editWeightLog = (item) => {};

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
        <Text style={globalStyles.pageHeader}>Weight</Text>
        <Text style={globalStyles.pageDetails}>{day}</Text>
        <MissedContent arr={missedArr} type={weight_key} />
        <View style={{flexDirection: 'row', marginTop: '3%'}}>
          {pass ? (
            <>
              <Text style={globalStyles.pageDetails}>Within Healthy Range</Text>

              <Ionicon
                name="checkmark"
                style={diaryStyles.passIcon}
                size={25}
              />
            </>
          ) : (
            <>
              <Text style={globalStyles.pageDetails}>
                Not Within Healthy Range
              </Text>

              <Ionicon
                name="alert-circle-outline"
                style={diaryStyles.failIcon}
                size={25}
              />
            </>
          )}
        </View>
        {/*Show time section and data for log*/}
        <TimeSection name={morningObj.name} />
        {renderWeightLogs(morningWeightLogs, editWeightLog)}
        <TimeSection name={afternoonObj.name} />
        {renderWeightLogs(afternoonWeightLogs, editWeightLog)}
        <TimeSection name={eveningObj.name} />
        {renderWeightLogs(eveningWeightLogs, editWeightLog)}
      </ScrollView>
    </Modal>
  );
};

function renderWeightLogs(logs, editLog) {
  if (logs.length > 0) {
    return (
      <>
        <Text style={diaryStyles.recordedText}>Reading Recorded</Text>
        {logs.map((item, index) => (
          <View style={styles.logContent} key={index.toString()}>
            <Text style={diaryStyles.recordContent}>
              {getTime(item.record_date)}
            </Text>
            <Text style={diaryStyles.recordContent}>
              {item.weight} {item.unit}
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
      </>
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

export default WeightBlock;

const styles = StyleSheet.create({
  logContent: {
    flexDirection: 'row',
    marginTop: '1%',
    marginBottom: '2%',
  },
});
