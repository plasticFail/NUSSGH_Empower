import React, {Component} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
//function
import {useNavigation} from '@react-navigation/native';
import {getEntry4Day} from '../../netcalls/requestsDiary';
import TargetContent from './targetContent';
import {min} from 'react-native-reanimated';
import {getNutrientCount} from '../../commonFunctions/diaryFunctions';

const within_target = 'Within Target';
const missed = 'Missed';
const improved = 'Improve';
const maxWeight = 200;
const minWeight = 40;
const maxCarbs = 130;
const maxProtein = 46;
const maxFats = 46;

//mainly do the calculation for the result of the logs to display
class TargetBlock extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      avgBg: 0,
      bgLogs: [],
      targetBg: {},
      foodLogs: [],
      medLogs: [],
      activityLogs: [],
      weightLogs: [],

      bgPass: false,
      bgPassCount: 0,
      bgMiss: false,
      bgFailCount: 0,

      foodPass: false,
      foodPassCount: 0,
      foodMiss: false,
      foodFailCount: 0,
      carbs: 0,
      fats: 0,
      protein: 0,

      weightPassCount: 0,
      weightMiss: false,
      weightFailCount: 0,

      activityPassCount: 0,
      activityMiss: false,
      activityFailCount: 0,
    };

    this.init(); // for first time*

    this.props.navigation.addListener('focus', () => {
      this.init();
    });
  }

  init = () => {
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
  };

  getAllResult = () => {
    this.getBGResult();
    this.getWeightResult();
    this.getActivityResult();
    this.getFoodResult();
  };

  getBGResult = () => {
    let total = 0;
    let count = 0;
    let passCount = 0;
    let length = this.state.bgLogs.length;
    if (length != 0) {
      for (var x of this.state.bgLogs) {
        //get counts of bg pass
        if (this.state.targetBg.comparator === '<=') {
          if (x.bg_reading <= this.state.targetBg.value) {
            passCount++;
          }
        }
        //calculate average
        total += x.bg_reading;
        count++;
      }
      let avg = (total / count).toFixed(2);

      //set states
      this.setState({avgBg: avg});
      this.setState({bgPassCount: passCount});
      this.setState({bgFailCount: length - passCount});

      if (this.state.targetBg.comparator === '<=') {
        if (avg <= this.state.targetBg.value) {
          this.setState({bgPass: true});
        } else {
          this.setState({bgPass: false});
        }
      } else if (this.state.targetBg.comparator === '>=') {
        if (avg >= this.state.targetBg.value) {
          this.setState({bgPass: true});
        } else {
          this.setState({bgPass: false});
        }
      }
    } else {
      this.setState({bgMiss: true});
    }
  };

  getWeightResult = () => {
    if (this.state.weightLogs.length != 0) {
      let passCount = 0;

      for (var x of this.state.weightLogs) {
        if (x.weight >= minWeight && x.weight <= maxWeight) {
          passCount++;
        }
      }

      this.setState({weightPassCount: passCount});
      this.setState({
        weightFailCount: this.state.weightLogs.length - passCount,
      });
    } else {
      this.setState({weightMiss: true});
    }
  };

  getFoodResult = () => {
    let totalCarbs = 0; //grams
    let totalProtein = 0; //grams
    let totalFats = 0;
    let length = this.state.foodLogs.length;
    let passCount = 0;
    if (length != 0) {
      for (var a of this.state.foodLogs) {
        let arr = getNutrientCount(a.beverage);
        let arr1 = getNutrientCount(a.dessert);
        let arr2 = getNutrientCount(a.main);
        let arr3 = getNutrientCount(a.side);
        totalCarbs +=
          Number(arr[0]) + Number(arr1[0]) + Number(arr2[0]) + Number(arr3[0]);
        totalProtein +=
          Number(arr[1]) + Number(arr1[1]) + Number(arr2[1]) + Number(arr3[1]);
        totalFats +=
          Number(arr[2]) + Number(arr1[2]) + Number(arr2[2]) + Number(arr3[2]);

        if (
          totalCarbs > maxCarbs ||
          totalProtein > maxProtein ||
          totalFats > maxFats
        ) {
          this.setState({foodPass: false});
        } else {
          passCount++;
        }
      }
      this.setState({carbs: totalCarbs.toFixed(2)});
      this.setState({protein: totalProtein.toFixed(2)});
      this.setState({fats: totalFats.toFixed(2)});
      this.setState({foodPassCount: passCount});
      this.setState({foodFailCount: length - passCount});
    } else if (length === 0) {
      this.setState({foodMiss: true});
    }
  };

  getActivityResult = () => {
    let length = this.state.activityLogs.length;
    let minstep = 6000;
    let passCount = 0;
    if (length != 0) {
      for (var x of this.state.activityLogs) {
        if (x.steps >= minstep) {
          passCount++;
        }
      }
      this.setState({activityPass: true});
      this.setState({activityPassCount: passCount});
      this.setState({activityFailCount: length - passCount});
    } else {
      this.setState({activityMiss: true});
    }
  };

  handleOnPress = () => {
    this.props.navigation.navigate('DiaryDetail', {
      date: this.props.date,
      avgBg: this.state.avgBg,

      bgLogs: this.state.bgLogs,
      foodLogs: this.state.foodLogs,
      medLogs: this.state.medLogs,
      activityLogs: this.state.activityLogs,
      weightLogs: this.state.weightLogs,

      bgPass: this.state.bgPass,
      bgMiss: this.state.bgMiss,
      avgBg: this.state.avgBg,

      foodMiss: this.state.foodMiss,
      carbs: this.state.carbs,
      protein: this.state.protein,
      fats: this.state.fats,
      foodPassCount: this.state.foodPassCount,
      foodFailCount: this.state.foodFailCount,

      weightMiss: this.state.weightMiss,
      weightPassCount: this.state.weightPassCount,
      weightFailCount: this.state.weightFailCount,

      activityMiss: this.state.activityMiss,
      activityPassCount: this.state.activityPassCount,
      activityFailCount: this.state.activityFailCount,
    });
  };

  render() {
    const {date, navigation} = this.props;
    const {
      bgPass,
      bgPassCount,
      bgFailCount,
      bgMiss,
      weightPass,
      weightPassCount,
      weightFailCount,
      weightMiss,
      activityPass,
      activityPassCount,
      activityMiss,
      foodMiss,
      foodPass,
      foodPassCount,
      foodFailCount,
    } = this.state;
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
                {within_target}
              </Text>
              <TargetContent
                bgPass={bgPass}
                bgPassCount={bgPassCount}
                weightPass={weightPass}
                weightPassCount={weightPassCount}
                activityPass={activityPass}
                activityPassCount={activityPassCount}
                foodPass={foodPass}
                foodPassCount={foodPassCount}
                type={within_target}
              />
            </View>
            <View style={styles.diaryContent2}>
              <Text style={[styles.diaryContentHeader, {color: 'black'}]}>
                {missed}
              </Text>
              <TargetContent
                bgMiss={bgMiss}
                weightMiss={weightMiss}
                foodMiss={foodMiss}
                activityMiss={activityMiss}
                type={missed}
              />
            </View>
            <View style={styles.diaryContent3}>
              <Text style={[styles.diaryContentHeader, {color: '#9a228a'}]}>
                {improved}
              </Text>
              <TargetContent
                bgFailCount={bgFailCount}
                weightFailCount={weightFailCount}
                foodFailCount={foodFailCount}
                type={improved}
              />
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
    margin: '2%',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
});
