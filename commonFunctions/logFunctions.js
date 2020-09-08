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
const min_bg = 4;

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
      String(weight).match(/^[0-9]+(\.[0-9]{1})?$/g) &&
      !String(weight).includes(',') &&
      !String(weight).includes('-') &&
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

const checkDosageText = (dosage, correctDosage) => {
  if (dosage === correctDosage) {
    return '';
  } else {
    return (
      'Invalid Dosage, make sure dosage is same as what you have set in your medication plan which is ' +
      correctDosage +
      ' Unit (s)'
    );
  }
};

const checkDosage = (dosage, correctDosage) => {
  if (dosage && checkDosageText(dosage, correctDosage) === '') {
    return true;
  }
  return false;
};

const checkRepeatMedicine = (medicine, list) => {
  for (let x of list) {
    if (x.drugName === medicine.drugName) {
      return true;
    }
  }
  return false;
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
  console.log(selectedMedicationList);

  if (await medicationAddLogRequest(selectedMedicationList)) {
    storeLastMedicationLog({
      value: selectedMedicationList,
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
};

const handleSubmitWeight = async (date, weight) => {
  if (checkWeight(weight)) {
    let formatDate = Moment(date).format('DD/MM/YYYY HH:mm:ss');
    if (await weightAddLogRequest(Number(weight), formatDate)) {
      storeLastWeightLog({
        value: weight,
        date: Moment(date).format('YYYY/MM/DD'),
        hour: Moment(date).format('HH:mm'), //tweaked
        dateString: Moment(date).format('Do MMM YYYY, h:mm a'), //added
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
  min_bg,
  renderLogIcon,
  isToday,
  isPeriod,
  checkBloodGlucose,
  checkWeight,
  checkBloodGlucoseText,
  checkWeightText,
  checkDosageText,
  checkDosage,
  checkRepeatMedicine,
  handleSubmitBloodGlucose,
  handleSubmitMedication,
  handleSubmitWeight,
};
