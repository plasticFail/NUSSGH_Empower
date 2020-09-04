import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
//component
import Legend from '../../../components/diary/legend';
import TargetBlock from '../../../components/diary/targetBlock';
import Filter from '../../../components/filter';
//third party
import moment from 'moment';
//functions
import {getDateRange} from '../../../commonFunctions/diaryFunctions';
import globalStyles from '../../../styles/globalStyles';

const DiaryScreen = (props) => {
  const [dates, setDates] = useState([]);

  //set useeffect to render this week*
  useEffect(() => {
    setDates(getDateRange(7));
  }, []);

  const getDateArrFromFilter = (value) => {
    setDates(value);
  };

  return (
    <View style={globalStyles.pageContainer}>
      <View style={{flexDirection: 'row', padding: '3%'}}>
        <Text style={styles.legendHeader}>Legend</Text>
        <Filter getDateArrFromFilter={getDateArrFromFilter} />
      </View>
      <View style={styles.legendContainer}>
        <Legend />
      </View>
      <View style={{flex: 2}}>
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
  legendContainer: {
    flexDirection: 'row',
    flex: 1,
    zIndex: 1,
    elevation: 1,
    marginTop: '2%',
  },
  legendHeader: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  selectStyle: {
    height: 43,
    width: '40%',
  },
});

export default DiaryScreen;
