import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
//third party library
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Calendar} from 'react-native-calendars';
import CalendarMedicationDay from '../../../components/onboarding/medication/calendarMedicationDay';

Ionicons.loadFont();

const AskAdd = (props) => {
  const [selectedDates, setSelectedDates] = useState({});

  const onReturn = (data) => {
    setSelectedDates(data);
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
      {isEmpty(selectedDates) === true ? (
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
            markedDates={selectedDates}
            markingType={'custom'}
            selectAll={false}
            theme={{
              textDayHeaderFontSize: 15,
            }}
          />
          <View style={{flex: 1}} />
          <TouchableOpacity
            style={[styles.skipButton, {backgroundColor: '#aad326'}]}
            onPress={handleSkip}>
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
