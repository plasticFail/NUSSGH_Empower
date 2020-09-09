import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
//function
import {getEntry4Day} from '../../netcalls/requestsDiary';
import {getNutrientCount} from '../../commonFunctions/diaryFunctions';
import {
  bg_key,
  food_key,
  weight_key,
  med_key,
  activity_key,
  renderLogIcon,
} from '../../commonFunctions/logFunctions';
//styles
import logStyles from '../../styles/logStyles';
//third party lib
import Ionicon from 'react-native-vector-icons/Ionicons';
import diaryStyles from '../../styles/diaryStyles';

const maxWeight = 200;
const minWeight = 40;
const maxCarbs = 130; //grams
const maxProtein = 46; //grams
const maxFats = 46; //grams
const button_list = [bg_key, food_key, med_key, weight_key, activity_key];

//mainly do the calculation for the result of the logs to display
class TargetBlock extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      bgLogs: [],
      foodLogs: [],
      medLogs: [],
      activityLogs: [],
      weightLogs: [],

      bgMiss: false,
      foodMiss: false,
      weightMiss: false,
      activityMiss: false,

      avgBg: 0,
      bgPass: false,
      carbs: 0,
      fats: 0,
      protein: 0,
      foodPass: true,
      weightPass: true,
      activityPass: true,

      targetBg: {},
      activityTarget: {},
      activitySummary: {},

      showBg: false,
      showFood: false,
      showMed: false,
      showWeight: false,
    };
    this.props.navigation.addListener('focus', () => {
      this.init();
    });
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    this.resetStates();
    console.log('initialising dairy--' + this.props.date);
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
        activityTarget: d.activity.summary_target,
        activitySummary: d.activity.summary,
      });
      this.getAllResult();
    });
  };

  componentDidUpdate(prevProp) {
    if (prevProp.date != this.props.date) {
      console.log('choosing a new date in diary');
      this.init();
    }
  }

  getAllResult = () => {
    this.getBGResult();
    this.getWeightResult();
    this.getActivityResult();
    this.getFoodResult();
  };

  resetStates = () => {
    this.setState({
      bgLogs: [],
      foodLogs: [],
      medLogs: [],
      activityLogs: [],
      weightLogs: [],

      bgMiss: false,
      foodMiss: false,
      weightMiss: false,
      activityMiss: false,

      avgBg: 0,
      bgPass: false,
      carbs: 0,
      fats: 0,
      protein: 0,
      foodPass: true,
      weightPass: true,
      activityPass: true,

      targetBg: {},
      activityTarget: {},
    });
  };

  getBGResult = () => {
    let total = 0;
    let count = 0;
    let length = this.state.bgLogs.length;
    if (length != 0) {
      for (var x of this.state.bgLogs) {
        //calculate average
        total += x.bg_reading;
        count++;
      }
      let avg = (total / count).toFixed(2);

      //set states
      this.setState({avgBg: avg});

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
      for (var x of this.state.weightLogs) {
        if (x.weight <= minWeight || x.weight <= maxWeight) {
          this.setState({weightPass: false});
        }
      }
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
    let targetType = this.state.activityTarget.type;
    let value = this.state.activityTarget.value;
    if (length != 0) {
      for (var x of this.state.activityLogs) {
        if (x[targetType] <= value) {
          this.setState({activityPass: false});
        }
      }
      this.setState({activityPass: true});
    } else {
      this.setState({activityMiss: true});
    }
  };

  openModalType = (selectedType) => {
    if (selectedType === bg_key) {
      this.setState({showBg: true});
    }
    if (selectedType === food_key) {
      this.setState({showFood: true});
    }
    if (selectedType === med_key) {
      this.setState({showMed: true});
    }
    if (selectedType === weight_key) {
      this.setState({showWeight: true});
    }
  };

  render() {
    const {
      bgMiss,
      foodMiss,
      weightMiss,
      activityMiss,
      avgBg,
      bgPass,
      foodPass,
      weightPass,
      activityPass,
    } = this.state;
    return (
      <View>
        {button_list.map((item, index) => (
          <TouchableOpacity
            style={diaryStyles.diaryLogItem}
            onPress={() => this.openModalType(item)}
            key={item}>
            <Image
              source={renderLogIcon(item)}
              style={diaryStyles.diarylogIcon}
            />
            <View style={styles.buttonContentContainer}>
              <Text style={[logStyles.fieldName, {fontSize: 15}]}>{item}s</Text>
              {renderContent(item, bgMiss, avgBg, bgPass)}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

function renderContent(logType, bgMiss, avgBg, bgPass) {
  if (logType === bg_key) {
    if (bgMiss) {
      return <Text style={styles.buttonDetail}>Missed</Text>;
    } else if (bgPass) {
      return (
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.buttonDetail}>Average {avgBg} mmol/L</Text>
          <Ionicon name="checkmark" style={diaryStyles.passIcon} size={25} />
        </View>
      );
    } else if (!bgPass) {
      return (
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.buttonDetail}>Average {avgBg} mmol/L</Text>
          <Ionicon
            name="alert-circle-outline"
            style={diaryStyles.failIcon}
            size={25}
          />
        </View>
      );
    }
  }
}

export default TargetBlock;

const styles = StyleSheet.create({
  buttonContentContainer: {
    marginTop: '-3%',
    marginStart: '15%',
  },
  buttonDetail: {
    marginStart: '3%',
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 20,
  },
});
