import Moment from 'moment';
import {Alert} from 'react-native';
import {
  storeLastBgLog,
  storeLastWeightLog,
} from '../storage/asyncStorageFunctions';

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

const storeData = (type, data) => {
  if (type === 'BloodGlucose') {
    storeLastBgLog(JSON.stringify(data));
  }
  if (type === 'Weight') {
    storeLastWeightLog(JSON.stringify(data));
  }
};

export {checkTime, checkDosage, storeData};
