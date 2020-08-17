import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Result from './result';
import DummyData from './dummyData.json';
import BgBlock from './blocks/bgBlock';
import WeightBlock from './blocks/weightBlock';

const Summary = (props) => {
  const [avgBg, setAverageBg] = useState(0);
  const [bgLogs, setBgLogs] = useState([]);
  const [targetBg, setTargetBg] = useState({});
  const [bgPass, setBgPass] = useState(false);

  const [foodLogs, setFoodLogs] = useState([]);

  const [medLogs, setMedLogs] = useState([]);

  const [activityLogs, setActivityLogs] = useState([]);

  const [weightLogs, setWeightLogs] = useState([]);
  const [weightPass, setWeightPass] = useState(false);

  console.log('In Summary Component: ');

  useEffect(() => {
    //call the api to retrieve the logs for the day
    setBgLogs(DummyData.glucose.logs);
    setTargetBg(DummyData.glucose.target);
    setWeightLogs(DummyData.weight.logs);

    getAllResult();
  });

  const getAllResult = () => {
    getBGResult();
    getWeightResult();
  };

  const getBGResult = () => {
    var total = 0;
    var count = 0;
    for (var x of bgLogs) {
      total += x.bg_reading;
      count++;
    }
    let avg = total / count;
    setAverageBg(avg);
    if (targetBg.comparator === '<=') {
      if (avgBg <= targetBg.value) {
        setBgPass(true);
      } else {
        setBgPass(false);
      }
    }
  };

  const getWeightResult = () => {
    if (weightLogs.length != 0) {
      setWeightPass(true);
    } else {
      setWeightPass(false);
    }
  };

  return (
    <>
      <View style={[styles.container, styles.shadow]}>
        {bgPass == true ? (
          <Result
            success={true}
            message={'Average blood sugar: ' + avgBg + ' mmol/L.'}
          />
        ) : (
          <Result
            success={false}
            message={'Average blood sugar: ' + avgBg + ' mmol/L.'}
          />
        )}
        {weightPass == true ? (
          <Result success={true} message={'Weight log completed.'} />
        ) : (
          <Result success={true} message={'Weight log not completed.'} />
        )}
      </View>
      {bgLogs.map((item) => (
        <BgBlock bloodGlucose={item} />
      ))}
      {weightLogs.map((item) => (
        <WeightBlock weight={item} />
      ))}
    </>
  );
};

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
});
