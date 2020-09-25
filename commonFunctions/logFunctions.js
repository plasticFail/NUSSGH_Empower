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
  getLastBgLog,
  getLastWeightLog,
  getLastMedicationLog,
  getLastMealLog,
} from '../storage/asyncStorageFunctions';

import {getGreetingFromHour, checkLast7Day} from './common';
import {getEntry4Day} from '../netcalls/requestsDiary';
import {
  filterMorning,
  filterAfternoon,
  getTime,
  getHour,
} from './diaryFunctions';

const bg_key = 'Blood Glucose Log';
const food_key = 'Food Intake Log';
const med_key = 'Medication Log';
const weight_key = 'Weight Log';
const activity_key = 'Activity Log';
const step_key = 'Steps';
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
  if (logType === activity_key) {
    return require('../resources/images/activity_logo.png');
  }
  if (logType === step_key) {
    return require('../resources/images/activity_logo.png');
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

const checkLogDone = async (period) => {
  let weight_data = await getLastWeightLog();

  let completed = [];
  let notCompleted = [];
  let bgLogs = [];
  let foodLogs = [];
  let medLogs = [];
  let weightLogs = [];
  let today = Moment(new Date()).format('YYYY-MM-DD');

  try {
    let data = await getEntry4Day(String(today));
    let d = data[today];
    bgLogs = d.glucose.logs;
    foodLogs = d.food.logs;
    medLogs = d.medication.logs;
    weightLogs = d.weight.logs;

    if (inPeriod(bgLogs, period)) {
      completed.push(bg_key);
    } else {
      notCompleted.push(bg_key);
    }

    if (inPeriod(foodLogs, period)) {
      completed.push(food_key);
    } else {
      notCompleted.push(food_key);
    }

    if (inPeriod(medLogs, period)) {
      completed.push(med_key);
    } else {
      notCompleted.push(med_key);
    }

    if (weight_data != null) {
      if (checkLast7Day(weight_data)) {
        completed.push(weight_key);
      }
    } else {
      notCompleted.push(weight_key);
    }
  } catch (e) {
    console.error(e);
    //for now temporary push food to not done
  }
  return {
    completed: completed,
    notCompleted: notCompleted,
  };
};

const inPeriod = (logs, period) => {
  if (logs.length === 0) {
    return false;
  }
  for (var x of logs) {
    let time = getHour(x.record_date);
    let greeting = getGreetingFromHour(time);
    if (greeting === period) {
      return true;
    }
  }
  return false;
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

const handleSubmitBloodGlucose = async (
  date,
  bloodGlucose,
  eatSelection,
  exerciseSelection,
  alcholicSelection,
) => {
  if (checkBloodGlucose(bloodGlucose)) {
    let formatDate = Moment(date).format('DD/MM/YYYY HH:mm:ss');
    if (
      await glucoseAddLogRequest(
        Number(bloodGlucose),
        formatDate,
        eatSelection,
        exerciseSelection,
        alcholicSelection,
      )
    ) {
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

  if (await medicationAddLogRequest(selectedMedicationList)) {
    let med_data = await getLastMedicationLog();
    
    if (med_data === null ||
      Moment(date).format('YYYY/MM/DD') > med_data.date ||
      (Moment(date).format('YYYY/MM/DD') === med_data.date &&
        Moment(date).format('HH:mm') > med_data.hour)
    ) {
      storeLastMedicationLog({
        value: selectedMedicationList,
        date: Moment(date).format('YYYY/MM/DD'),
        hour: Moment(date).format('HH:mm'), //tweaked
        dateString: Moment(date).format('Do MMM YYYY, h:mm a'), //added
      });
    }

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
      let weight_data = await getLastWeightLog();
      if (weight_data != null) {
        if (
          Moment(date).format('YYYY/MM/DD') > weight_data.date ||
          (Moment(date).format('YYYY/MM/DD') === weight_data.date &&
            Moment(date).format('HH:mm') > weight_data.hour)
        ) {
          storeLastWeightLog({
            value: weight,
            date: Moment(date).format('YYYY/MM/DD'),
            hour: Moment(date).format('HH:mm'), //tweaked
            dateString: Moment(date).format('Do MMM YYYY, h:mm a'), //added
          });
        }
      } else {
        storeLastWeightLog({
          value: weight,
          date: Moment(date).format('YYYY/MM/DD'),
          hour: Moment(date).format('HH:mm'), //tweaked
          dateString: Moment(date).format('Do MMM YYYY, h:mm a'), //added
        });
      }

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
  activity_key,
  step_key,
  min_bg,
  renderLogIcon,
  isToday,
  isPeriod,
  checkLogDone,
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
//edit flag
