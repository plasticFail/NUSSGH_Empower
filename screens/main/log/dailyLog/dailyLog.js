import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
// third party lib
import Moment from 'moment';
//functions
import {
  getLastBgLog,
  getLastWeightLog,
  getLastMealLog,
  getLastMedicationLog,
} from '../../../../storage/asyncStorageFunctions';
import {mealAddLogRequest} from '../../../../netcalls/requestsLog';
//components
import FormBlock from '../../../../components/logs/formBlock';
import BloodGlucoseLogBlock from '../../../../components/logs/bloodGlucoseLogBlock';
import BloodGlucoseLogDisplay from '../../../../components/logs/bloodGlucoseLogDisplay';
import MealLogRoot from '../meal/MealLogRoot';
import {BackAndForwardButton} from '../../../../components/BackAndForwardButtons';
import PreviousMealBlock from '../meal/PreviousMealBlock';
import WeightLogBlock from '../../../../components/logs/weightLogBlock';
import WeightLogDisplay from '../../../../components/logs/weightLogDisplay';
import MedicationLogDisplay from '../../../../components/logs/medicationLogDisplay';
import MedicationLogBlock from '../../../../components/logs/medicationLogBlock';

class DailyLog extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      currentStep: 1,
      showNewInput: false,

      dateBloodGlucose: new Date(),
      bloodGlucose: '',
      lastBloodGlucose: null,

      mealRecordDate: null,
      mealType: null,
      meal: null,
      lastMealLog: null,
      toRecordMealLog: false,

      dateMedication: new Date(),
      selectedMedicationList: [],
      lastMedication: null,

      dateWeight: new Date(),
      weight: '',
      lastWeight: null,
    };
  }

  componentDidMount() {
    Moment.locale('en');

    getLastBgLog().then((data) => {
      if(this.isToday(data.date)) {
        this.setState({lastBloodGlucose: data});
      }
    });

    getLastMedicationLog().then((data) => {
      if(this.isToday(data.date)) {
        this.setState({lastMedication: data});
      }
    });

    getLastWeightLog().then((data) => {
      if(this.isToday(data.date)) {
        this.setState({lastWeight: data});
      }
    });
    getLastMealLog().then((data) => {
      this.setState({
        lastMealLog: data,
      });
    });
  }

  componentDidUpdate() {}

  isToday = date => {
    return date === Moment(new Date()).format('YYYY/MM/DD');
  }

  displayStepText = () => {
    switch (this.state.currentStep) {
      case 1:
        return 'Step 1: Blood Glucose Log';
      case 2:
        return 'Step 2: Food Intake';
      case 3:
        return 'Step 3: Medication Log';
      case 4:
        return 'Step 4: Weight Log';
      case 5:
        return 'Step 5 Summary';
    }
    return '';
  };

  stepImage = () => {
    switch (this.state.currentStep) {
      case 1:
        return require('../../../../resources/images/progress1.png');
      case 2:
        return require('../../../../resources/images/progress2.png');
      case 3:
        return require('../../../../resources/images/progress3.png');
      case 4:
        return require('../../../../resources/images/progress4.png');
      case 5:
        return require('../../../../resources/images/progress5.png');
    }
    return '';
  };

  formText = () => {
    switch (this.state.currentStep) {
      case 1:
        return 'You already logged blood glucose today, Want to add a new record?';
      case 2:
        return 'You already logged food intake today, Want to add a new record?';
      case 3:
        return 'You already logged medication today, Want to add a new record?';
      case 4:
        return 'You already logged weight today, Want to add a new record?';
    }
    return '';
  };

  showFormText = () => {
    switch (this.state.currentStep) {
      case 1:
        if (this.state.lastBloodGlucose !== null) {
          return true;
        }
        break;
      case 2:
        if (this.state.lastMealLog) {
          return true;
        }
        break;
      case 3:
        if(this.state.lastMedication) {
          return true;
        }
        break;
      case 4:
        if (this.state.lastWeight !== null) {
          return true;
        }
        break;
      case 5:
        return false;
        break;
    }
    return false;
  };

  handleFormBlockChange = (boolValue) => {
    if (this.state.showNewInput === boolValue) {
      return;
    }
    switch (this.state.currentStep) {
      case 2:
        this.setState({
          showNewInput: boolValue,
          toRecordMealLog: boolValue,
        });
        break;
      default:
        this.setState({
          showNewInput: boolValue,
        });
    }
  };

  showLastLog = (step) => {
    if (step === this.state.currentStep) {
      switch (step) {
        case 1:
          if (this.state.lastBloodGlucose !== null && !this.state.showNewInput) {
            return true;
          }
          break;
        case 2:
          if (this.state.lastMealLog && !this.state.showNewInput) {
            return true;
          }
          break;
        case 3:
          if (this.state.lastMedication && !this.state.showNewInput) {
            return true;
          }
          break;
        case 4:
          if (this.state.lastWeight !== null && !this.state.showNewInput) {
            return true;
          }
          break;
      }
    }
    return false;
  };

  showNewLogInput = (step) => {
    if (step === this.state.currentStep) {
      switch (step) {
        case 1:
          if (this.state.lastBloodGlucose === null || this.state.showNewInput) {
            return true;
          }
          break;
        case 3:
          if (this.state.lastMedication === null || this.state.showNewInput) {
            return true;
          }
          break;
        case 4:
          if (this.state.lastWeight === null || this.state.showNewInput) {
            return true;
          }
          break;
        case 2:
          if (this.state.showNewInput) {
            return true;
          }
          break;
      }
    }
    return false;
  };

  onMedicationList = (list) => {
    this.setState({selectedMedicationList: list});
  };

  // Meal handler events
  setMealCallback = (meal) => {
    this.setState({
      meal,
    });
  };

  setMealTypeCallback = (mealType) => {
    this.setState({
      mealType,
    });
  };

  setMealRecordDateCallback = (recordDate) => {
    this.setState({
      mealRecordDate: recordDate,
    });
  };

  handleSubmit = () => {
    // Array to hold all the requests
    let promises = [];

    // Blood glucose data to pass to endpoint
    // To do

    // Meal data to pass to endpoint
    const {meal, mealType, mealRecordDate, toRecordMealLog} = this.state;
    if (meal && toRecordMealLog) {
      const {beverage, main, side, dessert, isFavourite, mealName} = meal;
      const mealDataToLog = {
        beverage,
        main,
        side,
        dessert,
        isFavourite,
        mealName,
        mealType,
        recordDate: Moment(mealRecordDate).format('DD/MM/YYYY HH:mm:ss'),
      };
      // Append async promise to promises array.
      promises.push(
        new Promise((resolve, reject) => {
          resolve(mealAddLogRequest(mealDataToLog));
        }),
      );
    }

    // Medication data to pass to endpoint
    // To do

    // Weight data to pass to endpoint
    // To do

    // Call all requests asynchronously.
    Promise.all(promises)
      .then((respArr) => {
        // All have been recorded
        this.props.navigation.goBack();
        Alert.alert('Log success', 'Your logs have been recorded', [
          {text: 'Okay'},
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  incrementStepper = () => {
    this.setState({
      currentStep: this.state.currentStep + 1,
      showNewInput: false,
    });
  };

  decrementStepper = () => {
    this.setState({
      currentStep: this.state.currentStep - 1,
      showNewInput: false,
    });
  };

  render() {
    const {navigation, route} = this.props;
    const {meal, mealType, mealRecordDate, currentStep} = this.state;

    return (
      <ScrollView
        style={{width: '100%', flex: 1}}
        contentContainerStyle={{flexGrow: 1}}
        centerContent
        ref={(scrollView) => (this.scrollView = scrollView)}>
        <View style={styles.screen}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{this.displayStepText()}</Text>
          </View>
          <Image
            style={styles.progress}
            resizeMode="contain"
            source={this.stepImage()}
          />

          {this.showFormText() && (
            <View
              style={[
                styles.container,
                styles.shadow,
                {marginBottom: '4%', paddingEnd: '1%'},
              ]}>
              <FormBlock
                question={this.formText()}
                getFormSelection={this.handleFormBlockChange}
                selectNo={true}
                color={'#aad326'}
              />
            </View>
          )}

          {this.showLastLog(1) && (
            <BloodGlucoseLogDisplay data={this.state.lastBloodGlucose} />
          )}
          {this.showLastLog(2) && <PreviousMealBlock />}
          {this.showLastLog(3) && (<MedicationLogDisplay />)}
          {this.showLastLog(4) && (
            <WeightLogDisplay data={this.state.lastWeight} />
          )}

          {this.showNewLogInput(1) && (
            <BloodGlucoseLogBlock
              date={this.state.dateBloodGlucose}
              setDate={(date) => {
                this.setState({dateBloodGlucose: date});
              }}
              bloodGlucose={this.state.bloodGlucose}
              setBloodGlucose={(value) => {
                this.setState({bloodGlucose: value});
              }}
            />
          )}
          {this.showNewLogInput(2) && (
            <MealLogRoot
              containerStyle={{padding: 0}}
              parentScreen="DailyLog"
              onMealUpdateListener={this.setMealCallback}
              onMealTypeUpdateListener={this.setMealTypeCallback}
              onDateTimeUpdateListener={this.setMealRecordDateCallback}
              recordDate={mealRecordDate}
              mealType={mealType}
              selectedMeal={meal}
              navigation={navigation}
              route={route}
            />
          )}
          {this.showNewLogInput(3) && (
            <MedicationLogBlock
                date={this.state.dateMedication}
                setDate={(date) => {
                  this.setState({dateMedication: date});
                }}
                selectedMedicationList={this.state.selectedMedicationList}
                onListChange={this.onMedicationList}
            />
          )}
          {this.showNewLogInput(4) && (
            <WeightLogBlock
              date={this.state.dateWeight}
              setDate={(date) => {
                this.setState({dateWeight: date});
              }}
              bloodGlucose={this.state.weight}
              setBloodGlucose={(value) => {
                this.setState({weight: value});
              }}
            />
          )}
          {currentStep === 1 ? ( // Only render the forward button
            <BackAndForwardButton
              onPressBack={this.props.navigation.goBack}
              onPressForward={this.incrementStepper}
              overrideBackwardTitle="Cancel"
            />
          ) : currentStep === 5 ? ( // Only render the back button
            <BackAndForwardButton
              onPressBack={this.decrementStepper}
              onPressForward={this.handleSubmit}
              overrideForwardTitle="Submit"
            />
          ) : (
            <BackAndForwardButton
              onPressBack={this.decrementStepper}
              onPressForward={this.incrementStepper}
            />
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  textContainer: {
    width: '100%',
  },
  text: {
    fontSize: 18,
  },
  progress: {
    width: '100%',
    height: 100,
  },
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
    paddingBottom: '5%',
    borderRadius: 20,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default DailyLog;
