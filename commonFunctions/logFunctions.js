import Moment from 'moment';
import {Alert} from 'react-native';
import {
  glucoseAddLogRequest,
  medicationAddLogRequest,
  weightAddLogRequest,
} from '../netcalls/requestsLog';
import {
  storeLastBgLog,
  storeLastMedicationLog,
  storeLastWeightLog,
} from '../storage/asyncStorageFunctions';
import {getGreetingFromHour} from './common';

const bg_key = 'Blood Glucose Log';
const food_key = 'Food Intake Log';
const med_key = 'Medication Log';
const weight_key = 'Weight Log';

const renderLogIcon = (logType) => {
  if (logType === bg_key) {
    return require('../resources/images/bloodglucose_logo.png');
  }
  if (logType === food_key) {
    return require('../resources/images/foodintake_logo.png');
  }
  if (logType === med_key) {
    return require('../resources/images/medication_logo.png');
  }
  if (logType === weight_key) {
    return require('../resources/images/weight_logo.png');
  }
};

const isToday = (date) => {
  return date === Moment(new Date()).format('YYYY/MM/DD');
};

const isPeriod = (time) => {
  let timeArr = String(time).split(':');
  let hour = timeArr[0];
  return getGreetingFromHour(hour);
};

const checkBloodGlucose = (bloodGlucose) => {
  if (bloodGlucose && checkBloodGlucoseText(bloodGlucose) === '') {
    return true;
  }
  return false;
};

const checkBloodGlucoseText = (bloodGlucose) => {
  if (bloodGlucose) {
    if (Number(bloodGlucose) >= 30 || Number(bloodGlucose) <= 0) {
      return 'Invalid Blood Glucose Level, should be within 0-30';
    } else if (
      bloodGlucose.match(/^[0-9]+(\.[0-9]{1,2})?$/g) &&
      !bloodGlucose.includes(',') &&
      !bloodGlucose.includes('-')
    ) {
      return '';
    } else {
      return 'Invalid Blood Glucose Input. Make sure at most 2 decimal place';
    }
  }
  return '';
};

const checkWeight = (weight) => {
  if (weight && checkWeightText(weight) === '') {
    return true;
  }
  return false;
};

const checkWeightText = (weight) => {
  if (weight) {
    if (
      weight.match(/^[0-9]+(\.[0-9]{1})?$/g) &&
      !weight.includes(',') &&
      !weight.includes('-') &&
      Number(weight) <= 200 &&
      Number(weight) >= 40
    ) {
      return '';
    } else {
      return 'Make sure weight entered is between 40 to 200kg. ';
    }
  }
  return '';
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

const handleSubmitBloodGlucose = async (date, bloodGlucose) => {
  if (checkBloodGlucose(bloodGlucose)) {
    let formatDate = Moment(date).format('DD/MM/YYYY HH:mm:ss');
    if (await glucoseAddLogRequest(Number(bloodGlucose), formatDate)) {
      storeLastBgLog({
        value: bloodGlucose,
        date: Moment(date).format('YYYY/MM/DD'),
        hour: Moment(date).format('HH:mm'), //tweaked
        dateString: Moment(date).format('Do MMM YYYY, h:mm a'), //added
      });
      return true;
    } else {
      Alert.alert('Error', 'Unexpected Error Occured', [
        {text: 'Try again later'},
      ]);
      return false;
    }
  }
};

const handleSubmitMedication = async (date, selectedMedicationList) => {
  for (let x of selectedMedicationList) {
    x.recordDate = Moment(date).format('DD/MM/YYYY HH:mm:ss');
  }

  //remove image to send back to database
  let listCopySend = JSON.parse(JSON.stringify(selectedMedicationList));
  listCopySend.map(function (item) {
    delete item.image_url;
    return item;
  });

  if (await medicationAddLogRequest(listCopySend)) {
    storeLastMedicationLog({
      value: selectedMedicationList,
      date: Moment(date).format('YYYY/MM/DD'),
      time: Moment(date).format('h:mm a'),
    });
    return true;
  } else {
    Alert.alert('Error', 'Unexpected Error Occured', [
      {text: 'Try again later'},
    ]);
    return false;
  }
};

const handleSubmitWeight = async (date, weight) => {
  if (checkWeight(weight)) {
    let formatDate = Moment(date).format('DD/MM/YYYY HH:mm:ss');
    if (await weightAddLogRequest(Number(weight), formatDate)) {
      storeLastWeightLog({
        value: weight,
        date: Moment(date).format('YYYY/MM/DD'),
        time: Moment(date).format('h:mm a'),
      });
      return true;
    } else {
      Alert.alert('Error', 'Unexpected Error Occured ', [
        {text: 'Try Again Later'},
      ]);
      return false;
    }
  }
};

export {
  bg_key,
  food_key,
  med_key,
  weight_key,
  renderLogIcon,
  isToday,
  isPeriod,
  checkBloodGlucose,
  checkWeight,
  checkBloodGlucoseText,
  checkWeightText,
  checkDosage,
  handleSubmitBloodGlucose,
  handleSubmitMedication,
  handleSubmitWeight,
};
