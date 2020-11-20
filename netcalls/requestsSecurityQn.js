import {getToken} from '../storage/asyncStorageFunctions';

const {get_authSecurityQn} = require('./urls');

const getQuestions = async () => {
  try {
    let response = await fetch(get_authSecurityQn, {
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

export {getQuestions};
