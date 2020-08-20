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

  return dateArr.reverse();
};

export {getDateObj, getTime, getHour, getDateRange};
