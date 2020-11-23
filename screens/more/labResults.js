import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import globalStyles from '../../styles/globalStyles';
//component
import LeftArrowBtn from '../../components/logs/leftArrowBtn';
import MonthPicker from '../../components/lab/monthPicker';
//third part lib
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';

import {getDateObj} from '../../commonFunctions/diaryFunctions';
import dummyData from '../../components/lab/dummyLabData.json';
import {adjustSize} from '../../commonFunctions/autoResizeFuncs';
import LabReportDetail from '../../components/lab/labReportDetail';

const LabResults = (props) => {
  const [labResults, setLabResults] = useState(dummyData.data);
  const [selected, setSelected] = useState({});
  const [openDetail, setOpenDetail] = useState(false);

  const getMonthSelected = (value) => {
    console.log('month selected ' + value);
    //call api to get lab results.
    setLabResults(dummyData.data);
  };

  const openResult = (obj) => {
    setSelected(obj);
    setOpenDetail(true);
  };

  return (
    <View style={globalStyles.pageContainer}>
      <View style={globalStyles.menuBarContainer}>
        <LeftArrowBtn close={() => props.navigation.navigate('Home')} />
      </View>
      <Text style={globalStyles.pageHeader}>Lab Results</Text>
      <MonthPicker getMonthSelected={getMonthSelected} />
      {labResults.map((item, index) => (
        <TouchableOpacity
          style={styles.reportContainer}
          key={index}
          onPress={() => openResult(item)}>
          <View style={{flex: 1}}>
            <Text style={styles.text}>{item?.title}</Text>
            <Text style={[styles.text, {opacity: 0.5}]}>
              {moment(getDateObj(item?.date)).format('DD MMM YYYY')}
            </Text>
          </View>
          <Feather name="chevron-right" size={30} color={'#8b8f9a'} />
        </TouchableOpacity>
      ))}
      <LabReportDetail
        visible={openDetail}
        close={() => setOpenDetail(false)}
        diabeticArr={selected?.diabeticProfile}
        lipidArr={selected?.lipidProfile}
        date={selected?.date}
      />
    </View>
  );
};

export default LabResults;

const styles = StyleSheet.create({
  reportContainer: {
    flexDirection: 'row',
    margin: '3%',
    backgroundColor: 'white',
    padding: '3%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e1e7ed',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: adjustSize(18),
  },
});
