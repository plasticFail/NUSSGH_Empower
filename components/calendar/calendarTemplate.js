import React, {useEffect} from 'react';
//third party library
import {Calendar} from 'react-native-calendars';
import moment from 'moment';

//Props:
//dayComponent: pass a component to render the styling for each day
//allowSelectAll : option to select all
//hideArrow: put true for option to show other months
//headerStyle: either flex-start, center, flex-end (justifyContent)
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
    headerStyle,
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
          header: headerStyle,
          textDayHeaderFontSize: 15,
          calendarBackground: backgroundColor,
        }}
      />
    </>
  );
};

export default CalendarTemplate;
