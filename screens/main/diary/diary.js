import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
//component
import Legend from '../../../components/diary/legend';
import TargetBlock from '../../../components/diary/targetBlock';
//third party
import moment from 'moment';
//functions
import {getDateRange} from '../../../commonFunctions/diaryFunctions';
import Filter from '../../../components/filter';

const dates = ['2020-08-06', '2020-08-07', '2020-08-08'];

const DiaryScreen = (props) => {
  const [dates, setDates] = useState([]);

  //set useeffect to render this week*
  useEffect(() => {
    setDates(getDateRange(7));
  }, []);

  return (
    <View style={styles.diaryScreen}>
      <Text style={styles.legendHeader}>Legend</Text>
      <Filter />
      <View style={styles.legendContainer}>
        <Legend />
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
  legendContainer: {
    flexDirection: 'row',
    flex: 1,
    zIndex: 1,
    elevation: 1,
    marginTop: '2%',
  },
  legendHeader: {fontSize: 18, fontWeight: '700', margin: '2%'},
});

export default DiaryScreen;
