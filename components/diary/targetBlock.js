import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
//function
import {useNavigation} from '@react-navigation/native';
import {getEntry4Day} from '../../netcalls/requestsDiary';

const TargetBlock = (props) => {
  let width = Dimensions.get('window').width;
  const navigation = useNavigation();
  const {date} = props;

  //states
  const [avgBg, setAverageBg] = useState(0);
  const [bgLogs, setBgLogs] = useState([]);
  const [targetBg, setTargetBg] = useState({});
  const [bgPass, setBgPass] = useState(false);

  const [medLogs, setMedLogs] = useState([]);
  const [foodLogs, setFoodLogs] = useState([]);

  const [activityLogs, setActivityLogs] = useState([]);

  const [weightLogs, setWeightLogs] = useState([]);
  const [weightPass, setWeightPass] = useState(false);

  useEffect(() => {
    getEntry4Day(String(date)).then((data) => {
      let d = data[date];
      setBgLogs(d.glucose.logs);
      setTargetBg(d.glucose.target);
      setFoodLogs(d.food.logs);
      setMedLogs(d.medication.logs);
      setWeightLogs(d.weight.logs);
      setActivityLogs(d.activity.logs);
      getAllResult();
    });
  }, []);

  const getAllResult = () => {
    getBGResult();
    getWeightResult();
  };

  const getBGResult = () => {
    var total = 0;
    var count = 0;
    if (bgLogs.length != 0) {
      for (var x of bgLogs) {
        total += x.bg_reading;
        count++;
      }
      let avg = (total / count).toFixed(2);
      setAverageBg(avg);
      if (targetBg.comparator === '<=') {
        if (avgBg <= targetBg.value) {
          setBgPass(true);
        } else {
          setBgPass(false);
        }
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

  const handleOnPress = () => {
    navigation.navigate('DiaryDetail', {
      date: date,
      bgPass: bgPass,
      avgBg: avgBg,
      weightPass: weightPass,
      bgLogs: bgLogs,
      foodLogs: foodLogs,
      medLogs: medLogs,
      activityLogs: activityLogs,
      weightLogs: weightLogs,
    });
  };

  return (
    <View>
      <Text style={[styles.diaryDate, {width: width}]}>{date}</Text>
      <TouchableOpacity onPress={handleOnPress}>
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
};

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
