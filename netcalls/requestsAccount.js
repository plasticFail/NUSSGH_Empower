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

export {getPatientProfile};
