import React, {useState, useEffect} from 'react';
//third party library
import {Calendar} from 'react-native-calendars';
import CalendarDayComponent from './calendarDay';

//Props:
//getDates: call back function fired when a date selected, to get the list of selected dates
const CalendarTemplate = (props) => {
  const [selectedObj, setSelectedObj] = useState({});

  const addSelectedDate = (day) => {
    let dateString = String(day.dateString);
    let newObj = {};
    //check if date is inside, if date is inside - deselect.
    //add a marked date
    if (Object.keys(selectedObj).includes(dateString)) {
      console.log('----deselecting');
      delete selectedObj[dateString];
      //markedDate prop in Calendar is immutable* need do below to show change
      setSelectedObj(JSON.parse(JSON.stringify(selectedObj)));
    } else {
      newObj = {
        ...selectedObj,
        [dateString]: {
          customStyles: {
            container: {
              backgroundColor: '#aad326',
              borderRadius: 2,
            },
            text: {
              color: 'black',
            },
          },
          selected: true,
          marked: true,
          color: 'white',
        },
      };
      setSelectedObj(newObj);
    }
  };

  return (
    <>
      <Calendar
        dayComponent={CalendarDayComponent}
        current={new Date()}
        hideArrows={true}
        onDayPress={(day) => {
          console.log('Adding selected day', day);
          addSelectedDate(day);
        }}
        markedDates={selectedObj}
        markingType={'custom'}
      />
    </>
  );
};

export default CalendarTemplate;
