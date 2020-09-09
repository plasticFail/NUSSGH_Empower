import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
//component
import MenuBtn from '../../../components/menuBtn';
import TargetBlock from '../../../components/diary/targetBlock';
//functions
import {getDateRange} from '../../../commonFunctions/diaryFunctions';
//style
import globalStyles from '../../../styles/globalStyles';
import {Colors} from '../../../styles/colors';
//third party lib
import Moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

const DiaryScreen = (props) => {
  const today_date = Moment(new Date()).format('YYYY-MM-DD');

  const [dates, setDates] = useState([]);
  const [partialVisible, setPartialVisible] = useState(true); //show 7days
  const [showCalendarFull, setShowCalendarFull] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today_date);

  //set useeffect to render this week*
  useEffect(() => {
    setDates(getDateRange(6));
  }, []);

  //select date and show the log summary
  chooseDate = (item) => {
    setSelectedDate(item);
  };

  displayCalendar = () => {
    setShowCalendarFull(!showCalendarFull);
    setPartialVisible(!partialVisible);
  };

  return (
    <View style={globalStyles.pageContainer}>
      <MenuBtn />
      <ScrollView contentContainerStyle={{flexGrow: 0}}>
        <>
          <Text style={globalStyles.pageHeader}>Diary</Text>
          {showCalendarFull && <Text>Show Calendar Here</Text>}
          {partialVisible && (
            <View style={styles.dateList}>
              {dates.map((item, index) =>
                selectedDate === item ? (
                  <TouchableOpacity
                    key={item}
                    style={styles.selectedDateContainer}
                    onPress={() => chooseDate(item)}>
                    <Text style={styles.selectedDateText}>
                      {Moment(new Date(item)).format('D MMM')}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    key={item}
                    style={styles.dateContainer}
                    onPress={() => chooseDate(item)}>
                    <Text style={styles.dateText}>
                      {Moment(new Date(item)).format('D MMM')}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </View>
          )}
          <TouchableOpacity onPress={() => displayCalendar()}>
            {showCalendarFull ? (
              <Icon
                name="angle-double-up"
                size={40}
                style={styles.chevronDown}
              />
            ) : (
              <Icon
                name="angle-double-down"
                size={40}
                style={styles.chevronDown}
              />
            )}
          </TouchableOpacity>
          {/*Day Summary for Log*/}
          <Text style={[globalStyles.pageDetails, styles.viewLog]}>
            View Your Logs
          </Text>
          <TargetBlock date={selectedDate} navigation={props.navigation} />
        </>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dateList: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: '2%',
    justifyContent: 'space-around',
    marginStart: '2%',
  },
  dateText: {
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'SFProDisplay-Regular',
  },
  selectedDateText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'SFProDisplay-Bold',
  },
  dateContainer: {
    backgroundColor: '#e2e8ee',
    width: '12%',
    marginStart: '2%',
    paddingTop: '5%',
    paddingBottom: '5%',
    paddingHorizontal: '1%',
    borderRadius: 9.5,
  },
  selectedDateContainer: {
    backgroundColor: '#aad326',
    width: '12%',
    marginStart: '2%',
    paddingTop: '5%',
    paddingBottom: '5%',
    paddingHorizontal: '1%',
    borderRadius: 9.5,
  },
  viewLog: {
    fontSize: 23,
    color: Colors.lastLogValueColor,
  },
  chevronDown: {
    color: Colors.backArrowColor,
    alignSelf: 'center',
  },
});

export default DiaryScreen;
