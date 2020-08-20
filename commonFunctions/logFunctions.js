import Moment from 'moment';
import {Alert} from 'react-native';
import {glucoseAddLogRequest, medicationAddLogRequest, weightAddLogRequest} from '../netcalls/requestsLog';
import {storeLastBgLog, storeLastMedicationLog, storeLastWeightLog} from '../storage/asyncStorageFunctions';


const checkBloodGlucose = (bloodGlucose) => {
  if (bloodGlucose) {
    if (Number(bloodGlucose) >= 30 || Number(bloodGlucose) <= 0) {
      Alert.alert(
        'Error',
        'Invalid Blood Glucose Level, should be within 0-30',
        [{text: 'Got It'}],
      );
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
  return false;
};

const checkWeight = (weight) => {
  if (weight) {
    if (
      weight.match(/^[0-9]+(\.[0-9]{1})?$/g) &&
      !weight.includes(',') &&
      !weight.includes('-') &&
      Number(weight) <= 200 &&
      Number(weight) >= 40
    ) {
      return true;
    } else {
      Alert.alert(
        'Invalid Weight',
        'Make sure weight entered is between 40 to 200kg. ',
        [{text: 'Got It'}],
      );
      return false;
    }
  }
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
  return false;
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

const handleSubmitBloodGlucose = async(date, bloodGlucose) => {
  if (checkBloodGlucose(bloodGlucose)) {
    let formatDate = Moment(date).format('DD/MM/YYYY HH:mm:ss');
    glucoseAddLogRequest(Number(bloodGlucose), formatDate).then((value) => {
      if (value) {
        storeLastBgLog({
          value: bloodGlucose,
          date: Moment(date).format('YYYY/MM/DD'),
          time: Moment(date).format('h:mm a'),
        });
      }else {
        Alert.alert('Error', 'Unexpected Error Occured', [
          {text: 'Try again later'},
        ]);
      }
      return value;
    });
  }
  return false;
};

const handleSubmitMedication = async(date, selectedMedicationList) => {
  for (let x of selectedMedicationList) {
    x.recordDate = Moment(date).format('DD/MM/YYYY HH:mm:ss');
  }

  medicationAddLogRequest(selectedMedicationList).then((value) => {
    if (value) {
      storeLastMedicationLog({
        value: selectedMedicationList,
        date: Moment(date).format('YYYY/MM/DD'),
        time: Moment(date).format('h:mm a'),
      });
      //remove image to send back to database
      selectedMedicationList.map(function (item) {
        delete item.image_url;
        return item;
      });
    }else {
      Alert.alert('Error', 'Unexpected Error Occured', [
        {text: 'Try again later'},
      ]);
    }
    return value;
  });
}

const handleSubmitWeight = async(date, weight) => {
  if (checkWeight(weight)) {
    let formatDate = Moment(date).format('DD/MM/YYYY HH:mm:ss');
    weightAddLogRequest(Number(weight), formatDate).then((value) => {
      if (value) {
        storeLastWeightLog({
          value: weight,
          date: Moment(date).format('YYYY/MM/DD'),
          time: Moment(date).format('h:mm a'),
        });
      } else {
        Alert.alert('Error', 'Unexpected Error Occured ', [
          {text: 'Try Again Later'},
        ]);
      }
      return value;
    });
  }
  return false;
};

export {
  checkBloodGlucose,
  checkWeight,
  checkBloodGlucoseText,
  checkWeightText,
  checkDosage,
  handleSubmitBloodGlucose,
  handleSubmitMedication,
  handleSubmitWeight,
};
