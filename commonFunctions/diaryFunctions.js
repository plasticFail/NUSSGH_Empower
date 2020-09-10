import moment from 'moment';
import {morningObj, afternoonObj, eveningObj} from './common';

const getDateObj = (dateString) => {
  let dateMomentObject = moment(dateString, 'DD/MM/YYYY HH:mm:ss');
  let dateObject = dateMomentObject.toDate();

  return dateObject;
};

const getTime = (dateString) => {
  if (dateString != null) {
    let time = dateString.substring(
      dateString.indexOf('2020') + 4,
      dateString.length - 3,
    );
    return time;
  }
};

const getHour = (dateString) => {
  if (dateString != null) {
    let timeString = getTime(dateString);
    let hourString = timeString.substring(0, 4).trim().replace(/[:]/, '');
    return Number(hourString);
  }
};

const getDateRange = (value, fromDate) => {
  let startDate = moment(fromDate).subtract(value, 'days');
  return getDateArray(startDate.toDate(), fromDate);
};

const getDateArray = (startDate, stopDate) => {
  let dateArr = new Array();
  let current = moment(startDate);
  let stop = moment(stopDate);
  while (current <= stop) {
    dateArr.push(moment(current).format('YYYY-MM-DD'));
    current = moment(current).add(1, 'days');
  }

  return dateArr;
};

//pass a food item - beverage, main etc in to get [carbs, protein, fats] count
const getNutrientCount = (array) => {
  let nutrientArr = new Array();
  let totalCarbs = 0;
  let totalProtein = 0;
  let totalFats = 0;
  if (array.length != 0) {
    for (var a of array) {
      if (a != null) {
        let carbsAmount = a?.nutrients.carbohydrate.amount;
        let proteinAmount = a?.nutrients.protein.amount;
        let fatAmount = a?.nutrients['total-fat']?.amount;
        if (carbsAmount != 'N.A') {
          totalCarbs += Number(carbsAmount);
        }
        if (proteinAmount != 'N.A') {
          totalProtein += Number(proteinAmount);
        }
        if (fatAmount != 'N.A') {
          totalFats += Number(fatAmount);
        }
      }
    }
  }
  nutrientArr.push(totalCarbs);
  nutrientArr.push(totalProtein);
  nutrientArr.push(totalFats);
  return nutrientArr;
};

const filterMorning = (logs) => {
  let list = new Array();
  for (var i of logs) {
    let date = i.record_date;
    let hour = getHour(date);
    if (hour >= morningObj.start && hour < morningObj.end) {
      list.push(i);
    }
  }
  return list;
};

const filterAfternoon = (logs) => {
  let list = new Array();
  for (var i of logs) {
    let date = i.record_date;
    let hour = getHour(date);
    if (hour >= afternoonObj.start && hour < afternoonObj.end) {
      list.push(i);
    }
  }
  return list;
};

const filterEvening = (logs) => {
  let list = new Array();
  for (var i of logs) {
    let date = i.record_date;
    let hour = getHour(date);
    if (hour >= eveningObj.start && hour < eveningObj.end) {
      list.push(i);
    }
  }
  return list;
};

//determine if edit button will show
const showEdit = (dateToCompare) => {
  let today = moment(new Date()).format('DD/MM/YYYY');
  let formatedDate = String(dateToCompare).substring(
    0,
    String(dateToCompare).indexOf('2020') + 4,
  );
  if (String(today) === String(formatedDate)) {
    return true;
  } else {
    return false;
  }
};

const getMissedArr = (morningLog, afternoonLog, eveningLog) => {
  let list = [];
  console.log(morningLog);
  if (morningLog.length === 0) {
    list.push(morningObj.name);
  }
  if (afternoonLog.length === 0) {
    list.push(afternoonObj.name);
  }
  if (eveningLog.length === 0) {
    list.push(eveningObj.name);
  }

  return list;
};

export {
  getDateObj,
  getTime,
  getHour,
  getDateRange,
  getNutrientCount,
  filterMorning,
  filterAfternoon,
  filterEvening,
  showEdit,
  getMissedArr,
};
