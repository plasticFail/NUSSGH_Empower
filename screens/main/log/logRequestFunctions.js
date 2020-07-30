import {getToken} from '../../../storage/asyncStorageFunctions';

const uploadBGLog = async (bgReading, date) => {
  const url = 'https://sghempower.com/log/glucose/add-log';
  console.log(date);
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + getToken(),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        bgReading: bgReading,
        recordDate: date,
      }),
    });
    let responseJson = await response.json();

    if (responseJson.token != null) {
      console.log('Auth Success');
      return true;
    }
    console.log(responseJson);
  } catch (error) {
    console.error(error);
    return false;
  }
};

export {uploadBGLog};
