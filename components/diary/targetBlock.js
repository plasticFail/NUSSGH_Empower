import React, {Component} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
//function
import {useNavigation} from '@react-navigation/native';
import {getEntry4Day} from '../../netcalls/requestsDiary';

class TargetBlock extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      avgBg: 0,
      bgLogs: [],
      targetBg: {},
      bgPass: false,
      foodLogs: [],
      medLogs: [],
      activityLogs: [],
      weightLogs: [],
      weightPass: false,
    };
    //if functional component -> states not updated correctly with hook
    //useEffect updates after render*
    getEntry4Day(String(this.props.date)).then((data) => {
      let d = data[this.props.date];
      this.setState({
        //set logs
        bgLogs: d.glucose.logs,
        foodLogs: d.food.logs,
        medLogs: d.medication.logs,
        weightLogs: d.weight.logs,
        activityLogs: d.activity.logs,

        //set target
        targetBg: d.glucose.target,
      });
      this.getAllResult();
      this.handleOnPress = this.handleOnPress.bind(this);
    });
  }

  getAllResult = () => {
    this.getBGResult();
    this.getWeightResult();
  };

  getBGResult = () => {
    var total = 0;
    var count = 0;
    for (var x of this.state.bgLogs) {
      total += x.bg_reading;
      count++;
    }
    let avg = (total / count).toFixed(2);
    this.setState({avgBg: avg});
    if (this.state.targetBg.comparator === '<=') {
      if (avg <= this.state.targetBg.value) {
        this.setState({bgPass: true});
      } else {
        this.setState({bgPass: false});
      }
    }
  };

  getWeightResult = () => {
    if (this.state.weightLogs.length != 0) {
      this.setState({weightPass: true});
    } else {
      this.setState({weightPass: false});
    }
  };

  handleOnPress = () => {
    this.props.navigation.navigate('DiaryDetail', {
      date: this.props.date,
      bgPass: this.state.bgPass,
      avgBg: this.state.avgBg,
      weightPass: this.state.weightPass,
      bgLogs: this.state.bgLogs,
      foodLogs: this.state.foodLogs,
      medLogs: this.state.medLogs,
      activityLogs: this.state.activityLogs,
      weightLogs: this.state.weightLogs,
    });
  };

  render() {
    const {date, navigation} = this.props;
    return (
      <View>
        <Text
          style={[styles.diaryDate, {width: Dimensions.get('window').width}]}>
          {date}
        </Text>
        <TouchableOpacity onPress={this.handleOnPress}>
          <View style={styles.diaryContent}>
            <View style={styles.diaryContent1}>
              <Text style={[styles.diaryContentHeader, {color: '#7d9a22'}]}>
                Within Targets{' '}
              </Text>
            </View>
            <View style={styles.diaryContent2}>
              <Text style={[styles.diaryContentHeader, {color: 'black'}]}>
                Missed
              </Text>
            </View>
            <View style={styles.diaryContent3}>
              <Text style={[styles.diaryContentHeader, {color: '#9a228a'}]}>
                Improve
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default TargetBlock;

const styles = StyleSheet.create({
  diaryDate: {
    flex: 1,
    fontSize: 18,
    marginTop: '2%',
    backgroundColor: '#f5f5f5',
    fontWeight: '700',
  },
  diaryContent: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 25,
    margin: '2%',
  },
  diaryContent1: {
    flex: 1,
    height: '100%',
    backgroundColor: '#e8fee4',
  },
  diaryContent2: {
    flex: 1,
    height: '100%',
    backgroundColor: '#cecece',
  },
  diaryContent3: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fae6e6',
  },
  diaryContentHeader: {
    marginTop: '4%',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
});
