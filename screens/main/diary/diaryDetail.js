import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
//component
import Summary from '../../../components/diary/summary';
import {getTime, getHour} from '../../../commonFunctions/diaryFunctions';

//see if class or functional component
class DiaryDetail extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      date: props.route.params.date,
      bgPass: props.route.params.bgPass,
      avgBg: props.route.params.avgBg,
      weightPass: props.route.params.weightPass,

      bgLogs: props.route.params.bgLogs,
      foodLogs: props.route.params.foodLogs,
      medLogs: props.route.params.medLogs,
      activityLogs: props.route.params.activityLogs,
      weightLogs: props.route.params.weightLogs,

      loopArr: [],
      earlyMorningLogs: [],
      morningLogs: [],
      afternoonLogs: [],
      eveningLogs: [],
    };

    //init list of log types to loop through
    this.state.loopArr.push(this.state.bgLogs);
    this.state.loopArr.push(this.state.foodLogs);
    this.state.loopArr.push(this.state.medLogs);
    this.state.loopArr.push(this.state.activityLogs);
    this.state.loopArr.push(this.state.weightLogs);

    //functional component set duplicates in array*
    //set the logs for each time period
    this.filterEarlyMorning();
    this.filterMorning();
    this.filterAfternoon();
    this.filterEvening();
    console.log(this.state.eveningLogs);
  }

  filterEarlyMorning = () => {
    let list = new Array();
    for (var i = 0; i < this.state.loopArr.length; i++) {
      for (var j of this.state.loopArr[i]) {
        let date = j.record_date;
        let hour = getHour(date);
        if (hour < 800) {
          list.push(j);
        }
      }
    }
    this.state.earlyMorningLogs = [...this.state.earlyMorningLogs, list];
  };

  filterMorning = () => {
    let list = new Array();
    for (var i = 0; i < this.state.loopArr.length; i++) {
      for (var j of this.state.loopArr[i]) {
        let date = j.record_date;
        let hour = getHour(date);
        if (hour >= 800 && hour < 1200) {
          list.push(j);
        }
      }
    }
    this.state.morningLogs = [...this.state.morningLogs, list];
  };

  filterAfternoon = () => {
    let list = new Array();
    for (var i = 0; i < this.state.loopArr.length; i++) {
      for (var j of this.state.loopArr[i]) {
        let date = j.record_date;
        let hour = getHour(date);
        if (hour >= 1200 && hour < 1800) {
          list.push(j);
        }
      }
    }
    this.state.afternoonLogs = [...this.state.afternoonLogs, list];
  };

  filterEvening = () => {
    let list = new Array();
    for (var i = 0; i < this.state.loopArr.length; i++) {
      for (var j of this.state.loopArr[i]) {
        let date = j.record_date;
        let hour = getHour(date);
        if (hour >= 1800 && hour < 2400) {
          list.push(j);
        }
      }
    }
    this.state.eveningLogs = [...this.state.eveningLogs, list];
  };

  render() {
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
    } = this.state;
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
        </View>
      </View>
    );
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
