import {afternoonObj, eveningObj, getGreetingFromHour} from './common';

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

const getParticularLogTypeIncompleteText = (
  morningNotDone,
  afternoonNotDone,
  type,
) => {
  let string = type + ' missed in the';
  let morn = morningNotDone.indexOf(type);
  let noon = afternoonNotDone.indexOf(type);
  let g = getGreetingFromHour(new Date().getHours());

  if (morn > -1 && noon > -1 && g === eveningObj.name) {
    string += ' in the Morning and Afternoon';
  } else if (noon > -1 && g === eveningObj.name) {
    string += ' in the Afternoon';
  } else if (
    (morn > -1 && g === afternoonObj.name) ||
    (morn > -1 && g === eveningObj.name)
  ) {
    string += ' in the Morning';
  } else {
    string = '';
  }

  return string;
};

export {getLogIncompleteText, getParticularLogTypeIncompleteText};
