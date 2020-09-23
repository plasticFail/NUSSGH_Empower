import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
//component
import MenuBtn from '../../components/menuBtn';
//styles
import globalStyles from '../../styles/globalStyles';
//third party lib
import Modal from 'react-native-modal';
import {Calendar} from 'react-native-calendars';
//components
import LeftArrowBtn from '../../components/logs/leftArrowBtn';
import Medication4Day from '../../components/medication/medication4Day';
//style
import {Colors} from '../../styles/colors';
import {getMedication4DateRange} from '../../netcalls/requestsMedPlan';
import {
  prepareDataFromAPI,
  fromDate,
  toDate,
} from '../../commonFunctions/medicationFunction';
import LoadingModal from '../../components/loadingModal';

const MedicationScreen = (props) => {
  const [medicationList, setMedicationList] = useState({});
  const [loading, setLoading] = useState(true);

  console.log('loading : ' + loading);

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setLoading(true);
      getMedication4DateRange(fromDate, toDate)
        .then((response) => {
          if (response != null) {
            setLoading(false);
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
              marginTop: '2%',
              alignItems: 'center',
              alignSelf: 'center',
            },
            headerContainer: {
              width: '80%',
              flexDirection: 'row',
              justifyContent: 'center',
            },
            monthText: {
              fontSize: 20,
              fontFamily: 'SFProDisplay-Bold',
            },
          },
          arrowColor: Colors.lastLogValueColor,
        }}
      />
      {loading ? (
        <LoadingModal
          visible={loading}
          message={'Retrieving your Medication Plan'}
        />
      ) : null}
    </View>
  );
};

export default MedicationScreen;
