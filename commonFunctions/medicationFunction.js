const daily = 'Daily';
const dow = 'Days of the Week';
const onboardAdd = 'onboard_add';
const onboardEdit = 'onboard_edit';
const med_planAdd = 'medicationPlanAdd'; //used in medication.js
const med_planEdit = 'medicationPlanEdit';
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

//see which date is selected
const getSelectedCount = (arr) => {
  let count = 0;
  if (arr != undefined) {
    for (var x of arr) {
      if (x?.selected) {
        count++;
      }
    }
  }

  return count;
};

const resetDayList = () => {
  return dayList.slice();
};

const checkMedExistInArr = (arr, med2Check) => {
  for (var x of arr) {
    if (x.medication === med2Check.medication) {
      return true;
    }
  }
  return false;
};

//edit the med in existing med list
const editMed = (med2Edit, newMed, existingList) => {
  console.log(newMed);
  let index = existingList.findIndex(
    (element) => element.medication === med2Edit.medication,
  );
  let newArr = [...existingList];
  newArr[index] = {
    ...newArr[index],
    days: newMed.days,
    dosage: newMed.dosage,
    per_day: newMed.per_day,
  };
  return newArr;
};

export {
  periodList,
  dayList,
  daily,
  dow,
  onboardAdd,
  onboardEdit,
  getSelectedCount,
  resetDayList,
  checkMedExistInArr,
  editMed,
  med_planAdd,
  med_planEdit,
};
