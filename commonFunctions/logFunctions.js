import Moment from 'moment';
import {Alert} from 'react-native';
import {
  storeLastBgLog,
  storeLastWeightLog,
  storeLastMedicationLog,
} from '../storage/asyncStorageFunctions';
import {glucoseAddLogRequest} from '../netcalls/requestsLog';

const checkTime = (dateToCheck) => {
  Moment.locale('en');
  let format = 'hh:mm';
  let timeNow = Moment(new Date(), format);
  let timeInput = Moment(dateToCheck, format);
  if (dateToCheck.toDateString() !== new Date().toDateString()) {
    Alert.alert(
      'Error',
      'Invalid date. Make sure date selected is not after today. ',
      [{text: 'Got It'}],
    );
    return false;
  } else if (timeInput.isAfter(timeNow)) {
    Alert.alert(
      'Error',
      'Invalid date. Make sure time selected is not after current time. ',
      [{text: 'Got It'}],
    );
    return false;
  }
  return true;
};

const checkBloodGlucose = bloodGlucose => {
  if(bloodGlucose) {
    if (Number(bloodGlucose) >= 30 || Number(bloodGlucose) <= 0) {
      Alert.alert('Error', 'Invalid Blood Glucose Level, should be within 0-30', [{text: 'Got It'}]);
    } else if (
        bloodGlucose.match(/^[0-9]+(\.[0-9]{1,2})?$/g) &&
        !bloodGlucose.includes(',') &&
        !bloodGlucose.includes('-')
    ) {
      return true;
    } else {
      Alert.alert(
          'Error',
          'Invalid Blood Glucose Input. Make sure at most 2 decimal place',
          [{text: 'Got It'}],
      );
    }
  }
  return false;
}

const checkDosage = (dosageString) => {
  let dosageS = String(dosageString);
  if (
    dosageString.length != 0 &&
    !dosageS.includes('.') &&
    !dosageS.includes('-') &&
    !dosageS.includes(',') &&
    Number(dosageS) <= 5 &&
    Number(dosageS) > 0
  ) {
    return true;
  } else {
    Alert.alert('Error', 'Invalid dosage input.', [{text: 'Got It'}]);
    return false;
  }
};

export {checkTime, checkBloodGlucose, checkDosage};
