import {getDiaryEntries} from './urls';
import {getToken} from '../storage/asyncStorageFunctions';
import moment from 'moment';

const getEntry4Day = async (dateString) => {
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
