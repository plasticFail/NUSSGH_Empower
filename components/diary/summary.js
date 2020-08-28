import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
//component
import Result from './result';
import ProgressBar from '../progressbar';
//third party library
import AntDesign from 'react-native-vector-icons/AntDesign';

AntDesign.loadFont();

const maxCarbs = 130;
const maxProtein = 46;
const maxFats = 46;

const Summary = (props) => {
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
    foodMiss,
    carbs,
    protein,
    fats,
    foodPassCount,
    foodFailCount,
    activitySummary,
  } = props;
  console.log('In Summary Component: ');

  return (
    <>
      <View style={[styles.container, styles.shadow]}>
        {renderBloodGlucoseResult(bgPass, bgMiss, avgBg)}
        {renderFoodResult(
          foodPassCount,
          foodFailCount,
          foodMiss,
          carbs,
          protein,
          fats,
        )}
        {renderActivityResult(
          activityPassCount,
          activityFailCount,
          activityMiss,
          activitySummary,
        )}
        {renderWeightResult(weightPassCount, weightFailCount, weightMiss)}
      </View>
    </>
  );
};

function renderFoodResult(
  foodPassCount,
  foodFailCount,
  foodMiss,
  carbs,
  protein,
  fats,
) {
  if (foodMiss) {
    return <Result success={false} message={'Missing food intake log.'} />;
  } else {
    let percentage = getPercentage(foodPassCount, foodFailCount);
    let carbsPercent = Math.floor((carbs / maxCarbs) * 100) + '%';
    let fatsPercent = Math.floor((fats / maxFats) * 100) + '%';
    let proteinPercent = Math.floor((protein / maxProtein) * 100) + '%';
    let finalMsg = '';
    if (percentage != 0) {
      let message = 'Food Intake Log completed.';
      let s = percentage + '% of your food logs are within healthy range!';
      finalMsg = message + ' ' + s;
    } else {
      finalMsg = ' None of your food logs are within healthy range!';
    }

    return (
      <>
        <Result success={true} message={finalMsg} />
        {renderFoodNutrition(carbsPercent, 'Carbs', carbs, maxCarbs)}
        {renderFoodNutrition(fatsPercent, 'Fats', fats, maxFats)}
        {renderFoodNutrition(proteinPercent, 'Protein', protein, maxProtein)}
      </>
    );
  }
}

function renderFoodNutrition(percentage, type) {
  let arr = String(percentage).split('%');
  return Number(arr[0]) <= 100 ? (
    <View style={{flexDirection: 'row'}}>
      <ProgressBar
        progress={percentage}
        useIndicatorLevel={true}
        reverse={true}
        containerStyle={{height: 15, width: '40%', marginStart: '10%'}}
      />
      <Text style={styles.nutritionText}>
        {type} ({percentage})
      </Text>
    </View>
  ) : (
    <View style={{flexDirection: 'row'}}>
      <ProgressBar
        progress={percentage}
        useIndicatorLevel={true}
        containerStyle={{height: 15, width: '40%', marginStart: '10%'}}
      />
      <Text style={styles.nutritionText}>
        {type} ({percentage})
      </Text>
    </View>
  );
}

function getPercentage(passcount, failcount) {
  return Math.floor((passcount / (failcount + passcount)) * 100);
}

function renderWeightResult(weightPassCount, weightFailCount, weightMiss) {
  if (weightMiss) {
    return <Result success={false} message={'Missing weight log.'} />;
  } else {
    let percentage = getPercentage(weightPassCount, weightFailCount);
    let finalMsg = '';
    if (percentage != 0) {
      let message = 'Activity log completed.';
      let s =
        percentage + '% of your weight logs are above 40 kg and below 200 kg';
      finalMsg = message + ' ' + s;
    } else {
      finalMsg = ' None of your food logs are within healthy range!!';
    }
    return (
      <>
        <Result success={true} message={finalMsg} />
      </>
    );
  }
}

function renderActivityResult(
  activityPassCount,
  activityFailCount,
  activityMiss,
  activitySummary,
) {
  if (activityMiss) {
    return <Result success={false} message={'Missing activity log.'} />;
  } else {
    let percentage = getPercentage(activityPassCount, activityFailCount);
    let finalMsg = '';
    if (percentage != 0) {
      let message = 'Activity log completed.';
      let s =
        percentage + '% of your activity logs have at least 20 active min';
      finalMsg = message + ' ' + s;
    } else {
      finalMsg = 'None of your activity logs are within healthy range!';
    }
    return (
      <>
        <Result success={true} message={finalMsg} />
        {activitySummary != undefined && (
          <View
            style={{
              marginStart: '9%',
              flexDirection: 'row',
              paddingBottom: '3%',
            }}>
            <AntDesign name="clockcircle" size={20} color="#547a5f" />
            <Text
              style={{
                fontSize: 16,
                flex: 1,
                marginStart: '2%',
                color: '#547a5f',
              }}>
              {activitySummary.duration} active mins for today
            </Text>
          </View>
        )}
      </>
    );
  }
}

//take in the duration, check
function renderBloodGlucoseResult(bgPass, bgMiss, avgBg) {
  if (bgMiss) {
    return <Result success={false} message={'Missing Blood Glucose Log'} />;
  } else if (bgPass == true) {
    return (
      <Result
        success={true}
        message={'Average blood sugar: ' + avgBg + ' mmol/L.'}
      />
    );
  } else {
    return (
      <Result
        success={false}
        message={'Average blood sugar: ' + avgBg + ' mmol/L.'}
      />
    );
  }
}

export default Summary;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    padding: '2%',
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
  percentStyle: {
    marginStart: ' 10%',
    fontSize: 13,
    color: 'green',
  },
  nutritionText: {
    marginStart: ' 10%',
    marginBottom: '3%',
    fontSize: 13,
    color: '#547a5f',
  },
});
