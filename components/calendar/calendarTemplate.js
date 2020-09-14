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
//monthChange: boolean true false
//addSelectedDate: call back function to act on get selected date string
//selectAll: callback function to act on all dates selected for the month*
const CalendarTemplate = (props) => {
  const {
    dayComponent,
    allowSelectAll,
    hideArrows,
    monthChange,
    selectedDates41,
    backgroundColor,
  } = props;
  const {addSelectedDate, selectAll} = props;
  return (
    <>
      <Calendar
        dayComponent={dayComponent}
        current={new Date()}
        hideArrows={hideArrows}
        disableMonthChange={monthChange}
        onDayPress={(day) => {
          console.log('Adding selected day', day);
          addSelectedDate(day.dateString);
        }}
        markedDates={selectedDates41}
        markingType={'custom'}
        selectAll={allowSelectAll}
        setSelectAll={selectAll}
        theme={{
          header: 'flex-start',
          textDayHeaderFontSize: 15,
          calendarBackground: backgroundColor,
        }}
      />
    </>
  );
};

export default CalendarTemplate;
