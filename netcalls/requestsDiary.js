import {getDiaryEntries} from './urls';
import {getToken} from '../storage/asyncStorageFunctions';

const getEntry4Day = async (dateString) => {
  let link = getDiaryEntries + '?start=' + dateString + '&end=' + dateString;
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
};

const getEntryForDateRange = async (startString, endString) => {
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
};

export {getEntry4Day, getEntryForDateRange};
