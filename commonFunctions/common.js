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

export {getGreetingFromHour};
