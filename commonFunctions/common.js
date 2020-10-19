import Moment from 'moment';
import {getDateRange, getDateObj} from './diaryFunctions';
import {getPatientProfile} from '../netcalls/requestsAccount';

const morning_key = 'Morning';
const afternoon_key = 'Afternoon';
const evening_key = 'Evening';
const night_key = 'Night';

const appointment = 'appointment';
const howTo = 'howto';

const noLog = 'Not logged yet';

const green_color = 'green';
const navy_color = 'navy';

const protein = 'Protein';
const fats = 'Fat';
const carbs = 'Carb';
const cal = 'Cal';

//age range:  more or less 60 , >=30
//female
const maxProtein_F = 62.6;
const maxFat_F_60under = 68;
const maxFat_F_60abv = 62;
const maxCarb_F_60under = 294;
const maxCarb_F_60abv = 264;
const maxCal_F_60under = 2035;
const maxCal_F_60above = 1865;

const maxProtein_M = 76.3;
const maxFat_M_60under = 86;
const maxFat_M_60above = 75;
const maxCarb_M_60under = 377;
const maxCarb_M_60abv = 315;
const maxCal_M_60under = 2590;
const maxCal_M_60above = 2234;

//notification type
const notif_log = 'log';

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
  return Moment(new Date()).add(1, 'day').format('DD/MM/YYYY') + ' 00:00:00';
};

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

//for stepcounter and renderstepcounter
const decimal = 'decimal-pad';
const wholeNumber = 'number-pad';

//for rendering % for nutrient type based on gender and age.
const renderNutrientPercent = async (amount, type) => {
  //check gender, set the max
  let response = await getPatientProfile();
  let patient = response?.patient;
  let gender = patient?.gender;
  let age = getAge(patient.birth_date);

  let max = getMax4Type(age, type, gender);
  return Math.floor((amount / max) * 100);
};

//get the maximum value based on nutrient type
const getMax4Type = (age, type, gender) => {
  if (String(gender) === 'female') {
    if (type === protein) {
      return maxProtein_F;
    }
    if (age >= 60) {
      if (type === fats) {
        return maxFat_F_60abv;
      }
      if (type === carbs) {
        return maxCarb_F_60abv;
      }
      if (type === cal) {
        return maxCal_F_60above;
      }
    } else {
      if (type === fats) {
        return maxFat_M_60under;
      }
      if (type === carbs) {
        return maxCarb_F_60under;
      }
      if (type === cal) {
        return maxCal_F_60under;
      }
    }
  } else {
    if (type === protein) {
      return maxProtein_M;
    }
    if (age >= 60) {
      if (type === fats) {
        return maxFat_M_60above;
      }
      if (type === carbs) {
        return maxCarb_M_60abv;
      }
      if (type === cal) {
        return maxCal_M_60above;
      }
    } else {
      if (type === fats) {
        return maxFat_M_60under;
      }
      if (type === carbs) {
        return maxCarb_M_60under;
      }
      if (type === cal) {
        return maxCal_M_60under;
      }
    }
  }
};

const getAge = (date) => {
  let now = Moment(new Date());
  let dob = Moment(getDateObj(date));
  let diff = now.diff(dob, 'years');
  return diff;
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
  appointment,
  howTo,
  noLog,
  getPeriodFromMealType,
  getLastMinuteFromTodayDate,
  getTodayDate,
  checkLast7Day,
  decimal,
  wholeNumber,
  green_color,
  navy_color,
  protein,
  fats,
  carbs,
  cal,
  renderNutrientPercent,
  maxProtein_F,
  maxFat_F_60under,
  maxFat_F_60abv,
  maxCarb_F_60under,
  maxCarb_F_60abv,
  maxCal_F_60under,
  maxCal_F_60above,
  maxProtein_M,
  maxFat_M_60under,
  maxFat_M_60above,
  maxCarb_M_60under,
  maxCarb_M_60abv,
  maxCal_M_60under,
  maxCal_M_60above,
  getMax4Type,
  getAge,
  notif_log,
};
