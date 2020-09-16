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

export {
  getEntry4Day,
  getEntryForDateRange,
  deleteMed,
  deleteBgLog,
  deleteWeightLog,
};
