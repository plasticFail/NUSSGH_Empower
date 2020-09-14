const getGreetingFromHour = (hour) => {
  if (hour > 4 && hour < 12) {
    return 'Morning';
  } else if (hour >= 12 && hour < 18) {
    return 'Afternoon';
  } else if (hour >= 18 && hour < 22) {
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

export {getGreetingFromHour, isEmpty};
