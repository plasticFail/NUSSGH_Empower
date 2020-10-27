import {patientLogin, isTokenValid, caregiverLogin} from './urls';

const patientLoginRequest = async (username, password) => {
  try {
    let response = await fetch(patientLogin, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        remember: true,
        username: username,
        password: password,
      }),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    return responseJson.token;
  } catch (error) {
    console.error(error);
  }
  return null;
};

const isTokenValidRequest = async (token) => {
  try {
    let response = await fetch(isTokenValid, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    return responseJson.token_is_valid;
  } catch (error) {
    console.error(error);
  }
  return false;
};

const caregiverLoginRequest = async (username, password) => {
  try {
    let response = await fetch(caregiverLogin, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        remember: true,
        username: username,
        password: password,
      }),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    return responseJson.token;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export {patientLoginRequest, isTokenValidRequest, caregiverLoginRequest};
