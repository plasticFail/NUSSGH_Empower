//comment
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

//check if selected object is empty
const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export {getGreetingFromHour, isEmpty, morningObj, afternoonObj, eveningObj};
