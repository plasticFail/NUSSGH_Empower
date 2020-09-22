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
import {
  getMedication4DateRange,
  getMed4CurrentMonth,
} from '../../netcalls/requestsMedPlan';
import Medication4Day from '../../components/medication/medication4Day';
import {prepareDataFromAPI} from '../../commonFunctions/medicationFunction';

const MedicationScreen = (props) => {
  const [medicationList, setMedicationList] = useState({});

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      getMed4CurrentMonth()
        .then((response) => {
          if (response != null) {
            prepareData(response);
          }
        })
        .catch((err) => console.log(err));
    });
  }, []);

  const prepareData = (data) => {
    setMedicationList(prepareDataFromAPI(data));
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
