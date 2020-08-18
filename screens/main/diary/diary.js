import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  Picker,
} from 'react-native';
//component
import Legend from '../../../components/diary/legend';
import TargetBlock from '../../../components/diary/targetBlock';
//functions
import {
  getEntryToday,
  getEntryForDateRange,
} from '../../../netcalls/requestsDiary';

const dates = ['2020-08-06', '2020-08-07', '2020-08-08'];

const DiaryScreen = (props) => {
  const [filter, setFilter] = useState('Filter');
  const [dateList, setDateList] = useState([]);
  const [diaryEntries, setDiaryEntries] = useState([]);

  return (
    <View style={styles.diaryScreen}>
      <Text style={{fontSize: 18, fontWeight: '600', margin: '2%'}}>
        Legend
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
        }}>
        <Legend />
        {/*         <Select
          options={filterList}
          defaultValue={filterList[0]}
          onSelect={handleSelect}
        />*/}
      </View>
      <View style={{flex: 2, padding: '2%'}}>
        <FlatList
          data={dates}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={[styles.diaryContentContainer, styles.shadow]}>
              <TargetBlock date={item} navigation={props.navigation} />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  diaryScreen: {
    flex: 1,
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  filterButton: {
    marginStart: '3%',
  },
  diaryContentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default DiaryScreen;
