import {getToken} from '../storage/asyncStorageFunctions';
import {profile} from './urls';

const getPatientProfile = async () => {
  try {
    let response = await fetch(profile, {
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
    return 'Error';
  }
};

const editName = async (firstName, lastName) => {
  try {
    let response = await fetch(profile, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        last_name: lastName,
        first_name: firstName,
      }),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    return true;
  } catch (error) {
    return false;
  }
};

const editPhonNum = async (phoneNum, token) => {
  try {
    let response = await fetch(profile, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        contact_number: phoneNum,
      }),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    return true;
  } catch (error) {
    return false;
  }
};

export {getPatientProfile, editName, editPhonNum};
