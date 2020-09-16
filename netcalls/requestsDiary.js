import {
  getDiaryEntries,
  medicationAddLog,
  glucoseAddLog,
  weightAddLog,
} from './urls';
import {getToken} from '../storage/asyncStorageFunctions';
import moment from 'moment';
import {Alert} from 'react-native';

const getEntry4Day = async (dateString) => {
  try {
    let anotherDate = moment(dateString).add(1, 'days').format('YYYY-MM-DD');
    let link =
      getDiaryEntries + '?start=' + dateString + '&end=' + String(anotherDate);
    let response = await fetch(link, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};

const getEntryForDateRange = async (startString, endString) => {
  try {
    let link = getDiaryEntries + '?start=' + startString + '&end=' + endString;

    let response = await fetch(link, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};

const editBgLog = async (
  datetime,
  eatSelection,
  exerciseSelection,
  alcholicSelection,
  id,
  bgReading,
) => {
  try {
    let response = await fetch(glucoseAddLog, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        recordDate: moment(datetime).format('DD/MM/YYYY HH:mm:ss'),
        questionnaire: {
          eat_lesser: eatSelection,
          exercised: exerciseSelection,
          alcohol: alcholicSelection,
        },
        _id: id,
        bgReading: Number(bgReading),
      }),
    });
    let responseJson = await response.json();
    console.log('glucoseEditRequest : ' + responseJson.message);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const editWeightLog = async (weight, datetime, id) => {
  try {
    let response = await fetch(weightAddLog, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        weight: weight,
        recordDate: moment(datetime).format('DD/MM/YYYY HH:mm:ss'),
        unit: 'kg',
        _id: id,
      }),
    });
    let responseJson = await response.json();
    console.log('weightAddLogRequest : ' + responseJson);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const editMedicineInLog = async (dosage, pastMed, datetime) => {
  try {
    let response = await fetch(medicationAddLog, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        logs: [
          {
            dosage: Number(dosage),
            recordDate: moment(datetime).format('DD/MM/YYYY HH:mm:ss'),
            unit: pastMed.unit,
            _id: pastMed['_id'],
            drugName: pastMed.medication,
          },
        ],
      }),
    });
    let responseJson = await response.json();
    console.log('medicationAddLogRequest : ' + responseJson);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const deleteBgLog = async (bgId) => {
  try {
    let link = glucoseAddLog + '/' + bgId;
    let response = await fetch(link, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    Alert.alert('Network Error', 'Try Again Later', [{text: 'Got It'}]);
  }
};

const deleteWeightLog = async (weightId) => {
  try {
    let link = weightAddLog + '/' + weightId;
    let response = await fetch(link, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    Alert.alert('Network Error', 'Try Again Later', [{text: 'Got It'}]);
  }
};

const deleteMed = async (medId) => {
  try {
    let link = medicationAddLog + '/' + medId;
    let response = await fetch(link, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    Alert.alert('Network Error', 'Try Again Later', [{text: 'Got It'}]);
  }
};

export {
  getEntry4Day,
  getEntryForDateRange,
  editBgLog,
  editWeightLog,
  editMedicineInLog,
  deleteMed,
  deleteBgLog,
  deleteWeightLog,
};
