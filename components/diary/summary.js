import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
//component
import Result from './result';
import ProgressBar from '../progressbar';

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
    return (
      <>
        <Result success={true} message={'Food Intake Log completed.'} />
        {renderFoodNutrition(carbsPercent, 'Carbs', carbs, maxCarbs)}
        {renderFoodNutrition(fatsPercent, 'Fats', fats, maxFats)}
        {renderFoodNutrition(proteinPercent, 'Protein', protein, maxProtein)}
        {percentage != 0 ? (
          <Text style={styles.percentStyle}>
            {percentage} % of your food logs are within healthy range!
          </Text>
        ) : (
          <Text style={[styles.percentStyle, {color: 'red'}]}>
            None of your food logs are within healthy range!
          </Text>
        )}
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
    return (
      <>
        <Result success={true} message={'Weight log completed.'} />
        {percentage != 0 ? (
          <Text style={styles.percentStyle}>
            {percentage} % of your weight logs are above 40 kg and below 200 kg
          </Text>
        ) : (
          <Text style={[styles.percentStyle, {color: 'red'}]}>
            None of your food logs are within healthy range!
          </Text>
        )}
      </>
    );
  }
}

function renderActivityResult(
  activityPassCount,
  activityFailCount,
  activityMiss,
) {
  if (activityMiss) {
    return <Result success={false} message={'Missing activity log.'} />;
  } else {
    let percentage = getPercentage(activityPassCount, activityFailCount);
    return (
      <>
        <Result success={true} message={'Activity log completed.'} />
        {percentage != 0 ? (
          <Text style={styles.percentStyle}>
            {percentage} % of your activity logs have at least 20 active min
          </Text>
        ) : (
          <Text style={[styles.percentStyle, {color: 'red'}]}>
            None of your activity logs are within healthy range!
          </Text>
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
  },
});
