import {getToken} from '../../../storage/asyncStorageFunctions';
import AsyncStorage from '@react-native-community/async-storage';

const uploadBGLog = async (bgReading, date) => {
  const url = 'https://sghempower.com/log/glucose/add-log';
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        bgReading: bgReading,
        recordDate: date,
      }),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const storeMedications = async () => {
  const url = 'https://sghempower.com/log/medication/list';
  try {
    let response = await fetch(url, {
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
    return false;
  }
};

const uploadMedicationLog = async (data) => {
  const url = 'https://sghempower.com/log/medication/add-log';
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        logs: data,
      }),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const uploadWeightLog = async (weight, date) => {
  const url = 'https://sghempower.com/log/weight/add-log';
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        weight: weight,
        recordDate: date,
        unit: 'kg',
      }),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export {uploadBGLog, storeMedications, uploadMedicationLog, uploadWeightLog};
