import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
//component
import Summary from '../../../components/diary/summary';
import {getTime, getHour} from '../../../commonFunctions/diaryFunctions';

//see if class or functional component
const DiaryDetail = (props) => {
  const {
    date,
    bgPass,
    avgBg,
    weightPass,
    bgLogs,
    foodLogs,
    medLogs,
    activityLogs,
    weightLogs,
  } = props.route.params;

  const [earlyMorningLogs, setEarlyMorningLogs] = useState([]);
  const [morningLogs, setMorningLogs] = useState([]);
  const [afternoonLogs, setAfternoonLogs] = useState([]);
  const [eveningLogs, setEveningLogs] = useState([]);

  console.log('in diary detail');

  return (
    <View style={styles.screen}>
      <Text style={styles.summaryText}>Summary: </Text>
      <View style={{padding: '2%'}}>
        <Summary
          date={date}
          bgPass={bgPass}
          avgBg={avgBg}
          weightPass={weightPass}
          bgLogs={bgLogs}
          foodLogs={foodLogs}
          medLogs={medLogs}
          activityLogs={activityLogs}
          weightLogs={weightLogs}
        />
        {renderLogs(
          bgLogs,
          foodLogs,
          medLogs,
          activityLogs,
          weightLogs,
          setEarlyMorningLogs,
        )}
      </View>
    </View>
  );
};

function renderLogs(bgLogs, foodLogs, medLogs, activityLogs, weightLogs) {
  //group the logs together
  addToArray(bgLogs);
}

function addToArray(listToLoop, setEarlyMorningLog) {
  let earlyMorningList = new Array();
  let morningList = new Array();
  let afternoonList = new Array();
  let eveningList = new Array();
  for (var x of listToLoop) {
    let date = x.record_date;
    let hour = getHour(date);
    if (hour < 800) {
      earlyMorningList.push(x);
    } else if (hour < 1200) {
      morningList.push(x);
    } else if (hour < 1800) {
      afternoonList.push(x);
    } else {
      eveningList.push(x);
    }
  }
}

export default DiaryDetail;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    width: '100%',
  },
  summaryText: {
    fontSize: 20,
    margin: '2%',
    color: '#47685A',
    fontWeight: '700',
  },
});
