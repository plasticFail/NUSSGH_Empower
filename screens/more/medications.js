import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
//component
import MenuBtn from '../../components/menuBtn';
//styles
import globalStyles from '../../styles/globalStyles';
//third party lib
import moments from 'moment';
import {Calendar} from 'react-native-calendars';
//components
import LeftArrowBtn from '../../components/logs/leftArrowBtn';
import CalendarMedicationDay from '../../components/onboarding/medication/calendarMedicationDay';
//style
import {Colors} from '../../styles/colors';
import {getMedication4DateRange} from '../../netcalls/requestsMedPlan';
import Medication4Day from '../../components/medication/medication4Day';

const MedicationScreen = (props) => {
  let today = new Date();
  let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  let start = moments(today).format('YYYY-MM-01');
  let end = moments(lastDayOfMonth).format('YYYY-MM-DD');

  const [medicationList, setMedicationList] = useState({});

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      getMedication4DateRange(start, end)
        .then((data) => {
          if (data != null) {
            prepareData(data);
          }
        })
        .catch((err) => console.log(err));
    });
  }, []);

  const prepareData = (data) => {
    let newObj = {};
    for (var x of Object.keys(data)) {
      let list = renameKey(data[x]);
      newObj[x] = {
        selected: true,
        marked: true,
        medicationList: list,
      };
    }
    setMedicationList(newObj);
  };

  const renameKey = (list) => {
    list = list.map((obj) => {
      obj['drugName'] = obj['medication'];
      obj['perDay'] = obj['per_day']; //assign new key
      delete obj['medication']; //delete old key
      delete obj['per_day'];
      return obj;
    });

    return list;
  };

  return (
    <View style={{...globalStyles.pageContainer, ...props.style}}>
      <View style={globalStyles.menuBarContainer}>
        <LeftArrowBtn close={() => props.navigation.navigate('Home')} />
      </View>
      <Text style={globalStyles.pageHeader}>Medication</Text>
      <Text style={[globalStyles.pageSubDetails, {marginBottom: '4%'}]}>
        Select the date to view or add medication
      </Text>
      <Calendar
        dayComponent={Medication4Day}
        hideArrows={false}
        selectAll={false}
        disableMonthChange={true}
        markingType={'custom'}
        selectAll={false}
        markedDates={medicationList}
        theme={{
          calendarBackground: Colors.backgroundColor,
          'stylesheet.calendar.header': {
            header: {
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 6,
              alignItems: 'center',
            },
            headerContainer: {
              width: '80%',
              flexDirection: 'row',
            },
            monthText: {
              fontSize: 20,
              fontFamily: 'SFProDisplay-Bold',
              textAlign: 'center',
            },
          },
          arrowColor: Colors.lastLogValueColor,
        }}
      />
    </View>
  );
};

export default MedicationScreen;
