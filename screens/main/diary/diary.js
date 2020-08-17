import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  Picker,
} from 'react-native';
import Legend from '../../../components/diary/legend';
import TargetBlock from '../../../components/diary/targetBlock';

const itemList = [
  {
    date: '22/2/2020',
    withinT: {
      glucoseC: '2',
      foodIntakeC: '3',
    },
    missed: {
      activityC: '2',
      medicationC: '2',
    },
    improve: {
      weightC: '2',
    },
  },
  {
    date: '21/2/2020',
    withinT: {
      glucoseC: '2',
      foodIntakeC: '3',
    },
    missed: {
      activityC: '2',
      medicationC: '2',
    },
    improve: {
      weightC: '2',
    },
  },
];

const filterList = [
  {
    name: '1 Week',
    value: '1 Week',
  },
  {
    name: '1 Month',
    value: '1 Month',
  },
];

const DiaryScreen = (props) => {
  const [filter, setFilter] = useState('Filter');

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
          data={itemList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={[styles.diaryContentContainer, styles.shadow]}>
              <TargetBlock item={item} />
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
