import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  filterMorning,
  filterAfternoon,
  filterEvening,
} from '../../../../commonFunctions/diaryFunctions';
//component
import WeightBlock from '../../../diary/blocks/weightBlock';
import MedBlock from '../../../diary/blocks/medBlock';
import BgBlock from '../../../diary/blocks/bgBlock';
import FoodBlock from '../../../diary/blocks/foodBlock';
import {
  renderLogIconNavy,
  bg_key,
  food_key,
  med_key,
  weight_key,
} from '../../../../commonFunctions/logFunctions';

const {width} = Dimensions.get('window');

export default function DiaryCard(props) {
  const {today_date, bgl, calorie, weight, medResult, dateString} = props;
  const {bgLogs, bgPass, bgMiss} = props;
  const {foodLogs, carbs, protein, fats, foodPass} = props;
  const {medLogs, weightLogs, lastWeight} = props;
  const {init} = props;

  const [showBg, setShowBg] = useState(false);
  const [showFood, setShowFood] = useState(false);
  const [showMed, setShowMed] = useState(false);
  const [showWeight, setShowWeight] = useState(false);

  const closeBg = () => {
    setShowBg(false);
    init();
  };

  const closeFood = () => {
    setShowFood(false);
    init();
  };

  const closeMed = () => {
    setShowMed(false);
    init();
  };

  const closeWeight = () => {
    setShowWeight(false);
    init();
  };

  return (
    <View
      style={[
        styles.card,
        styles.shadow,
        {margin: '5%', flexDirection: 'column', alignItems: 'flex-start'},
      ]}>
      <View
        style={{borderBottomWidth: 0.5, borderColor: '#7d7d7d', width: '100%'}}>
        <Text
          style={{
            padding: 20,
            fontWeight: 'bold',
            fontSize: 24,
            color: '#7d7d7d',
          }}>
          Overview
        </Text>
      </View>
      <TouchableOpacity
        style={styles.overviewRow}
        onPress={() => setShowBg(true)}>
        <View style={{flexDirection: 'row'}}>
          {renderLogIconNavy(bg_key)}
          <View style={styles.content}>
            <Text style={styles.metricText}>Blood Glucose</Text>
            <Text style={styles.measuredText}>
              {bgl ? bgl + ' mmol/L' : 'Not taken yet'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.overviewRow}
        onPress={() => setShowFood(true)}>
        <View style={{flexDirection: 'row'}}>
          {renderLogIconNavy(food_key)}
          <View style={styles.content}>
            <Text style={styles.metricText}>Food Intake</Text>
            <Text style={styles.measuredText}>{calorie} kcal</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.overviewRow}
        onPress={() => setShowMed(true)}>
        <View style={{flexDirection: 'row'}}>
          {renderLogIconNavy(med_key)}
          <View style={styles.content}>
            <Text style={styles.metricText}>Medication</Text>
            <Text style={styles.measuredText}>{medResult}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.overviewRow, {borderBottomWidth: 0}]}
        onPress={() => setShowWeight(true)}>
        <View style={{flexDirection: 'row'}}>
          {renderLogIconNavy(weight_key)}
          <View style={styles.content}>
            <Text style={styles.metricText}>Weight</Text>
            <Text style={styles.measuredText}>{lastWeight}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <BgBlock
        visible={showBg}
        closeModal={() => closeBg()}
        morningBgLogs={filterMorning(bgLogs)}
        afternoonBgLogs={filterAfternoon(bgLogs)}
        eveningBgLogs={filterEvening(bgLogs)}
        avgBg={bgl}
        pass={bgPass}
        miss={bgMiss}
        day={dateString}
        init={() => init()}
      />
      <FoodBlock
        visible={showFood}
        closeModal={() => closeFood()}
        morningMealLogs={filterMorning(foodLogs)}
        afternoonMealLogs={filterAfternoon(foodLogs)}
        eveningMealLogs={filterEvening(foodLogs)}
        carbs={carbs}
        fats={fats}
        protein={protein}
        pass={foodPass}
        day={dateString}
        init={() => init()}
      />
      <MedBlock
        visible={showMed}
        closeModal={() => closeMed()}
        morningMedLogs={filterMorning(medLogs)}
        afternoonMedLogs={filterAfternoon(medLogs)}
        eveningMedLogs={filterEvening(medLogs)}
        day={dateString}
        init={() => init()}
      />
      <WeightBlock
        visible={showWeight}
        closeModal={() => closeWeight()}
        morningWeightLogs={filterMorning(weightLogs)}
        afternoonWeightLogs={filterAfternoon(weightLogs)}
        eveningWeightLogs={filterEvening(weightLogs)}
        day={dateString}
        init={() => init()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  overviewRow: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 0.5,
    borderColor: '#7d7d7d',
    width: width - 80,
  },
  metricText: {
    fontWeight: 'bold',
    color: '#7d7d7d',
  },
  measuredText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 18,
  },
  content: {
    marginStart: '5%',
  },
});
