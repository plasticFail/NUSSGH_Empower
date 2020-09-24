import Moment from 'moment';
import {getDateRange, getDateObj} from './diaryFunctions';

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
};

const getTodayDate = () => {
  return Moment(new Date()).format('DD/MM/YYYY') + ' 00:00:00';
};

const getLastMinuteFromTodayDate = () => {
  return Moment(new Date()).add(1, "day").format("DD/MM/YYYY") + " 00:00:00";
}


//check if selected object is empty
const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

//check against storage made whether data is made in last 7 days
const checkLast7Day = (data) => {
  if (data == null) {
    return false;
  }
  let arr = getDateRange(7, new Date());
  let lastDate = String(convertDatestring(data.date));

  if (arr.includes(lastDate)) {
    return true;
  }

  return false;
};

//convert date with - to /
const convertDatestring = (date) => {
  let newDate = String(date).split('/').join('-');
  return newDate;
};

export {
  getGreetingFromHour,
  isEmpty,
  morningObj,
  afternoonObj,
  eveningObj,
  night_key,
  evening_key,
  afternoon_key,
  morning_key,
  getPeriodFromMealType,
  getLastMinuteFromTodayDate,
  getTodayDate,
  checkLast7Day,
};
