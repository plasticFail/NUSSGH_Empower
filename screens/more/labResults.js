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
import {getLabResults} from '../../netcalls/requestsLab';

const LabResults = (props) => {
  const [labResults, setLabResults] = useState([]);
  const [selected, setSelected] = useState({});
  const [openDetail, setOpenDetail] = useState(false);

  useEffect(() => {
    let dateS = moment(new Date()).format('YYYY-MM');
    getMonthSelected(dateS);
  }, []);

  console.log(selected);

  const getMonthSelected = (value) => {
    console.log('month selected ' + value);
    //call api to get lab results.
    getLabResults(value).then((rsp) => {
      if (rsp != null) {
        prepareData(rsp?.data);
      }
    });
  };

  const openResult = (obj) => {
    setSelected(obj);
    setOpenDetail(true);
  };

  const prepareData = (array) => {
    let profilekeys = prepareProfile(array);
    let datearr = prepareDateArr(array, profilekeys);
    for (var x of datearr) {
      let day = moment(getDateObj(x?.date)).format('DD MM YYYY');
      for (var y of array) {
        let day1 = moment(getDateObj(y?.date)).format('DD MM YYYY');
        if (day === day1) {
          let keys = Object.keys(y);
          let profilekey = keys[0] === 'date' ? keys[1] : keys[0];
          for (var z of profilekeys) {
            if (y[String(z)] != null && z === profilekey) {
              x[profilekey].push(y[String(z)][0]);
            }
          }
        }
      }
    }
    setLabResults(datearr);
  };

  const prepareDateArr = (data, profilekeys) => {
    let arr = [];
    for (var x of data) {
      let obj = {
        date: x?.date,
        title: 'Medical Report (Dummy)',
      };

      //assuming all labs have the different types of profile*
      for (var z of profilekeys) {
        obj[String(z)] = [];
      }
      arr.push(obj);
    }

    //remove duplicates
    const newArr = arr.filter(
      (elem, index) =>
        arr.findIndex(
          (obj) =>
            moment(obj?.date).format('DD MM YYYY') ===
            moment(elem?.date).format('DD MM YYYY'),
        ) === index,
    );

    return newArr;
  };

  //get profile keys
  const prepareProfile = (data) => {
    let keys = [];
    for (var x of data) {
      for (const key of Object.keys(x)) {
        if (key != 'date' && !keys.includes(key)) {
          keys.push(key);
        }
      }
    }
    return keys;
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
        diabeticArr={selected?.diabetic_profile}
        lipidArr={selected?.lipid_profile}
        cardiacArr={selected?.cardiac_profile}
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
