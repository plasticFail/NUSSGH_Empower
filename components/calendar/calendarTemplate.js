import React, {useEffect} from 'react';
//third party library
import {Calendar} from 'react-native-calendars';
import moment from 'moment';

//Props:
//dayComponent: pass a component to render the styling for each day
//setSelectedDates: call back function fired when a date selected, get list of selected dates
//selectedDates: pass in the selected days object to be shaded in the following form
//return object format: {"2020-08-29": {"marked": true, "selected": true}, "2020-08-30" : {"marked": true, "selected": true}}
//allowSelectAll : option to select all
//hideArrow: put true for option to show other months
//headerStyle: either flex-start, center, flex-end (justifyContent)
//calendarStyle: style theme of calendar
const CalendarTemplate = (props) => {
  const {
    selectedDates,
    setSelectedDates,
    dayComponent,
    allowSelectAll,
    hideArrows,
  } = props;

  const {selectedMedicine} = props;

  //select and de-select date
  const addSelectedDate = (dateString) => {
    let newObj = {};
    //check if date is inside, if date is inside - deselect.
    if (Object.keys(selectedDates).includes(dateString)) {
      console.log('----deselecting');
      delete selectedDates[dateString];
      //markedDate prop in Calendar is immutable* need do below to show change
      setSelectedDates(JSON.parse(JSON.stringify(selectedDates)));
    } else {
      newObj = {
        ...selectedDates,
        [dateString]: {
          selected: true,
          marked: true,
          medicationList: [],
        },
      };
      addMedication(newObj, dateString);
      setSelectedDates(newObj);
    }
  };

  //add the medication to the medication array in datestring key of object*
  const addMedication = (object, dateString) => {
    let arr = object[dateString].medicationList;
    arr.push(selectedMedicine);
  };

  const selectAll = () => {
    console.log('Selecting all dates');
    let currentMonth = moment(new Date()).format('YYYY-MM');
    let daysInMonth = moment(currentMonth, 'YYYY-MM').daysInMonth();
    let newObj = {};
    setSelectedDates({});
    for (i = 1; i <= daysInMonth; i++) {
      let stringDate = '';
      if (i < 10) {
        stringDate = currentMonth + '-0' + i;
      } else {
        stringDate = currentMonth + '-' + i;
      }
      newObj = {
        ...newObj,
        [stringDate]: {
          selected: true,
          marked: true,
          medicationList: [],
        },
      };
      addMedication(newObj, stringDate);
    }
    setSelectedDates(newObj);
  };

  return (
    <>
      <Calendar
        dayComponent={dayComponent}
        current={new Date()}
        hideArrows={hideArrows}
        onDayPress={(day) => {
          console.log('Adding selected day', day);
          addSelectedDate(day.dateString);
        }}
        markedDates={selectedDates}
        markingType={'custom'}
        selectAll={allowSelectAll}
        setSelectAll={selectAll}
        theme={{
          header: 'flex-start',
        }}
      />
    </>
  );
};

export default CalendarTemplate;
