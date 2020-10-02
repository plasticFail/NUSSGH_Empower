import moment from 'moment';
import {getDateObj} from './diaryFunctions';

const bg = 'blood_glucose';
const food = 'food';
const med = 'medication';
const weight = 'weight';
const activity = 'activity';
const steps = 'steps';
const bgpost = 'blood-glucose';

const frequencyOption = [
  {name: 'Daily', value: 'daily'},
  {name: 'Weekly', value: 'weekly'},
  {name: 'Monthly', value: 'monthly'},
  {name: 'One-Off', value: 'one-off'},
];

const weeklyGoalList = [
  {name: 'Lose 0.2 kg per week', value: -0.2},
  {name: 'Lose 0.5 kg per week ', value: -0.5},
  {name: 'Lose 0.8 kg per week', value: -0.8},
  {name: 'Lose 1 kg per week', value: -1},
  {name: 'Maintain Weight', value: 0},
  {name: 'Gain 0.2 kg per week', value: 0.2},
  {name: 'Gain 0.5 kg per week', value: 0.5},
];

const checkSpecialChara = (input) => {
  let toCheck = String(input);
  if (
    toCheck.match(/^[0-9]+(\.[0-9]{1,2})?$/g) &&
    !toCheck.includes(',') &&
    !toCheck.includes('-')
  ) {
    return true;
  }
  return false;
};

const renderGoalTypeName = (type) => {
  switch (type) {
    case bg:
      return 'Blood Glucose Goal';
    case food:
      return 'Food Goal';
    case med:
      return 'Medication Goal';
    case weight:
      return 'Weight Goal';
    case activity:
      return 'Activity Goal';
    case steps:
      return 'Step Goal';
  }
};

const getNumofGoals = (arr) => {
  let count = 0;
  for (var x of Object.keys(arr)) {
    let typeArray = arr[x].goals;
    count += typeArray.length;
  }
  console.log('num of goals retrieved :' + count);
  return count;
};

const isMonday = () => {
  let dayOfWeek = moment(new Date()).weekday();
  if (dayOfWeek === 1) {
    return true;
  } else {
    return false;
  }
};

//if today date === expire date, goal has not ended
const goalEnded = (dateString) => {
  let endDate = moment(getDateObj(dateString))
    .startOf('day')
    .subtract(1, 'day');
  let today = moment(new Date()).startOf('day');
  if (today.isAfter(endDate)) {
    return true;
  } else {
    return false;
  }
};

//when at edit page, to reinitalise the field
const getFrequency = (value) => {
  for (var x of frequencyOption) {
    if (x.value === value) {
      return x;
    }
  }
};

const getWeeklyObj = (value) => {
  for (var x of weeklyGoalList) {
    if (x.value === value) {
      return x;
    }
  }
};

const getGoalObjById = (id, arr) => {
  for (var x of Object.keys(arr)) {
    let typeArray = arr[x].goals;
    for (var y of typeArray) {
      if (y._id === id) {
        return y;
      }
    }
  }
};

export {
  bg,
  bgpost,
  food,
  med,
  weight,
  activity,
  steps,
  frequencyOption,
  weeklyGoalList,
  renderGoalTypeName,
  getNumofGoals,
  isMonday,
  goalEnded,
  getFrequency,
  getWeeklyObj,
  getGoalObjById,
  checkSpecialChara,
};
