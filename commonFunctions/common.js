const morning_key = 'Morning';
const afternoon_key = 'Afternoon';
const evening_key = 'Evening';
const night_key = 'Night';

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

//check if selected object is empty
const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export {getGreetingFromHour, isEmpty, night_key,
  evening_key, afternoon_key, morning_key, getPeriodFromMealType};
