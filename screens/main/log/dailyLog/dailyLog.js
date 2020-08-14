import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Alert, ScrollView, TouchableOpacity} from 'react-native';
// third party lib
import Moment from 'moment';
//other screens
import BloodGlucoseLogBlock from '../../../../components/logs/bloodGlucoseLogBlock';
import FormBlock from '../../../../components/logs/formBlock';
import BloodGlucoseLogDisplay from '../../../../components/logs/bloodGlucoseLogDisplay';
import {getLastBgLog, getLastMealLog} from '../../../../storage/asyncStorageFunctions';
import MealLogRoot from "../meal/MealLogRoot";
import {BackAndForwardButton} from "../../../../components/BackAndForwardButtons";
import PreviousMealBlock from "../meal/PreviousMealBlock";
import {mealAddLogRequest} from "../../../../netcalls/requestsLog";

class DailyLog extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      currentStep: 1,
      showNewInput: true,
      dateBloodGlucose: new Date(),
      bloodGlucose: null,
      // Just to show the schema of meal daily log data. Will be initialised when meallogroot component mounts.
      mealDailyLogData: {
        recordDate: null,
        mealType: null,
        meal: null
      }
    };
  }

  componentDidMount() {
    getLastBgLog().then((data) => {
      console.log(data);
      console.log(data.time);
      console.log(data.value);
      this.setState({bloodGlucose : data});
    });
    getLastMealLog().then((data) => {
      this.setState({
        mealDailyLogData: data
      })
    })
  }

  componentDidUpdate() {
    //console.log(this.state.bloodGlucose.value);
    console.log(this.state.mealDailyLogData.meal);
  }

  displayStepText = step => {
    switch (step){
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
  }

  stepImage = step => {
    switch (step){
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
  }

  newInputText = step => {
    switch (step){
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
  }

  // Meal handler events
  setMealCallback = (meal) => {
    const {mealDailyLogData} = this.state;
    const copy = {...mealDailyLogData};
    copy.meal = meal;
    this.setState({
        mealDailyLogData: copy
    })
  }

  setMealTypeCallback = (mealType) => {
    const {mealDailyLogData} = this.state;
    const copy = {...mealDailyLogData};
    copy.mealType = mealType;
    this.setState({
      mealDailyLogData: copy
    })
  }

  setMealRecordDateCallback = (recordDate) => {
    const {mealDailyLogData} = this.state;
    const copy = {...mealDailyLogData};
    copy.recordDate = recordDate;
    this.setState({
      mealDailyLogData: copy
    })
  }

  handleSubmit = () => {
    // Array to hold all the requests
    let promises = [];

    // Blood glucose data to pass to endpoint
    // To do

    // Meal data to pass to endpoint
    const {mealDailyLogData} = this.state;
    if (mealDailyLogData.meal) {
      const { beverage, main, side, dessert, isFavourite, mealName } = mealDailyLogData.meal;
      const mealDataToLog = {
        beverage,
        main,
        side,
        dessert,
        isFavourite,
        mealName,
        mealType: mealDailyLogData.mealType,
        recordDate: Moment(mealDailyLogData.recordDate).format("DD/MM/YYYY HH:mm:ss")
      }
      // Append async promise to promises array.
      promises.push(new Promise((resolve, reject) => {
        resolve(mealAddLogRequest(mealDataToLog));
      }));
    }

    // Medication data to pass to endpoint
    // To do

    // Weight data to pass to endpoint
    // To do

    // Call all requests asynchronously.
    Promise.all(promises).then(respArr => {
      // All have been recorded
      console.log(respArr);
      this.props.navigation.goBack();
      Alert.alert('Log success', 'Your logs have been recorded', [{text: 'Okay'}])
    }).catch(err => {
      console.log(err);
    });
  }

  incrementStepper = () => {
    this.setState({
      currentStep: this.state.currentStep + 1
    })
  }

  decrementStepper = () => {
    this.setState({
      currentStep: this.state.currentStep - 1
    });
  }

  render() {
    const {navigation, route} = this.props;
    const {mealDailyLogData, currentStep} = this.state;

    return (
        <ScrollView style={{width: '100%', flex: 1}}
                    contentContainerStyle={{flexGrow: 1}}
                    centerContent
                    ref={scrollView => this.scrollView = scrollView}
                    onContentSizeChange={() => {
                      //Scroll to top every time steps are changed.
                      this.scrollView.scrollTo({y: 0, animated: true});
                    }}>
        <View style={styles.screen}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{this.displayStepText(this.state.currentStep)}</Text>
          </View>
          <Image
              style={styles.progress}
              resizeMode="contain"
              source={this.stepImage(this.state.currentStep)}
          />

          {this.state.showNewInput ? (<View
              style={[
                styles.container,
                styles.shadow,
                {marginBottom: '4%', paddingEnd: '1%'},
              ]}>
            <FormBlock
                question={this.newInputText(this.state.currentStep)}
                getFormSelection={boolValue => {
                  this.setState({showNewInput: boolValue})
                }}
                selectNo={false}
                color={'#aad326'}
            />
          </View>) : null}

          {this.state.bloodGlucose !== null ? (<BloodGlucoseLogDisplay data={this.state.bloodGlucose}/>) : null}
          {/*{show && (*/}
          {/*  <BloodGlucoseLogBlock*/}
          {/*    date={date}*/}
          {/*    setDate={setDate}*/}
          {/*    bloodGlucose={bloodGlucose}*/}
          {/*    setBloodGlucose={setBloodGlucose}*/}
          {/*  />*/}
          {/*)}*/}
          {
            this.state.currentStep === 2 ?
                (this.state.showNewInput ?
                  <MealLogRoot
                      containerStyle={{padding: 0}}
                      parentScreen='DailyLog'
                      onMealUpdateListener={this.setMealCallback}
                      onMealTypeUpdateListener={this.setMealTypeCallback}
                      onDateTimeUpdateListener={this.setMealRecordDateCallback}
                      recordDate={mealDailyLogData.recordDate}
                      mealType={mealDailyLogData.mealType}
                      selectedMeal={mealDailyLogData.meal}
                      navigation={navigation}
                      route={route}
                  /> :
                  <PreviousMealBlock />)
                : null
          }

          {/*<TouchableOpacity*/}
          {/*  style={{marginTop: '4%'}}*/}
          {/*  onPress={() => {*/}
          {/*    // pass states to other screens to maintain persistent storage.*/}
          {/*    const states = props.route.params;*/}
          {/*    props.navigation.navigate('DailyLog2', states);*/}
          {/*  }}>*/}
          {/*  <Text>Next</Text>*/}
          {/*</TouchableOpacity>*/}
          {
            currentStep === 1 ? // Only render the forward button
                <BackAndForwardButton onPressBack={this.props.navigation.goBack}
                                      onPressForward={this.incrementStepper}
                                      overrideBackwardTitle="Cancel"/>
              : currentStep === 5 ? // Only render the back button
                <BackAndForwardButton onPressBack={this.decrementStepper}
                                      onPressForward={this.handleSubmit}
                                      overrideForwardTitle="Submit"/>
              : <BackAndForwardButton onPressBack={this.decrementStepper}
                                      onPressForward={this.incrementStepper}
                                      />
          }
        </View>
        </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center'
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
