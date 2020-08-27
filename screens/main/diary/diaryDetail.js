import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
//component
import Summary from '../../../components/diary/summary';
import TimeSection from '../../../components/diary/timeSection';
//functions
import {getHour} from '../../../commonFunctions/diaryFunctions';
import ActivitySummary from '../../../components/diary/activitySummary';

class DiaryDetail extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      loopArr: [],
      earlyMorningLogs: [],
      morningLogs: [],
      afternoonLogs: [],
      eveningLogs: [],
    };

    //init list of logs to loop through
    this.state.loopArr.push(this.props.route.params.bgLogs);
    this.state.loopArr.push(this.props.route.params.foodLogs);
    this.state.loopArr.push(this.props.route.params.medLogs);
    this.state.loopArr.push(this.props.route.params.activityLogs);
    this.state.loopArr.push(this.props.route.params.weightLogs);

    //functional component set duplicates in array*
    //set the logs for each time period
    this.filterEarlyMorning();
    this.filterMorning();
    this.filterAfternoon();
    this.filterEvening();

    console.disableYellowBox = true;
    console.ignoredYellowBox = ['ref.measureLayout'];
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
      bgPass,
      bgMiss,
      avgBg,
      weightMiss,
      weightPassCount,
      weightFailCount,
      activityMiss,
      activityPassCount,
      activityFailCount,
      activitySummary,
      foodMiss,
      carbs,
      protein,
      fats,
      foodPassCount,
      foodFailCount,
    } = this.props.route.params;
    return (
      <View style={styles.screen}>
        <Text style={styles.summaryText}>Overall Summary: </Text>
        <Summary
          bgPass={bgPass}
          bgMiss={bgMiss}
          avgBg={avgBg}
          weightMiss={weightMiss}
          weightPassCount={weightPassCount}
          weightFailCount={weightFailCount}
          activityMiss={activityMiss}
          activityPassCount={activityPassCount}
          activityFailCount={activityFailCount}
          foodMiss={foodMiss}
          carbs={carbs}
          protein={protein}
          fats={fats}
          foodPassCount={foodPassCount}
          foodFailCount={foodFailCount}
          activitySummary={activitySummary}
        />
        {activitySummary != undefined && (
          <>
            <Text style={styles.summaryText}>Activity Summary: </Text>
            <ActivitySummary activitySummary={activitySummary} />
          </>
        )}

        <FlatList
          listKey={(item, index) => index.toString()}
          ListEmptyComponent={
            <>
              <TimeSection data={this.state.earlyMorningLogs} />
              <TimeSection data={this.state.morningLogs} />
              <TimeSection data={this.state.afternoonLogs} />
              <TimeSection data={this.state.eveningLogs} />
            </>
          }
        />
      </View>
    );
  }
}

export default DiaryDetail;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    width: '100%',
    flex: 1,
    height: Dimensions.get('window').height,
    padding: '2%',
  },
  summaryText: {
    fontSize: 20,
    margin: '2%',
    color: '#47685A',
    fontWeight: '700',
  },
});
