import Moment from 'moment';

const morning_key = 'Morning';
const afternoon_key = 'Afternoon';
const evening_key = 'Evening';
const night_key = 'Night';

const morningObj = {
  name: 'Morning',
  start: 5,
  end: 12,
};
const afternoonObj = {
  name: 'Afternoon',
  start: 12,
  end: 17,
};

const eveningObj = {
  name: 'Evening',
  start: 17,
  end: 5,
};

const getGreetingFromHour = (hour) => {
  if (hour > morningObj.start && hour < morningObj.end) {
    return morningObj.name;
  } else if (hour >= afternoonObj.start && hour < afternoonObj.end) {
    return afternoonObj.name;
  } else {
    return eveningObj.name;

const getGreetingFromHour = (hour) => {
  if (hour > 4 && hour < 12) {
    return morning_key;
  } else if (hour >= 12 && hour < 18) {
    return afternoon_key;
  } else if (hour >= 18 && hour < 22) {
    return evening_key;
  } else {
    return night_key;
  }
};

const getPeriodFromMealType = (mealType) => {
  switch (mealType) {
    case 'breakfast':
      return morning_key;
    case 'lunch':
      return afternoon_key;
    case 'dinner':
      return evening_key;
    case 'supper':
      return night_key;
    case 'snack':
      return null;
  }
}

const getTodayDate = () => {
  return Moment(new Date()).format("DD/MM/YYYY") + " 00:00:00";
}

const getLastMinuteFromTodayDate = () => {
  return Moment(new Date()).format("DD/MM/YYYY") + " 23:59:30";
}

//check if selected object is empty
const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export {getGreetingFromHour, isEmpty, morningObj, afternoonObj, eveningObj, night_key,
  evening_key, afternoon_key, morning_key, getPeriodFromMealType, getLastMinuteFromTodayDate, getTodayDate};

