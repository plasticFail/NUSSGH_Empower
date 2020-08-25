import React from 'react';
//third party library
import {Calendar} from 'react-native-calendars';

//Props:
//dayComponent: pass a component to render the styling for each day
//setSelectedDates: call back function fired when a date selected, get list of selected dates
//selectedDates: pass in the selected days object to be shaded in the following form
//return object format: {"2020-08-29": {"marked": true, "selected": true}, "2020-08-30" : {"marked": true, "selected": true}}
//allowSelectAll : option to select all
//hideArrow: put true for option to show other months
//headerStyle: either flex-start, center, flex-end (justifyContent)
const CalendarTemplate = (props) => {
  const {
    selectedDates,
    setSelectedDates,
    dayComponent,
    setSelectedString,
    allowSelectAll,
    hideArrows,
  } = props;

  //select and de-select date
  const addSelectedDate = (day) => {
    let dateString = String(day.dateString);
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
        },
      };
      setSelectedDates(newObj);
    }
  };

  const selectAll = () => {
    console.log('hihi');
  };

  return (
    <>
      <Calendar
        dayComponent={dayComponent}
        current={new Date()}
        hideArrows={hideArrows}
        onDayPress={(day) => {
          console.log('Adding selected day', day);
          addSelectedDate(day);
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
