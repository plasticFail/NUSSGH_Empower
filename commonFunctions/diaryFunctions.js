import moment from 'moment';

const getDateObj = (dateString) => {
  let dateMomentObject = moment(dateString, 'DD/MM/YYYY HH:mm:ss');
  let dateObject = dateMomentObject.toDate();

  return dateObject;
};

const getTime = (dateString) => {
  let time = dateString.substring(
    dateString.indexOf('2020') + 4,
    dateString.length - 3,
  );
  return time;
};

const getHour = (dateString) => {
  let timeString = getTime(dateString);
  let hourString = timeString.substring(0, 6).trim().replace(/[:]/, '');
  return Number(hourString);
};

export {getDateObj, getTime, getHour};
