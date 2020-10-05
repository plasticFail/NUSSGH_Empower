import {Alert} from 'react-native';
import {
  getMedication4DateRange,
  postPlan,
  prepareData,
  deleteMedPlan,
} from '../netcalls/requestsMedPlan';

const daily = 'Daily';
const dow = 'Days of the Week';

const periodList = [daily, dow];

const dayList = [
  {
    name: 'Monday',
    value: 0,
    selected: false,
  },
  {
    name: 'Tuesday',
    value: 1,
    selected: false,
  },
  {
    name: 'Wednesday',
    value: 2,
    selected: false,
  },
  {
    name: 'Thursday',
    value: 3,
    selected: false,
  },
  {
    name: 'Friday',
    value: 4,
    selected: false,
  },
  {
    name: 'Saturday',
    value: 5,
    selected: false,
  },
  {
    name: 'Sunday',
    value: 6,
    selected: false,
  },
];

export {periodList, dayList, daily, dow};
