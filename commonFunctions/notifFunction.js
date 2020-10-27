import {afternoonObj, eveningObj} from './common';

const getLogIncompleteText = (morningNotDone, afternoonNotDone, hour) => {
  let string = '';
  let morningLength =
    morningNotDone?.length === null ? 0 : morningNotDone?.length;
  let afternoonLength =
    afternoonNotDone?.length === null ? 0 : afternoonNotDone?.length;
  //prepare message
  if (hour === afternoonObj.name && morningLength > 0) {
    string = morningLength + ' in Morning';
  }
  if (hour === eveningObj.name && afternoonLength > 0 && morningLength > 0) {
    string =
      morningLength + ' in Morning & ' + afternoonLength + ' in Afternoon';
  } else {
    if (morningLength === 0 && afternoonLength > 0) {
      string = afternoonLength + ' in Afternoon.';
    } else if (afternoonLength == 0 && morningLength > 0) {
      string = morningLength + ' in Morning';
    }
  }
  return string;
};

export default getLogIncompleteText;
