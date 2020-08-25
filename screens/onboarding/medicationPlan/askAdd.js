import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
//third party library
import Ionicons from 'react-native-vector-icons/Ionicons';
import Calendar from 'react-native-calendars';

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
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddMedication}>
          <Ionicons name="add-circle" size={80} color="#aad326" />
        </TouchableOpacity>
      ) : (
        <Text>hI</Text>
      )}

      <View style={{flex: 1}} />
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.buttonText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AskAdd;

const styles = StyleSheet.create({
  onboardingContainer: {
    flex: 1,
    padding: ' 10%',
    width: '100%',
  },
  stepText: {
    marginTop: '20%',
    fontSize: 35,
    fontWeight: '700',
  },
  stepContent: {
    fontWeight: '700',
    fontSize: 20,
    marginTop: '3%',
  },
  stepDescription: {
    fontSize: 17,
    width: '90%',
    marginTop: '3%',
  },
  addButton: {
    alignSelf: 'center',
    marginTop: '15%',
  },
  skipButton: {
    backgroundColor: '#e4e4e4',
    height: 45,
    width: '100%',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: '3%',
    fontWeight: '700',
  },
});
