import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
//third party library
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Calendar} from 'react-native-calendars';
import CalendarMedicationDay from '../../../components/onboarding/medication/calendarMedicationDay';

Ionicons.loadFont();

const AskAdd = (props) => {
  const [selectedDates4All, setSelectedDates4All] = useState({});
  console.log('--------');
  console.log(selectedDates4All);

  //get the selected dates for a particular medication
  //loop through the current selectDatesForAll to see if medicine exist for day
  //if not, add the medication*
  const onReturn = (data) => {
    for (var x of Object.keys(data)) {
      if (!Object.keys(selectedDates4All).includes(x)) {
        let newObj = {
          ...selectedDates4All,
          [x]: {
            selected: true,
            marked: true,
            medicationList: [data[x].medicine],
          },
        };
        setSelectedDates4All(newObj);
      } else {
        //there is an existing date with medication
        //check if medication exist in medicationlist for that date, if not add
        if (
          !containsObject(data[x].medicine, selectedDates4All[x].medicationList)
        ) {
          let arr = selectedDates4All[x].medicationList;
          arr.push(data[x].medicine);
          let newObj = {
            ...selectedDates4All,
            [x]: {
              ...selectedDates4All[x],
              medicationList: arr,
            },
          };
          setSelectedDates4All(newObj);
        }
      }
    }
  };

  //check if medicine name same*
  const containsObject = (obj, list) => {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].drugName === obj.drugName) {
        return true;
      }
    }
    return false;
  };

  const handleSkip = () => {};
  const handleAddMedication = () => {
    props.navigation.navigate('AddPlan', {onReturn: onReturn});
  };

  //check if selected dates object is empty
  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  return (
    <View style={styles.onboardingContainer}>
      <Text style={styles.stepText}>Step 3</Text>
      <Text style={styles.stepContent}>Add your Medicine Plan</Text>
      <Text style={styles.stepDescription}>
        Would you like to add your scheduled medications for this month? We will
        help to track them.
      </Text>
      {isEmpty(selectedDates4All) === true ? (
        <>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddMedication}>
            <Ionicons name="add-circle" size={80} color="#aad326" />
          </TouchableOpacity>
          <View style={{flex: 1}} />
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Calendar
            dayComponent={CalendarMedicationDay}
            current={new Date()}
            hideArrows={true}
            disableMonthChange={true}
            markedDates={selectedDates4All}
            markingType={'custom'}
            selectAll={false}
            theme={{
              textDayHeaderFontSize: 15,
            }}
          />
          <View style={{flex: 1}} />
          <TouchableOpacity
            style={[styles.skipButton, {backgroundColor: '#aad326'}]}
            onPress={handleAddMedication}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default AskAdd;

const styles = StyleSheet.create({
  onboardingContainer: {
    paddingTop: '2%',
    backgroundColor: 'white',
    flex: 1,
  },
  stepText: {
    marginTop: '10%',
    fontSize: 35,
    fontWeight: '700',
    marginStart: '3%',
    marginEnd: '3%',
  },
  stepContent: {
    fontWeight: '700',
    fontSize: 20,
    marginTop: '3%',
    marginStart: '3%',
    marginEnd: '3%',
  },
  stepDescription: {
    fontSize: 17,
    width: '90%',
    marginTop: '3%',
    marginStart: '3%',
    marginEnd: '3%',
  },
  addButton: {
    alignSelf: 'center',
    marginTop: '15%',
  },
  skipButton: {
    backgroundColor: '#e4e4e4',
    height: 45,
    width: '70%',
    borderRadius: 20,
    margin: '5%',
    alignSelf: 'center',
    marginBottom: '3%',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: '3%',
    fontWeight: '700',
  },
});
