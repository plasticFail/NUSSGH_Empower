const morningObj = {
  name: 'Morning',
  start: 4,
  end: 12,
};
const afternoonObj = {
  name: 'Afternoon',
  start: 12,
  end: 18,
};

const eveningObj = {
  name: 'Evening',
  start: 18,
  end: 22,
};

const nightObj = {
  name: 'Night',
  start: 22,
  end: 4,
};

const getGreetingFromHour = (hour) => {
  if (hour > morningObj.start && hour < morningObj.end) {
    return 'Morning';
  } else if (hour >= afternoonObj.start && hour < afternoonObj.end) {
    return 'Afternoon';
  } else if (hour >= eveningObj.start && hour < eveningObj.end) {
    return 'Evening';
  } else {
    return 'Night';
  }
};

//check if selected object is empty
const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export {
  getGreetingFromHour,
  isEmpty,
  morningObj,
  afternoonObj,
  eveningObj,
  nightObj,
};
