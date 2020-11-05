import {searchCaregiver, assignCaregiver, getCaregiver} from './urls';
import {getToken} from '../storage/asyncStorageFunctions';

const search4Caregiver = async (phonenum) => {
  let link = searchCaregiver + '/' + phonenum;
  try {
    let response = await fetch(link, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + (await getToken()),
        'Content-type': 'application/json',
      },
    });
    let responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  } catch (error) {
    console.error(error);
  }
  return null;
};

const assignCaregiver2Patient = async (caregiverUsername) => {
  let link = assignCaregiver + '/' + caregiverUsername;
  try {
    let response = await fetch(link, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + (await getToken()),
        'Content-type': 'application/json',
      },
    });
    let responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  } catch (error) {
    console.error(error);
  }
  return null;
};

const getMyCaregiver = async () => {
  try {
    let response = await fetch(getCaregiver, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + (await getToken()),
        'Content-type': 'application/json',
      },
    });
    let responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export {search4Caregiver, assignCaregiver2Patient, getMyCaregiver};
