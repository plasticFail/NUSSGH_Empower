import moment from 'moment';

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
    let hourString = timeString.substring(0, 6).trim().replace(/[:]/, '');
    return Number(hourString);
  }
};

const getDateRange = (value) => {
  let now = new Date();
  let startDate = moment(now).subtract(value, 'days');
  return getDateArray(startDate.toDate(), now);
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

export {getDateObj, getTime, getHour, getDateRange, getNutrientCount};
